import { FaUserMd, FaClock, FaShieldAlt, FaGlobe } from "react-icons/fa";

function WhyChooseUs() {
  const features = [
    {
      icon: <FaUserMd className="text-5xl text-blue-600" />,
      title: "Expert Health Guidance",
      description: "Get reliable health information and recommendations."
    },
    {
      icon: <FaClock className="text-5xl text-green-600" />,
      title: "24/7 Availability",
      description: "Access health resources anytime, anywhere."
    },
    {
      icon: <FaShieldAlt className="text-5xl text-red-500" />,
      title: "Safe & Secure",
      description: "Your information remains protected and secure."
    },
    {
      icon: <FaGlobe className="text-5xl text-purple-600" />,
      title: "Accessible for Everyone",
      description: "Designed to promote health awareness for all users."
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Why Choose Us?
        </h2>

        <div className="grid md:grid-cols-4 gap-8">

          {features.map((item, index) => (
            <div
              key={index}
              className="bg-sky-50 rounded-2xl p-8 shadow-lg text-center hover:shadow-xl transition"
            >
              <div className="flex justify-center mb-5">
                {item.icon}
              </div>

              <h3 className="text-xl font-bold mb-3">
                {item.title}
              </h3>

              <p className="text-gray-600">
                {item.description}
              </p>

            </div>
          ))}

        </div>

      </div>
    </section>
  );
}

export default WhyChooseUs;