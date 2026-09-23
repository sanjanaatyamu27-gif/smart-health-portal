function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-50 via-white to-cyan-50 py-20">
      <div className="max-w-7xl mx-auto px-6 flex flex-col-reverse md:flex-row items-center justify-between gap-12">

        {/* Left Side */}
        <div className="md:w-1/2">

          <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full font-semibold">
            Welcome to Smart Healthcare
          </span>

          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mt-6 leading-tight">
            Smart Health &
            <span className="text-blue-600"> Hygiene Portal</span>
          </h1>

          <p className="text-gray-600 text-lg mt-6 leading-relaxed">
            Your one-stop platform for health awareness, disease prevention,
            healthcare guidance, and easy access to essential health services.
          </p>

          <div className="mt-8 flex gap-4">
            <button
              className="bg-blue-600 text-white px-7 py-3 rounded-lg
              font-semibold hover:bg-blue-700 transition"
            >
              Explore Now
            </button>

            <button
              className="border border-blue-600 text-blue-600 px-7 py-3
              rounded-lg font-semibold hover:bg-blue-50 transition"
            >
              Learn More
            </button>
          </div>

        </div>

        {/* Right Side */}
        <div className="md:w-1/2 flex justify-center">

          <div className="w-80 h-80 bg-white rounded-full shadow-xl
            flex items-center justify-center border-8 border-blue-100">

            <div className="text-center">
              <div className="text-8xl">❤️</div>

              <h2 className="text-2xl font-bold text-blue-700 mt-4">
                Stay Healthy
              </h2>

              <p className="text-gray-500 mt-2">
                Stay Safe • Stay Aware
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

export default Hero;