function Diseases() {
  const diseases = [
    {
      icon: "🤒",
      name: "Common Cold",
      description:
        "A common viral infection that can affect the nose and throat.",
      symptoms: "Runny nose, cough, sneezing, sore throat",
      prevention: "Wash hands regularly and avoid close contact with sick people.",
    },
    {
      icon: "🌡️",
      name: "Flu",
      description:
        "A contagious respiratory infection caused by influenza viruses.",
      symptoms: "Fever, cough, body aches, tiredness",
      prevention: "Maintain hygiene and follow recommended preventive measures.",
    },
    {
      icon: "🫁",
      name: "Asthma",
      description:
        "A condition that can cause breathing difficulties and airway sensitivity.",
      symptoms: "Wheezing, coughing, shortness of breath",
      prevention: "Identify triggers and follow advice from healthcare professionals.",
    },
    {
      icon: "❤️",
      name: "Heart Disease",
      description:
        "A group of conditions affecting the heart and cardiovascular system.",
      symptoms: "Chest discomfort, breathlessness, unusual fatigue",
      prevention: "Maintain a healthy lifestyle and get regular health checkups.",
    },
    {
      icon: "🩸",
      name: "Diabetes",
      description:
        "A condition involving high blood glucose levels over time.",
      symptoms: "Increased thirst, frequent urination, fatigue",
      prevention: "Maintain a balanced lifestyle and monitor health regularly.",
    },
    {
      icon: "🦟",
      name: "Dengue Awareness",
      description:
        "A mosquito-borne viral infection that requires appropriate medical care.",
      symptoms: "Fever, headache, body aches, weakness",
      prevention: "Prevent mosquito bites and eliminate standing water.",
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl mb-4">🦠</div>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Disease Awareness
          </h1>

          <p className="max-w-3xl mx-auto text-blue-50 text-lg leading-relaxed">
            Learn about common health conditions, their general symptoms and
            preventive practices to improve health awareness.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Know the Signs. Stay Aware.
          </h2>

          <p className="text-slate-600 max-w-3xl mx-auto leading-7">
            Understanding basic health information can encourage people to
            recognize concerning symptoms and seek appropriate professional
            medical advice when necessary.
          </p>
        </div>
      </section>

      {/* Disease Cards */}
      <section className="max-w-7xl mx-auto px-6 pb-16">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">
            Common Health Conditions
          </h2>

          <p className="text-slate-500 mt-2">
            General awareness information for educational purposes.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {diseases.map((disease, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl
              transition duration-300 p-7 border border-slate-100
              hover:-translate-y-1"
            >
              <div className="w-16 h-16 rounded-full bg-blue-50
                flex items-center justify-center text-3xl mb-5">
                {disease.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {disease.name}
              </h3>

              <p className="text-slate-600 leading-6 mb-5">
                {disease.description}
              </p>

              <div className="mb-4">
                <h4 className="font-semibold text-blue-700 mb-1">
                  Common Symptoms
                </h4>

                <p className="text-sm text-slate-600">
                  {disease.symptoms}
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-green-700 mb-1">
                  Prevention & Awareness
                </h4>

                <p className="text-sm text-slate-600">
                  {disease.prevention}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Warning */}
      <section className="max-w-5xl mx-auto px-6 pb-12">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-6">
          <h3 className="font-bold text-amber-800 mb-2">
            ⚠️ Important Health Notice
          </h3>

          <p className="text-sm text-amber-700 leading-6">
            This information is provided for general awareness and education.
            Symptoms can have different causes. For diagnosis or treatment,
            consult a qualified healthcare professional.
          </p>
        </div>
      </section>

    </div>
  );
}

export default Diseases;