import { useContext, useState } from "react";
import { Check } from "lucide-react";
import NavBar from "../Components/Common/NavBar";
import { plans } from "../Constants/plansData.json";
import FAQ from "../Components/FAQ";
import Footer from "../Components/Common/Footer";
import { handlePaymentAPI } from "../Service/Operation/PaymentService";
import AuthContext from "../Context/AuthContext";
import PaymentSuccessModal from "../Dashboard/Components/PaymentSuccessModal";
import { useNavigate } from "react-router-dom";
import PaymentErrorModal from "../Dashboard/Components/PaymentErrorModal";

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const [selectedPlan, setSelectedPlan] = useState(plans.monthly[1]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const [data, setData] = useState(null);

  const authContext = useContext(AuthContext);
  const { token } = authContext?.data;

  const navigate = useNavigate();

  const handleSelectPlan = (plan) => {
    setSelectedPlan(plan);
    console.log("Selected Plan:", plan);
    console.log("Billing Cycle:", billingCycle);
    handlePayment(plan.name);
  };

  const onSuccess = (response) => {
    setData(response?.data?.data);
    console.log("Payment verified successfully:", response);
    setShowSuccessModal(true);
  };

  const onFailure = (error) => {
    console.error("Payment failed or verification failed:", error);
    setShowErrorModal(true);
  };

  async function handlePayment(planName) {
    try {
      await handlePaymentAPI(
        { pricePlan: planName, billingCycle: billingCycle },
        token,
        onSuccess,
        onFailure
      );
    } catch (error) {
      console.error("Payment failed:", error);
    }
  }

  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Header */}
      <NavBar />

      <>
        {showSuccessModal && (
          <PaymentSuccessModal
            paymentData={data}
            onContinue={() => {
              setShowSuccessModal(false);
              navigate("/dashboard/profile");
            }}
          />
        )}
        {showErrorModal && (
          <PaymentErrorModal
            onTryAgain={() => {
              setShowErrorModal(false);
              navigate("/pricing");
            }}
            onCancel={() => {
              setShowErrorModal(false);
              navigate("/");
            }}
          />
        )}

        {!showSuccessModal && !showErrorModal && (
          <main>
            {/* Hero Section */}
            <section className="pt-32 pb-16 md:pt-40 md:pb-24 bg-emerald-50 text-center">
              <div className="container mx-auto px-6">
                <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
                  Find the Perfect Plan to Grow
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                  Whether you're a curious beginner or a seasoned urban farmer,
                  we have a plan that fits your gardening ambitions.
                </p>
                {/* Billing Cycle Toggle */}
                <div className="inline-flex bg-white p-1 rounded-full shadow-sm">
                  <button
                    onClick={() => setBillingCycle("monthly")}
                    className={`cursor-pointer px-6 py-2 rounded-full text-sm font-semibold transition-colors ${
                      billingCycle === "monthly"
                        ? "bg-emerald-500 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle("yearly")}
                    className={`px-6 py-2 rounded-full text-sm font-semibold transition-colors relative cursor-pointer ${
                      billingCycle === "yearly"
                        ? "bg-emerald-500 text-white"
                        : "text-gray-600"
                    }`}
                  >
                    Yearly
                    <span className="absolute -top-2 -right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full">
                      Save 16%
                    </span>
                  </button>
                </div>
              </div>
            </section>

            {/* Pricing Tiers Section */}
            <section className="py-20 md:py-28">
              <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-3 gap-8 items-center">
                  {plans[billingCycle].map((plan) => (
                    <div
                      key={plan.name}
                      onClick={() => handleSelectPlan(plan)}
                      className={`bg-white p-8 rounded-2xl shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                        plan.name === selectedPlan?.name
                          ? "border-emerald-500 transform md:scale-105"
                          : "border-transparent"
                      }`}
                    >
                      {plan.popular && (
                        <p className="text-center bg-emerald-500 text-white text-xs font-bold py-1 px-4 rounded-full w-fit mx-auto -mt-10 mb-4">
                          MOST POPULAR
                        </p>
                      )}
                      <h3 className="text-2xl font-bold text-center mb-2">
                        {plan.name}
                      </h3>
                      <p className="text-center text-gray-500 mb-6">
                        {plan.name === "Sprout"
                          ? "For the hobbyist"
                          : plan.name === "Gardener"
                          ? "For the passionate grower"
                          : "For community leaders"}
                      </p>
                      <p className="text-center text-4xl font-extrabold mb-4">
                        {plan.price}
                        <span className="text-lg font-medium text-gray-500">
                          /{billingCycle === "monthly" ? "mo" : "yr"}
                        </span>
                      </p>
                      <ul className="space-y-4 mb-8">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="w-5 h-5 text-emerald-500 mr-3 mt-1 flex-shrink-0" />
                            <span className="text-gray-600">{feature}</span>
                          </li>
                        ))}
                      </ul>
                      <button
                        className={`w-full font-bold py-3 rounded-lg transition-colors cursor-pointer ${
                          plan.popular
                            ? "bg-emerald-500 text-white hover:bg-emerald-600"
                            : "bg-emerald-100 text-emerald-800 hover:bg-emerald-200"
                        }`}
                      >
                        {plan.cta}
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <FAQ />
          </main>
        )}
      </>
      {/* Footer */}
      <Footer />
    </div>
  );
}
