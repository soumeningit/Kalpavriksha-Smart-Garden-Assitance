import { useCallback, useContext, useState } from "react";
import AuthContext from "../../../Context/AuthContext";
import { detectProblemAPI } from "../../../Service/Operation/PlantService";
import Drop from "./Drop";
import ProblemLoader from "./ProblemLoader";
import ProblemError from "./ProblemError";
import ShowResult from "./ShowResult";

function DetectProblemPage() {
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");

  const authContext = useContext(AuthContext);

  const { token } = authContext?.data;

  const onDrop = useCallback(async (acceptedFiles) => {
    setError("");
    setResult(null);
    const selectedFile = acceptedFiles[0];
    if (selectedFile) {
      setFile(
        Object.assign(selectedFile, {
          preview: URL.createObjectURL(selectedFile),
        })
      );

      setIsLoading(true);
      const image = new FormData();
      image.append("image", selectedFile);
      try {
        const apiResult = await detectProblemAPI(token, image);
        console.log("API Result :", apiResult);
        setResult(apiResult?.data?.data);
      } catch (err) {
        setError(err.message || "An unknown error occurred.");
      }
      setIsLoading(false);
    }
  }, []);

  const handleReset = () => {
    if (file) URL.revokeObjectURL(file.preview);
    setFile(null);
    setResult(null);
    setError("");
    setIsLoading(false);
  };

  console.log("Result:", result);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 font-sans">
      {/* Initial Dropzone View */}
      {!result && !isLoading && !error && <Drop onDrop={onDrop} />}

      {/* Loading State */}
      {isLoading && <ProblemLoader />}

      {/* Error State */}
      {error && <ProblemError handleReset={handleReset} />}

      {/* Result State */}
      {result && (
        <ShowResult
          selectedDisease={result?.healthAssessment?.diseases[0]}
          id={result?.id}
          image={result?.images[0]?.url}
        />
      )}
    </div>
  );
}

export default DetectProblemPage;
