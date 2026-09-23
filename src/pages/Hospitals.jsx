function Hospitals() {
  const openGoogleMaps = () => {
    window.open(
      "https://www.google.com/maps/search/hospitals+near+me",
      "_blank"
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">

      {/* HEADER */}

      <section className="bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-16 px-6 text-center">

        <p className="uppercase tracking-widest font-semibold">
          Healthcare Facilities
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mt-3">
          Nearby Hospitals
        </h1>

        <p className="max-w-2xl mx-auto mt-5 text-blue-100 text-lg">
          Find hospitals and healthcare facilities near your location.
        </p>

      </section>


      {/* CONTENT */}

      <section className="max-w-6xl mx-auto py-16 px-6">

        <div className="grid md:grid-cols-2 gap-10 items-center">

          {/* INFORMATION */}

          <div className="bg-white rounded-2xl shadow-lg p-10">

            <div className="text-7xl">
              🏥
            </div>

            <h2 className="text-3xl font-bold text-gray-800 mt-6">
              Find Hospitals Near You
            </h2>

            <p className="text-gray-600 mt-5 leading-8">
              Use Google Maps to find hospitals, clinics and healthcare
              facilities close to your current location.
            </p>

            <button
              onClick={openGoogleMaps}
              className="mt-8 bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              🗺️ Open Google Maps
            </button>

          </div>


          {/* SERVICES */}

          <div className="bg-white rounded-2xl shadow-lg p-10">

            <h2 className="text-2xl font-bold text-gray-800">
              Available Healthcare Facilities
            </h2>

            <div className="space-y-5 mt-7">

              <div className="flex gap-4 items-center">
                <span className="text-3xl">🏥</span>
                <div>
                  <h3 className="font-bold">
                    Hospitals
                  </h3>
                  <p className="text-gray-500">
                    Find nearby hospitals.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-3xl">🩺</span>
                <div>
                  <h3 className="font-bold">
                    Clinics
                  </h3>
                  <p className="text-gray-500">
                    Locate nearby clinics.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-3xl">💊</span>
                <div>
                  <h3 className="font-bold">
                    Pharmacies
                  </h3>
                  <p className="text-gray-500">
                    Find nearby pharmacies.
                  </p>
                </div>
              </div>

              <div className="flex gap-4 items-center">
                <span className="text-3xl">🚑</span>
                <div>
                  <h3 className="font-bold">
                    Emergency Facilities
                  </h3>
                  <p className="text-gray-500">
                    Search for emergency healthcare facilities.
                  </p>
                </div>
              </div>

            </div>

          </div>

        </div>


        {/* MAP BUTTON */}

        <div className="mt-10 bg-blue-50 rounded-2xl p-8 text-center">

          <h2 className="text-2xl font-bold text-gray-800">
            Need a Hospital?
          </h2>

          <p className="text-gray-600 mt-3">
            Click below to search hospitals based on your location.
          </p>

          <button
            onClick={openGoogleMaps}
            className="mt-6 bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            📍 Find Hospitals on Google Maps
          </button>

        </div>

      </section>

    </div>
  );
}

export default Hospitals;