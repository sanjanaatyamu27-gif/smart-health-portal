import { useState } from "react";
import "./DoctorRecommendation.css";

function DoctorRecommendation() {
  const [symptoms, setSymptoms] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  const getRecommendation = () => {
    const text = symptoms.toLowerCase().trim();

    if (!text) {
      alert("Please enter your symptoms.");
      return;
    }

    let result;

    if (
      text.includes("chest pain") ||
      text.includes("heart pain") ||
      text.includes("palpitation") ||
      text.includes("heartbeat")
    ) {
      result = {
        doctor: "Cardiologist",
        specialty: "Cardiology",
        icon: "❤️",
        reason:
          "Your symptoms involve chest or heart-related concerns.",
        nextStep:
          "Please consult a Cardiologist for proper heart evaluation.",
      };
    } else if (
      text.includes("skin") ||
      text.includes("rash") ||
      text.includes("itching") ||
      text.includes("acne") ||
      text.includes("pimples")
    ) {
      result = {
        doctor: "Dermatologist",
        specialty: "Dermatology",
        icon: "🩺",
        reason:
          "Your symptoms appear to involve the skin.",
        nextStep:
          "Please consult a Dermatologist for proper skin evaluation.",
      };
    } else if (
      text.includes("eye") ||
      text.includes("vision") ||
      text.includes("blurred") ||
      text.includes("eyes")
    ) {
      result = {
        doctor: "Ophthalmologist",
        specialty: "Ophthalmology",
        icon: "👁️",
        reason:
          "Your symptoms appear to involve your eyes or vision.",
        nextStep:
          "Please consult an Ophthalmologist for an eye examination.",
      };
    } else if (
      text.includes("tooth") ||
      text.includes("teeth") ||
      text.includes("gum") ||
      text.includes("dental")
    ) {
      result = {
        doctor: "Dentist",
        specialty: "Dentistry",
        icon: "🦷",
        reason:
          "Your symptoms appear to involve your teeth or gums.",
        nextStep:
          "Please consult a Dentist for proper dental evaluation.",
      };
    } else if (
      text.includes("ear") ||
      text.includes("hearing") ||
      text.includes("nose") ||
      text.includes("throat")
    ) {
      result = {
        doctor: "ENT Specialist",
        specialty: "ENT",
        icon: "👂",
        reason:
          "Your symptoms may involve the ear, nose, or throat.",
        nextStep:
          "Please consult an ENT Specialist for proper evaluation.",
      };
    } else if (
      text.includes("fever") ||
      text.includes("cough") ||
      text.includes("cold") ||
      text.includes("headache") ||
      text.includes("body pain") ||
      text.includes("weakness")
    ) {
      result = {
        doctor: "General Physician",
        specialty: "General Medicine",
        icon: "👨‍⚕️",
        reason:
          "Your symptoms are commonly evaluated first by a general physician.",
        nextStep:
          "Please consult a General Physician for proper evaluation.",
      };
    } else {
      result = {
        doctor: "General Physician",
        specialty: "General Medicine",
        icon: "👨‍⚕️",
        reason:
          "The symptoms entered do not match a specific specialty in this system.",
        nextStep:
          "A General Physician can evaluate your symptoms and guide you to the appropriate specialist if required.",
      };
    }

    setRecommendation(result);
    const u = JSON.parse(localStorage.getItem("user") || "null");
    if (u) fetch("http://https://smart-health-portal-backend-production.up.railway.app/api/action-logs", { method:"POST", headers:{"Content-Type":"application/json"}, body:JSON.stringify({user_id:u.id,action:"Doctor recommendation",details:result.specialty,page:"Doctor Recommendation"}) }).catch(()=>{});
  };

  const clearRecommendation = () => {
    setSymptoms("");
    setRecommendation(null);
  };

  return (
    <div className="doctor-page">
      <div className="doctor-container">

        {/* Header */}
        <div className="doctor-header">
          <div className="doctor-main-icon">👨‍⚕️</div>

          <h1>Doctor Recommendation</h1>

          <p>
            Enter your symptoms and get a suggested medical
            specialty for further consultation.
          </p>
        </div>

        {/* Input Card */}
        <div className="doctor-card">

          <label>Describe Your Symptoms</label>

          <textarea
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            placeholder="Example: I have fever and cough"
            rows="5"
          />

          <div className="doctor-buttons">

            <button
              className="recommend-btn"
              onClick={getRecommendation}
            >
              👨‍⚕️ Get Recommendation
            </button>

            <button
              className="doctor-clear-btn"
              onClick={clearRecommendation}
            >
              Clear
            </button>

          </div>
        </div>

        {/* Recommendation Result */}
        {recommendation && (
          <div className="recommendation-result">

            <div className="result-title">
              <span>✅</span>
              <h2>Doctor Recommendation</h2>
            </div>

            <div className="doctor-result-main">

              <div className="recommendation-icon">
                {recommendation.icon}
              </div>

              <div>
                <p className="result-label">
                  Recommended Doctor
                </p>

                <h3>{recommendation.doctor}</h3>

                <p className="specialty-text">
                  Specialty: <strong>{recommendation.specialty}</strong>
                </p>
              </div>

            </div>

            <div className="recommendation-box">
              <h4>📋 Why this recommendation?</h4>

              <p>{recommendation.reason}</p>
            </div>

            <div className="next-step-box">
              <h4>➡️ Recommended Next Step</h4>

              <p>{recommendation.nextStep}</p>
            </div>

            <div className="doctor-warning">
              ⚠️ <strong>Important:</strong> This tool provides
              general guidance only and does not diagnose diseases.
              Please consult a qualified healthcare professional.
            </div>

          </div>
        )}

        {/* Information */}
        <div className="doctor-info">

          <h2>How It Works</h2>

          <div className="doctor-steps">

            <div>
              <span>1</span>
              <p>Enter your symptoms</p>
            </div>

            <div>
              <span>2</span>
              <p>System analyzes your symptoms</p>
            </div>

            <div>
              <span>3</span>
              <p>Get a suggested medical specialty</p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}

export default DoctorRecommendation;