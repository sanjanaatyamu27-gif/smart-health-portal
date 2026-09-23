function HealthTips() {
  const tips = [
    {
      icon: "🥗",
      title: "Healthy Nutrition",
      description:
        "Eat a balanced diet containing vegetables, fruits, whole grains, proteins and healthy fats.",
      points: [
        "Include fresh fruits and vegetables",
        "Choose nutritious home-cooked meals",
        "Limit excess sugar and processed foods",
      ],
    },
    {
      icon: "🏃",
      title: "Regular Exercise",
      description:
        "Regular physical activity helps maintain fitness, improves energy and supports overall well-being.",
      points: [
        "Stay physically active every day",
        "Walk, stretch or exercise regularly",
        "Avoid sitting continuously for long periods",
      ],
    },
    {
      icon: "💧",
      title: "Stay Hydrated",
      description:
        "Drinking enough water is important for normal body functions and maintaining energy.",
      points: [
        "Drink water regularly throughout the day",
        "Carry a reusable water bottle",
        "Increase fluids during hot weather and exercise",
      ],
    },
    {
      icon: "🧼",
      title: "Personal Hygiene",
      description:
        "Good hygiene practices help reduce the spread of germs and infections.",
      points: [
        "Wash hands regularly with soap",
        "Maintain personal cleanliness",
        "Keep your surroundings clean",
      ],
    },
    {
      icon: "😴",
      title: "Quality Sleep",
      description:
        "Adequate sleep supports physical recovery, concentration and daily performance.",
      points: [
        "Maintain a consistent sleep schedule",
        "Create a comfortable sleeping environment",
        "Reduce screen use before bedtime",
      ],
    },
    {
      icon: "🧘",
      title: "Mental Wellness",
      description:
        "Taking care of your mental well-being is an important part of maintaining a healthy lifestyle.",
      points: [
        "Take regular breaks from work or study",
        "Practice relaxation activities",
        "Talk to trusted people when you need support",
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50">

      {/* Header */}
      <section className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-6 py-16 text-center">
          <div className="text-5xl mb-4">❤️</div>

          <h1 className="text-4xl md:text-5xl font-bold mb-5">
            Healthy Living Tips
          </h1>

          <p className="max-w-3xl mx-auto text-blue-50 text-lg leading-relaxed">
            Simple and practical health tips to help you build healthy habits,
            improve your daily lifestyle and increase health awareness.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="max-w-6xl mx-auto px-6 py-12">
        <div className="bg-white rounded-2xl shadow-md p-8 border border-slate-100 text-center">
          <h2 className="text-3xl font-bold text-slate-800 mb-4">
            Small Habits, Big Difference
          </h2>

          <p className="text-slate-600 max-w-3xl mx-auto leading-7">
            Maintaining good health is not only about treating illness.
            Healthy food, physical activity, hygiene, proper sleep and
            emotional well-being all contribute to a healthier lifestyle.
          </p>
        </div>
      </section>

      {/* Tips */}
      <section className="max-w-7xl mx-auto px-6 pb-16">

        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-slate-800">
            Essential Health Tips
          </h2>

          <p className="text-slate-500 mt-2">
            Follow these simple practices for a healthier lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">

          {tips.map((tip, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl
              transition duration-300 p-7 border border-slate-100
              hover:-translate-y-1"
            >

              <div className="w-16 h-16 rounded-full bg-blue-50
                flex items-center justify-center text-3xl mb-5">
                {tip.icon}
              </div>

              <h3 className="text-xl font-bold text-slate-800 mb-3">
                {tip.title}
              </h3>

              <p className="text-slate-600 leading-6 mb-5">
                {tip.description}
              </p>

              <ul className="space-y-3">
                {tip.points.map((point, pointIndex) => (
                  <li
                    key={pointIndex}
                    className="flex items-start gap-2 text-sm text-slate-600"
                  >
                    <span className="text-blue-600 font-bold">✓</span>
                    <span>{point}</span>
                  </li>
                ))}
              </ul>

            </div>
          ))}

        </div>
      </section>

      {/* Daily Reminder */}
      <section className="bg-blue-50 border-y border-blue-100">
        <div className="max-w-5xl mx-auto px-6 py-12 text-center">

          <div className="text-4xl mb-3">🌱</div>

          <h2 className="text-2xl font-bold text-slate-800 mb-3">
            Your Daily Health Reminder
          </h2>

          <p className="text-slate-600 max-w-2xl mx-auto leading-7">
            Stay active, eat nutritious food, drink enough water, maintain
            personal hygiene and give yourself enough time to rest.
          </p>

        </div>
      </section>

      {/* Disclaimer */}
      <section className="max-w-5xl mx-auto px-6 py-10">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-5">
          <h3 className="font-bold text-amber-800 mb-2">
            ⚠️ Health Awareness Notice
          </h3>

          <p className="text-sm text-amber-700 leading-6">
            The information provided on this page is intended for general
            health awareness and educational purposes. It should not replace
            professional medical advice, diagnosis or treatment.
          </p>
        </div>
      </section>

    </div>
  );
}

export default HealthTips;