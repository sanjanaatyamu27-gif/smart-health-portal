import {
  FaAmbulance,
  FaShieldAlt,
  FaFireExtinguisher,
  FaFemale,
  FaChild,
  FaPhoneAlt,
} from "react-icons/fa";

function Emergency() {
  const emergency = [
    {
      icon: <FaAmbulance className="text-5xl text-red-600" />,
      title: "Ambulance",
      number: "108",
    },
    {
      icon: <FaShieldAlt className="text-5xl text-blue-600" />,
      title: "Police",
      number: "100",
    },
    {
      icon: <FaFireExtinguisher className="text-5xl text-orange-500" />,
      title: "Fire",
      number: "101",
    },
    {
      icon: <FaFemale className="text-5xl text-pink-500" />,
      title: "Women Helpline",
      number: "181",
    },
    {
      icon: <FaChild className="text-5xl text-green-600" />,
      title: "Child Helpline",
      number: "1098",
    },
    {
      icon: <FaPhoneAlt className="text-5xl text-purple-600" />,
      title: "Health Helpline",
      number: "104",
    },
  ];

  return (
    <section className="py-20 bg-red-50">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-red-700 mb-12">
          Emergency Helpline
        </h2>

        <div className="grid md:grid-cols-3 gap-8">

          {emergency.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition duration-300"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-2xl font-bold">
                {item.title}
              </h3>

              <p className="text-3xl text-red-600 font-bold mt-3">
                {item.number}
              </p>

              <button className="mt-6 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg">
                Call Now
              </button>
            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default Emergency;