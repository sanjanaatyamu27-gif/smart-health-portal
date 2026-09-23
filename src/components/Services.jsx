import {
  FaHeartbeat,
  FaHospital,
  FaRobot,
  FaNotesMedical,
  FaPills,
  FaUserMd,
} from "react-icons/fa";

function Services() {
  const services = [
    {
      icon: <FaHeartbeat className="text-5xl text-red-500" />,
      title: "Health Tips",
      desc: "Daily health and hygiene tips for a better lifestyle.",
    },
    {
      icon: <FaHospital className="text-5xl text-blue-600" />,
      title: "Nearby Hospitals",
      desc: "Locate hospitals and healthcare centers quickly.",
    },
    {
      icon: <FaRobot className="text-5xl text-green-600" />,
      title: "AI Health Chatbot",
      desc: "Get instant answers to general health questions.",
    },
    {
      icon: <FaNotesMedical className="text-5xl text-purple-600" />,
      title: "BMI Tracker",
      desc: "Calculate your BMI and receive health guidance.",
    },
    {
      icon: <FaPills className="text-5xl text-orange-500" />,
      title: "Pill Reminder",
      desc: "Never miss your medicine with smart reminders.",
    },
    {
      icon: <FaUserMd className="text-5xl text-cyan-600" />,
      title: "Doctor Recommendation",
      desc: "Find the right specialist based on your symptoms.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-8">
        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Our Services
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {service.icon}
              </div>

              <h3 className="text-2xl font-semibold mb-3">
                {service.title}
              </h3>

              <p className="text-gray-600">
                {service.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;