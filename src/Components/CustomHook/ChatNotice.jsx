import { useState } from "react";
import CommonModal from "../../Components/Common/CommonModal";
import { CiWarning } from "react-icons/ci";
import { useNavigate } from "react-router-dom";

function ChatNotice({ children }) {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(true);

  if (showModal) {
    return (
      <CommonModal
        icon={<CiWarning />}
        heading={"Notice"}
        showModal={showModal}
        text={
          <>
            <p>
              1. Please ask only gardening related questions. Other questions
              will not be answered.
            </p>
            <p>
              2. This chat is powered by AI and may not always provide accurate
              information. Always verify critical advice from trusted sources.
            </p>
            <p>3. This chat will not be saved.</p>
          </>
        }
        btn1={"Got it!"}
        btn2={"Cancel"}
        onClick1={() => {
          setShowModal(false);
          return;
        }}
        onClick2={() => {
          setShowModal(false);
          navigate(-1);
          return;
        }}
      />
    );
  }
  return (
    <>
      <>{children}</>
    </>
  );
}

export default ChatNotice;
