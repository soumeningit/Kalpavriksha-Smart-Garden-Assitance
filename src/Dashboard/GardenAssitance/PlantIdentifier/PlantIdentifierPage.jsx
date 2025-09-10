import { useState, useCallback, useContext } from "react";
import AuthContext from "../../../Context/AuthContext";
import { identifyPlantAPI } from "../../../Service/Operation/PlantService";
import DropzoneUploader from "./DropZoneUploader";
import Loader from "./Loader";
import ErrorMessage from "./ErrorMessage";
import PhotoTips from "./PhotoTips";
import HistorySection from "./HistorySection";
import ResultView from "./ResultView";
import CommonModal from "../../../Components/Common/CommonModal";
import { useNavigate } from "react-router-dom";
import { AiOutlineWarning } from "react-icons/ai";

export default function PlantIdentifierPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [description, setDescription] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const authContext = useContext(AuthContext);
  const { token } = authContext.data;
  const userId = authContext.data.user.userId;

  const navigate = useNavigate();

  const onDrop = useCallback(
    async (acceptedFiles) => {
      setError("");
      setResult(null);
      const selectedFile = acceptedFiles[0];
      if (!selectedFile) return;

      setFile(
        Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        })
      );
      setIsLoading(true);

      const formData = new FormData();
      formData.append("image", selectedFile);

      try {
        const apiResult = await identifyPlantAPI(token, formData, userId);
        if (apiResult.status === 200) {
          const data = apiResult?.data?.data;
          setResult(data);
          setDescription(
            data?.suggestion?.plant_details?.wiki_description?.value || ""
          );
        }
      } catch (err) {
        console.error("Error identifying plant:", err);
        if (err?.response?.data?.data == 428) {
          setShowPaymentModal(true);
          setIsLoading(false);
          return;
        }
        setError(
          err?.message ||
            "Could not identify the plant. Please try a clearer image."
        );
      }
      setIsLoading(false);
    },
    [token, userId]
  );

  const handleReset = () => {
    if (file) URL.revokeObjectURL(file.preview);
    setFile(null);
    setResult(null);
    setError("");
    setIsLoading(false);
  };

  return (
    <>
      {showPaymentModal && (
        <CommonModal
          icon={<AiOutlineWarning />}
          heading="Subscription Required"
          showModal={showPaymentModal}
          text="You have reached your free identification limit. Please subscribe to continue using the Plant Identifier service."
          btn1="Subscribe Now"
          btn2="Cancel"
          onClick1={() => {
            navigate("/pricing");
            setShowPaymentModal(false);
          }}
          onClick2={() => setShowPaymentModal(false)}
        />
      )}
      <main className="flex-1 p-6 md:p-8 bg-gray-50">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Plant Identifier</h1>
          <p className="text-gray-600 mt-1">
            Upload an image to identify a plant with our AI.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Left Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              {!result && !isLoading && !error && (
                <DropzoneUploader onDrop={onDrop} />
              )}
              {isLoading && <Loader />}
              {error && !isLoading && (
                <ErrorMessage error={error} onRetry={handleReset} />
              )}
              {result && !isLoading && (
                <ResultView
                  result={result}
                  file={file}
                  description={description}
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  onReset={handleReset}
                />
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <PhotoTips />
            <HistorySection />
          </div>
        </div>
      </main>
    </>
  );
}
