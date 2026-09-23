import { FaUsers, FaHospital, FaHeartbeat, FaUserMd } from "react-icons/fa";

function Statistics() {
  const stats = [
    {
      icon: <FaUsers className="text-5xl text-blue-600" />,
      number: "10,000+",
      title: "Users Educated",
    },
    {
      icon: <FaHospital className="text-5xl text-green-600" />,
      number: "250+",
      title: "Hospitals Listed",
    },
    {
      icon: <FaHeartbeat className="text-5xl text-red-500" />,
      number: "500+",
      title: "Health Tips",
    },
    {
      icon: <FaUserMd className="text-5xl text-purple-600" />,
      number: "100+",
      title: "Doctors",
    },
  ];

  return (
    <section className="py-20 bg-sky-50">
      <div className="max-w-7xl mx-auto px-8">

        <h2 className="text-4xl font-bold text-center text-blue-800 mb-12">
          Health Statistics
        </h2>

        <div className="grid md:grid-cols-4 gap-8">
          {stats.map((item, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-2xl transition"
            >
              <div className="flex justify-center mb-4">
                {item.icon}
              </div>

              <h3 className="text-4xl font-bold text-blue-700">
                {item.number}
              </h3>

              <p className="mt-3 text-gray-600 font-medium">
                {item.title}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default Statistics;