// import { useContext, useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import AuthContext from "../../../Context/AuthContext";
// import { getProblemDetectionDetailsAPI } from "../../../Service/Operation/PlantService";

// function RecentDetectionDetails() {
//   const authContext = useContext(AuthContext);
//   const { token } = authContext.data;
//   const { documentId } = useParams();

//   const [details, setDetails] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const getDetails = async () => {
//       if (!documentId || !token) return;
//       setLoading(true);
//       setError(null);
//       try {
//         const response = await getProblemDetectionDetailsAPI(token, documentId);

//         console.log("response:", response);

//         if (response.status === 200) {
//           setDetails(response.data.data);
//         }
//       } catch (error) {
//         console.error(error);
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     getDetails();
//   }, [documentId, token]);

//   return (
//     <div>
//       <h2>RecentDetectionDetails</h2>
//       <p>Document ID: {documentId}</p>
//     </div>
//   );
// }

// export default RecentDetectionDetails;

import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import AuthContext from "../../../Context/AuthContext";
import { getProblemDetectionDetailsAPI } from "../../../Service/Operation/PlantService";

// --- ICONS ---
// We're using the free Font Awesome 6 icons from react-icons
import {
  FaLeaf,
  FaExclamationTriangle,
  FaCheckCircle,
  FaBook,
  FaFlask,
  FaSeedling,
  FaShieldAlt,
} from "react-icons/fa";

// --- HELPER FUNCTION ---
// A small helper to color-code the probability badge
const getProbabilityColor = (prob) => {
  if (prob > 0.8) return "#d9534f"; // Red for high confidence
  if (prob > 0.5) return "#f0ad4e"; // Orange for medium confidence
  return "#5cb85c"; // Green for lower confidence
};

// --- STYLES ---
// In a real app, this would go in a separate CSS file or CSS-in-JS solution.
const styles = `
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700&display=swap');

  .plant-details-container {
    font-family: 'Poppins', sans-serif;
    background-color: #f8f9fa;
    padding: 2rem;
    max-width: 1200px;
    margin: 2rem auto;
    border-radius: 12px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.1);
  }

  .main-layout {
    display: flex;
    gap: 2rem;
  }

  .plant-image-column {
    flex: 1;
    min-width: 300px;
  }
  
  .plant-image-column img {
    width: 100%;
    height: auto;
    border-radius: 12px;
    box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  }

  .details-column {
    flex: 2;
  }

  .summary-card {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 2rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
  }
  
  .summary-header {
    display: flex;
    align-items: center;
    gap: 1rem;
    font-size: 1.5rem;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .disease-card {
    background: #fff;
    border-radius: 12px;
    padding: 1.5rem;
    margin-bottom: 1.5rem;
    box-shadow: 0 4px 15px rgba(0,0,0,0.05);
    transition: transform 0.2s ease-in-out;
  }

  .disease-card:hover {
    transform: translateY(-5px);
  }

  .disease-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 1rem;
  }

  .disease-header h4 {
    margin: 0;
    font-size: 1.25rem;
    color: #333;
  }

  .probability-badge {
    color: #fff;
    padding: 0.3rem 0.8rem;
    border-radius: 20px;
    font-size: 0.9rem;
    font-weight: 600;
  }

  .treatment-section {
    margin-top: 1rem;
    border-left: 3px solid #eee;
    padding-left: 1rem;
  }
  
  .treatment-section h5 {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1rem;
    color: #555;
  }
  
  .treatment-section ul {
    list-style-type: none;
    padding-left: 1rem;
    color: #666;
  }
  
  .treatment-section li {
    margin-bottom: 0.5rem;
  }

  .learn-more-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    margin-top: 1rem;
    padding: 0.6rem 1.2rem;
    background-color: #28a745;
    color: #fff;
    text-decoration: none;
    border-radius: 8px;
    font-weight: 600;
    transition: background-color 0.2s;
  }

  .learn-more-btn:hover {
    background-color: #218838;
  }

  .loading-spinner {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    font-size: 1.5rem;
  }

  .error-message {
    text-align: center;
    padding: 2rem;
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 8px;
  }

  // Responsive Design
  @media (max-width: 900px) {
    .main-layout {
      flex-direction: column;
    }
  }
`;

// --- Reusable Child Components ---

const TreatmentSection = ({ title, icon, items }) => {
  if (!items || items.length === 0) return null;
  return (
    <div className="treatment-section">
      <h5>
        {icon} {title}
      </h5>
      <ul>
        {items.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

const DiseaseCard = ({ disease }) => (
  <div className="disease-card">
    <div className="disease-header">
      <h4>{disease.name}</h4>
      <span
        className="probability-badge"
        style={{ backgroundColor: getProbabilityColor(disease.probability) }}
      >
        {(disease.probability * 100).toFixed(0)}% Match
      </span>
    </div>
    <p>{disease.disease_details.description}</p>

    <TreatmentSection
      title="Biological"
      icon={<FaSeedling />}
      items={disease.disease_details.treatment?.biological}
    />
    <TreatmentSection
      title="Chemical"
      icon={<FaFlask />}
      items={disease.disease_details.treatment?.chemical}
    />
    <TreatmentSection
      title="Prevention"
      icon={<FaShieldAlt />}
      items={disease.disease_details.treatment?.prevention}
    />

    {disease.disease_details.url && (
      <a
        href={disease.disease_details.url}
        target="_blank"
        rel="noopener noreferrer"
        className="learn-more-btn"
      >
        <FaBook /> Learn More
      </a>
    )}
  </div>
);

// --- Main Component ---

function RecentDetectionDetails() {
  const authContext = useContext(AuthContext);
  const { token } = authContext.data;
  const { documentId } = useParams();

  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // This data fetching logic remains the same
    const getDetails = async () => {
      if (!documentId || !token) return;
      setLoading(true);
      setError(null);
      try {
        const response = await getProblemDetectionDetailsAPI(token, documentId);
        if (response.status === 200) {
          setDetails(response.data.data);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getDetails();
  }, [documentId, token]);

  if (loading) {
    return <div className="loading-spinner">Loading Plant Analysis... 🔎</div>;
  }

  if (error) {
    return (
      <div className="error-message">
        <h3>Oops!</h3>
        <p>{error}</p>
      </div>
    );
  }

  if (!details) {
    return <div>No details found.</div>;
  }

  const { images, healthAssessment } = details;

  return (
    <>
      <style>{styles}</style> {/* Injects the CSS */}
      <div className="plant-details-container">
        <h2 style={{ marginBottom: "2rem" }}>Plant Health Analysis 🌿</h2>
        <div className="main-layout">
          {/* Left Column: Image */}
          <div className="plant-image-column">
            {images?.[0]?.url && (
              <img src={images[0].url} alt="Detected plant" />
            )}
          </div>

          {/* Right Column: Details */}
          <div className="details-column">
            <div className="summary-card">
              <h3 className="summary-header">
                {healthAssessment.is_healthy ? (
                  <FaCheckCircle style={{ color: "#28a745" }} />
                ) : (
                  <FaExclamationTriangle style={{ color: "#d9534f" }} />
                )}
                Health Summary
              </h3>
              <p
                style={{
                  fontSize: "1.1rem",
                  color: healthAssessment.is_healthy ? "#28a745" : "#d9534f",
                  fontWeight: "600",
                }}
              >
                {healthAssessment.is_healthy
                  ? "Plant appears to be healthy."
                  : "Potential issues detected."}
              </p>
            </div>

            {healthAssessment.diseases?.map((disease) => (
              <DiseaseCard key={disease.entity_id} disease={disease} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default RecentDetectionDetails;
