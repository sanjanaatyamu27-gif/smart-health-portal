import { useState } from "react";

function Posters() {
  const [selectedPoster, setSelectedPoster] = useState(null);

  const posters = [
    {
      icon: "🧼",
      title: "Hand Hygiene",
      shortDescription:
        "Proper handwashing helps prevent the spread of infections and keeps you and others healthy.",
      details: [
        "Wash your hands regularly with soap and clean water.",
        "Wash your hands before eating or preparing food.",
        "Wash your hands after using the toilet.",
        "Wash your hands after coughing, sneezing, or touching your face.",
        "Use hand sanitizer when soap and water are not available.",
        "Rub your hands with soap for at least 20 seconds before rinsing."
      ],
      tips: [
        "Keep soap available near the wash area.",
        "Avoid touching your eyes, nose, and mouth with unwashed hands.",
        "Dry your hands properly after washing."
      ]
    },

    {
      icon: "🥗",
      title: "Eat Healthy",
      shortDescription:
        "A balanced diet provides the nutrients your body needs for energy, growth, and good health.",
      details: [
        "Eat a variety of fruits and vegetables every day.",
        "Include whole grains such as brown rice, oats, and whole wheat.",
        "Include protein-rich foods such as pulses, beans, eggs, nuts, or lean meat.",
        "Drink enough clean water throughout the day.",
        "Limit foods that contain excessive sugar, salt, and unhealthy fats.",
        "Avoid eating highly processed food too frequently."
      ],
      tips: [
        "Try to include different colors of vegetables and fruits in your meals.",
        "Choose homemade meals more often.",
        "Maintain balanced portions instead of overeating.",
        "Do not regularly skip important meals."
      ]
    },

    {
      icon: "🏃",
      title: "Stay Active",
      shortDescription:
        "Regular physical activity helps improve fitness, strength, mood, and overall wellbeing.",
      details: [
        "Include physical activity in your daily routine.",
        "Walking, cycling, jogging, dancing, and sports are good options.",
        "Avoid sitting continuously for long periods.",
        "Stretch your body regularly, especially after sitting for a long time.",
        "Choose activities that you enjoy so that you can maintain the habit.",
        "Increase activity gradually according to your fitness level."
      ],
      tips: [
        "Take short walking breaks during long study or work sessions.",
        "Use stairs when appropriate.",
        "Start with simple activities if you are new to exercise.",
        "Stay consistent rather than exercising only occasionally."
      ]
    },

    {
      icon: "🦠",
      title: "Disease Prevention",
      shortDescription:
        "Simple preventive practices can reduce the risk of many infections and diseases.",
      details: [
        "Maintain good personal hygiene.",
        "Wash your hands regularly.",
        "Eat nutritious food and stay physically active.",
        "Keep your surroundings clean.",
        "Follow recommended vaccination schedules.",
        "Avoid close contact with people who have contagious illnesses when appropriate.",
        "Seek medical advice when symptoms are persistent or concerning."
      ],
      tips: [
        "Do not ignore unusual or persistent symptoms.",
        "Follow advice from qualified healthcare professionals.",
        "Keep commonly touched surfaces clean.",
        "Practice respiratory hygiene by covering coughs and sneezes."
      ]
    },

    {
      icon: "💧",
      title: "Drink Water",
      shortDescription:
        "Adequate hydration supports normal body functions and helps maintain overall health.",
      details: [
        "Drink clean and safe water throughout the day.",
        "Drink more fluids when you are physically active or in hot conditions.",
        "Carry a reusable water bottle when possible.",
        "Choose water instead of sugary drinks more often.",
        "Pay attention to your body's thirst signals.",
        "Maintain good hydration as part of your daily routine."
      ],
      tips: [
        "Keep water easily accessible while studying or working.",
        "Drink water regularly instead of waiting until you are extremely thirsty.",
        "Choose safe drinking water."
      ]
    },

    {
      icon: "😴",
      title: "Healthy Sleep",
      shortDescription:
        "Good sleep helps your body recover and supports concentration, mood, and daily performance.",
      details: [
        "Maintain a consistent sleep and wake-up schedule.",
        "Create a quiet and comfortable sleeping environment.",
        "Avoid excessive screen use close to bedtime.",
        "Avoid consuming too much caffeine late in the day.",
        "Give yourself enough time to rest at night.",
        "Try to maintain a relaxing bedtime routine."
      ],
      tips: [
        "Keep your bedroom comfortable and suitable for sleep.",
        "Avoid studying or working in bed when possible.",
        "Reduce unnecessary distractions before bedtime.",
        "If sleep problems persist, consider discussing them with a healthcare professional."
      ]
    }
  ];

  const openDetails = (poster) => {
    setSelectedPoster(poster);
  };

  const closeDetails = () => {
    setSelectedPoster(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ================= HEADER ================= */}

      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6 text-center">

        <p className="uppercase tracking-widest font-semibold">
          Health Awareness
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          Health Awareness Posters
        </h1>

        <p className="max-w-3xl mx-auto mt-5 text-blue-100 text-lg leading-8">
          Explore practical health awareness topics covering hygiene,
          nutrition, physical activity, disease prevention, hydration,
          and healthy sleep.
        </p>

      </section>


      {/* ================= POSTER CARDS ================= */}

      <section className="max-w-7xl mx-auto py-16 px-6">

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {posters.map((poster, index) => (

            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition duration-300 border border-gray-100"
            >

              {/* ICON */}

              <div className="w-24 h-24 mx-auto rounded-full bg-blue-50 flex items-center justify-center">

                <span className="text-6xl">
                  {poster.icon}
                </span>

              </div>


              {/* TITLE */}

              <h2 className="text-2xl font-bold text-gray-800 text-center mt-6">
                {poster.title}
              </h2>


              {/* DESCRIPTION */}

              <p className="text-gray-500 text-center mt-4 leading-7">
                {poster.shortDescription}
              </p>


              {/* BUTTON */}

              <div className="text-center">

                <button
                  onClick={() => openDetails(poster)}
                  className="mt-6 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                >
                  Learn More →
                </button>

              </div>

            </div>

          ))}

        </div>

      </section>


      {/* ================= DETAILS SECTION ================= */}

      {selectedPoster && (

        <section className="max-w-5xl mx-auto px-6 pb-16">

          <div className="bg-white rounded-3xl shadow-2xl border border-blue-100 overflow-hidden">

            {/* DETAILS HEADER */}

            <div className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white p-8 md:p-10">

              <div className="flex items-center gap-5">

                <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center">

                  <span className="text-5xl">
                    {selectedPoster.icon}
                  </span>

                </div>

                <div>

                  <p className="text-blue-100 font-medium">
                    HEALTH AWARENESS TOPIC
                  </p>

                  <h2 className="text-3xl md:text-4xl font-bold mt-1">
                    {selectedPoster.title}
                  </h2>

                </div>

              </div>

            </div>


            {/* DETAILS CONTENT */}

            <div className="p-8 md:p-10">

              <h3 className="text-2xl font-bold text-gray-800">
                What Should I Follow?
              </h3>

              <div className="mt-6 space-y-4">

                {selectedPoster.details.map((detail, index) => (

                  <div
                    key={index}
                    className="flex gap-4 items-start"
                  >

                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold flex-shrink-0">
                      ✓
                    </div>

                    <p className="text-gray-600 leading-7">
                      {detail}
                    </p>

                  </div>

                ))}

              </div>


              {/* PRACTICAL TIPS */}

              <div className="mt-10 bg-blue-50 rounded-2xl p-7">

                <h3 className="text-xl font-bold text-blue-700">
                  💡 Practical Tips
                </h3>

                <div className="mt-5 space-y-3">

                  {selectedPoster.tips.map((tip, index) => (

                    <div
                      key={index}
                      className="flex gap-3 items-start"
                    >

                      <span className="text-blue-600 font-bold">
                        •
                      </span>

                      <p className="text-gray-600 leading-7">
                        {tip}
                      </p>

                    </div>

                  ))}

                </div>

              </div>


              {/* CLOSE BUTTON */}

              <div className="text-center mt-8">

                <button
                  onClick={closeDetails}
                  className="border border-gray-300 text-gray-700 px-7 py-3 rounded-lg font-semibold hover:bg-gray-100 transition"
                >
                  Close Details
                </button>

              </div>

            </div>

          </div>

        </section>

      )}


      {/* ================= BOTTOM INFORMATION ================= */}

      <section className="max-w-5xl mx-auto px-6 pb-16">

        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">

          <h2 className="text-2xl font-bold text-gray-800">
            Small Healthy Habits Make a Difference
          </h2>

          <p className="text-gray-500 mt-4 leading-7">
            Use these awareness topics as general health guidance.
            For medical concerns, diagnosis, or treatment decisions,
            consult a qualified healthcare professional.
          </p>

        </div>

      </section>

    </div>
  );
}

export default Posters;