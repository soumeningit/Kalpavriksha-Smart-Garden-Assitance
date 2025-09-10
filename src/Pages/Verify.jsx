import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { verifyUserAPI } from "../Service/Operation/AuthService";
import VerifyUserEmailSuccessModal from "../Components/Modal/VerifyUserEmailSuccessModal";
import VerifyUserEmailErrorModal from "../Components/Modal/VerifyUserEmailErrorModal";

function Verify() {
  const params = useParams();
  console.log(params);

  const { verifyToken } = params;
  const { userId } = params;
  const [showModal, setShowModal] = useState(false);
  const [showErrorModal, setShowErrorModal] = useState(false);
  const navigate = useNavigate();
  const [message, setMessage] = useState("");

  const handleClick = () => {
    setShowModal(false);
    navigate("/sign-in");
  };

  useEffect(() => {
    const verifyEmail = async () => {
      const toastId = toast.loading("Verifying...");
      try {
        const response = await verifyUserAPI({
          verificationToken: verifyToken,
        });
        toast.dismiss(toastId);
        if (response.status === 200) {
          toast.success("Email verified successfully!");
          setShowModal(true);
        }
      } catch (error) {
        toast.dismiss(toastId);
        setShowErrorModal(true);
        setMessage(error.response.data.data || "Error verifying email");
        console.error("Error verifying email:", error);
      }
    };
    verifyEmail();
  }, []);

  return (
    <div>
      <h2>Verify</h2>
      {showModal && (
        <VerifyUserEmailSuccessModal onClick={() => handleClick()} />
      )}
      {showErrorModal && (
        <VerifyUserEmailErrorModal
          onClick={() => {
            setShowErrorModal(false);
            navigate("/");
          }}
          message={message}
        />
      )}
    </div>
  );
}

export default Verify;
