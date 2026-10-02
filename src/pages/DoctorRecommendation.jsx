import { useState } from "react";
import "./DoctorRecommendation.css";

const API =
  "https://smart-health-portal-backend-production.up.railway.app";

function DoctorRecommendation() {
  const [symptoms, setSymptoms] = useState("");
  const [recommendation, setRecommendation] = useState(null);

  // ------------------------------------------------------------
  // CHECK WHOLE WORD / PHRASE
  // Prevents "heart" from accidentally matching "ear"
  // ------------------------------------------------------------
  const hasSymptom = (text, words) => {
    return words.some((word) => {
      const escaped = word.replace(
        /[.*+?^${}()|[\]\\]/g,
        "\\$&"
      );

      return new RegExp(
        `\\b${escaped}\\b`,
        "i"
      ).test(text);
    });
  };

  // ------------------------------------------------------------
  // GET DOCTOR RECOMMENDATION
  // ------------------------------------------------------------
  const getRecommendation = () => {
    const text = symptoms
      .toLowerCase()
      .trim();

    if (!text) {
      alert("Please enter your symptoms.");
      return;
    }

    let result;

    // ----------------------------------------------------------
    // HEARTBURN / ACIDITY / REFLUX
    // Check this BEFORE ENT so "heart" does not
    // accidentally match "ear".
    // ----------------------------------------------------------
    if (
      hasSymptom(text, [
        "heartburn",
        "heart burning",
        "heart burn",
        "acidity",
        "acid reflux",
        "acidic",
        "reflux",
        "indigestion",
        "gas",
        "stomach burning",
        "burning in stomach"
      ])
    ) {
      result = {
        doctor: "Gastroenterologist",
        specialty: "Gastroenterology",
        icon: "🩺",
        reason:
          "Your symptoms may be related to digestive or acid-reflux concerns.",
        nextStep:
          "Please consult a Gastroenterologist for proper evaluation if symptoms persist or recur."
      };
    }

    // ----------------------------------------------------------
    // HEART / CHEST RELATED
    // ----------------------------------------------------------
    else if (
      hasSymptom(text, [
        "chest pain",
        "heart pain",
        "heart problem",
        "palpitation",
        "palpitations",
        "irregular heartbeat",
        "heartbeat",
        "chest pressure",
        "chest tightness",
        "heart"
      ])
    ) {
      result = {
        doctor: "Cardiologist",
        specialty: "Cardiology",
        icon: "❤️",
        reason:
          "Your symptoms involve chest or heart-related concerns.",
        nextStep:
          "Please consult a Cardiologist for proper heart evaluation."
      };
    }

    // ----------------------------------------------------------
    // SKIN RELATED
    // ----------------------------------------------------------
    else if (
      hasSymptom(text, [
        "skin",
        "rash",
        "itching",
        "itch",
        "acne",
        "pimples",
        "pimple",
        "eczema",
        "skin irritation"
      ])
    ) {
      result = {
        doctor: "Dermatologist",
        specialty: "Dermatology",
        icon: "🩺",
        reason:
          "Your symptoms appear to involve the skin.",
        nextStep:
          "Please consult a Dermatologist for proper skin evaluation."
      };
    }

    // ----------------------------------------------------------
    // EYE RELATED
    // ----------------------------------------------------------
    else if (
      hasSymptom(text, [
        "eye",
        "eyes",
        "vision",
        "blurred vision",
        "blurred",
        "eye pain",
        "red eye",
        "watery eyes"
      ])
    ) {
      result = {
        doctor: "Ophthalmologist",
        specialty: "Ophthalmology",
        icon: "👁️",
        reason:
          "Your symptoms appear to involve your eyes or vision.",
        nextStep:
          "Please consult an Ophthalmologist for an eye examination."
      };
    }

    // ----------------------------------------------------------
    // DENTAL RELATED
    // ----------------------------------------------------------
    else if (
      hasSymptom(text, [
        "tooth",
        "teeth",
        "toothache",
        "gum",
        "gums",
        "dental",
        "tooth pain"
      ])
    ) {
      result = {
        doctor: "Dentist",
        specialty: "Dentistry",
        icon: "🦷",
        reason:
          "Your symptoms appear to involve your teeth or gums.",
        nextStep:
          "Please consult a Dentist for proper dental evaluation."
      };
    }

    // ----------------------------------------------------------
    // ENT RELATED
    // IMPORTANT:
    // Whole-word matching prevents "heart" from matching "ear".
    // ----------------------------------------------------------
    else if (
      hasSymptom(text, [
        "ear",
        "earache",
        "hearing",
        "hearing loss",
        "nose",
        "blocked nose",
        "runny nose",
        "sinus",
        "sinusitis",
        "throat",
        "sore throat",
        "tonsil"
      ])
    ) {
      result = {
        doctor: "ENT Specialist",
        specialty: "ENT",
        icon: "👂",
        reason:
          "Your symptoms may involve the ear, nose, or throat.",
        nextStep:
          "Please consult an ENT Specialist for proper evaluation."
      };
    }

    // ----------------------------------------------------------
    // GENERAL MEDICINE
    // ----------------------------------------------------------
    else if (
      hasSymptom(text, [
        "fever",
        "cough",
        "cold",
        "headache",
        "body pain",
        "weakness",
        "fatigue",
        "vomiting",
        "nausea",
        "dizziness",
        "sore body"
      ])
    ) {
      result = {
        doctor: "General Physician",
        specialty: "General Medicine",
        icon: "👨‍⚕️",
        reason:
          "Your symptoms are commonly evaluated first by a general physician.",
        nextStep:
          "Please consult a General Physician for proper evaluation."
      };
    }

    // ----------------------------------------------------------
    // DEFAULT
    // ----------------------------------------------------------
    else {
      result = {
        doctor: "General Physician",
        specialty: "General Medicine",
        icon: "👨‍⚕️",
        reason:
          "The symptoms entered do not match a specific specialty in this system.",
        nextStep:
          "A General Physician can evaluate your symptoms and guide you to the appropriate specialist if required."
      };
    }

    setRecommendation(result);

    // ----------------------------------------------------------
    // SAVE ACTION LOG
    // ----------------------------------------------------------
    try {
      const u = JSON.parse(
        localStorage.getItem("user") || "null"
      );

      if (u?.id) {
        fetch(
          `${API}/api/action-logs`,
          {
            method: "POST",

            headers: {
              "Content-Type":
                "application/json"
            },

            body: JSON.stringify({
              user_id: u.id,
              action:
                "Doctor recommendation",
              details:
                result.specialty,
              page:
                "Doctor Recommendation"
            })
          }
        ).catch((error) => {
          console.error(
            "Action log error:",
            error
          );
        });
      }
    } catch (error) {
      console.error(
        "User data error:",
        error
      );
    }
  };

  // ------------------------------------------------------------
  // CLEAR
  // ------------------------------------------------------------
  const clearRecommendation = () => {
    setSymptoms("");
    setRecommendation(null);
  };

  // ------------------------------------------------------------
  // UI
  // ------------------------------------------------------------
  return (
    <div className="doctor-page">

      <div className="doctor-container">

        {/* Header */}
        <div className="doctor-header">

          <div className="doctor-main-icon">
            👨‍⚕️
          </div>

          <h1>
            Doctor Recommendation
          </h1>

          <p>
            Enter your symptoms and get a suggested
            medical specialty for further consultation.
          </p>

        </div>


        {/* Input Card */}
        <div className="doctor-card">

          <label>
            Describe Your Symptoms
          </label>

          <textarea
            value={symptoms}
            onChange={(e) =>
              setSymptoms(e.target.value)
            }
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

              <h2>
                Doctor Recommendation
              </h2>

            </div>


            <div className="doctor-result-main">

              <div className="recommendation-icon">
                {recommendation.icon}
              </div>

              <div>

                <p className="result-label">
                  Recommended Doctor
                </p>

                <h3>
                  {recommendation.doctor}
                </h3>

                <p className="specialty-text">
                  Specialty:{" "}
                  <strong>
                    {recommendation.specialty}
                  </strong>
                </p>

              </div>

            </div>


            {/* Reason */}
            <div className="recommendation-box">

              <h4>
                📋 Why this recommendation?
              </h4>

              <p>
                {recommendation.reason}
              </p>

            </div>


            {/* Next Step */}
            <div className="next-step-box">

              <h4>
                ➡️ Recommended Next Step
              </h4>

              <p>
                {recommendation.nextStep}
              </p>

            </div>


            {/* Warning */}
            <div className="doctor-warning">

              ⚠️{" "}
              <strong>
                Important:
              </strong>{" "}

              This tool provides general guidance
              only and does not diagnose diseases.
              Please consult a qualified healthcare
              professional.

            </div>

          </div>

        )}


        {/* Information */}
        <div className="doctor-info">

          <h2>
            How It Works
          </h2>

          <div className="doctor-steps">

            <div>
              <span>1</span>
              <p>
                Enter your symptoms
              </p>
            </div>

            <div>
              <span>2</span>
              <p>
                System analyzes your symptoms
              </p>
            </div>

            <div>
              <span>3</span>
              <p>
                Get a suggested medical specialty
              </p>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default DoctorRecommendation;