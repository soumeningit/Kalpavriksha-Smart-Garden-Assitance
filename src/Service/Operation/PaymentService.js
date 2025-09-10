import axios from "axios";
import toast from "react-hot-toast";
import { paymentEndpoints } from "../API";

const {
    PAYMENT_API,
    VERIFY_PAYMENT_API
} = paymentEndpoints;

// Helper function to load the Razorpay script dynamically
function loadScript(src) {
    return new Promise((resolve) => {
        const script = document.createElement("script");
        script.src = src;
        script.onload = () => {
            resolve(true);
        };
        script.onerror = () => {
            resolve(false);
        };
        document.body.appendChild(script);
    });
}

export async function handlePaymentAPI(data, token, onSuccess, onFailure) {
    const toastId = toast.loading("Initiating payment...");
    try {
        const script = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );
        if (!script) {
            console.error("Razorpay Script Load Failed");
            toast.error("Payment gateway failed to load. Please try again.");
            if (onFailure) onFailure("Razorpay script failed to load");
            return;
        }

        // 1. Create the order on the server
        const serverResponse = await axios.post(PAYMENT_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        toast.dismiss(toastId);
        const output = serverResponse?.data?.data;

        // 2. Configure Razorpay options
        const options = {
            key: output.key,
            amount: `${output.amount}`,
            currency: "INR",
            name: "Kalpavriksha",
            description: "Smart Gardening Solutions",
            image:
                "https://res.cloudinary.com/dhu8fpog1/image/upload/v1756536416/Kalpavriksha_Logo_okzjcn.png",
            order_id: output?.razorpayOrderId,
            prefill: {
                name: `${output.name}`,
                email: output.email,
            },
            // This handler is called by Razorpay upon successful payment capture
            handler: function (response) {
                // 3. Verify the payment signature on our server
                verifyPayment(
                    {
                        ...response,
                        ...data,
                        ...output,
                    },
                    token,
                    onSuccess, // Pass the success callback
                    onFailure  // Pass the failure callback
                );
            },
        };

        // 4. Open the Razorpay payment modal
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
        paymentObject.on("payment.failed", function (response) {
            toast.error("Oops, payment failed");
            if (onFailure) onFailure(response.error); // Trigger the failure callback
        });
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Payment initiation failed");
        console.error("Error in handlePaymentAPI: ", error);
        if (onFailure) onFailure(error); // Trigger the failure callback for initial errors
    }
}


async function verifyPayment(data, token, onSuccess, onFailure) {
    const toastId = toast.loading("Verifying payment...");
    try {
        const responseServer = await axios.post(VERIFY_PAYMENT_API, data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        toast.dismiss(toastId);

        if (responseServer.status === 200) {
            toast.success("Payment verified successfully");
            if (onSuccess) onSuccess(responseServer); // Trigger the success callback
        } else {
            toast.error("Payment verification failed");
            if (onFailure) onFailure(responseServer); // Trigger the failure callback
        }
    } catch (error) {
        toast.dismiss(toastId);
        toast.error("Payment verification failed");
        console.error("Error in verifyPayment: ", error);
        if (onFailure) onFailure(error); // Trigger the failure callback
    }
}
