import { Link } from "react-router-dom";
import Emergency from "../components/Emergency";

function Home() {
  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  return (
    <div className="min-h-screen bg-white">

      {/* ================= HERO ================= */}

      <section className="bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-16 px-6">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">

          <div>

            <p className="text-blue-600 font-semibold tracking-widest uppercase">
              Smart Healthcare Solution
            </p>

            <h1 className="text-5xl md:text-6xl font-bold text-gray-800 mt-4 leading-tight">
              Smart Health &
              <span className="block text-blue-600">
                Hygiene Portal
              </span>
            </h1>

            <p className="text-gray-600 text-lg mt-6 leading-8">
              A smart healthcare awareness platform providing health
              information, disease awareness, hospital access and
              useful healthcare tools.
            </p>

            <div className="flex gap-4 mt-8 flex-wrap">

              <Link
                to="/healthtips"
                className="bg-blue-600 text-white px-7 py-3 rounded-lg font-semibold hover:bg-blue-700 no-underline"
              >
                Explore Health Tips
              </Link>

              <Link
                to="/posters"
                className="border border-blue-600 text-blue-600 px-7 py-3 rounded-lg font-semibold hover:bg-blue-50 no-underline"
              >
                Awareness Posters
              </Link>

            </div>

          </div>

          <div className="flex justify-center">

            <div className="bg-white rounded-3xl shadow-2xl p-12 text-center">

              <div className="w-44 h-44 rounded-full bg-blue-100 flex items-center justify-center mx-auto">

                <span className="text-8xl">
                  ❤️
                </span>

              </div>

              <h2 className="text-2xl font-bold text-gray-800 mt-7">
                Your Health Matters
              </h2>

              <p className="text-gray-500 mt-3">
                Learn. Track. Stay Healthy.
              </p>

            </div>

          </div>

        </div>

      </section>


      {/* ================= AWARENESS ================= */}

      <section className="py-16 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-blue-600 font-semibold">
              HEALTH AWARENESS
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mt-3">
              Learn About Your Health
            </h2>

            <p className="text-gray-500 mt-4">
              Reliable information for a healthier lifestyle.
            </p>

          </div>


          <div className="grid md:grid-cols-3 gap-8">

            {/* HEALTH TIPS */}

            <div className="bg-white shadow-lg rounded-2xl p-8 border">

              <div className="text-5xl">
                ❤️
              </div>

              <h3 className="text-2xl font-bold mt-5">
                Health Tips
              </h3>

              <p className="text-gray-500 mt-3">
                Learn simple health and hygiene practices for everyday life.
              </p>

              <Link
                to="/healthtips"
                className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold no-underline hover:bg-blue-700"
              >
                Learn More →
              </Link>

            </div>


            {/* DISEASES */}

            <div className="bg-white shadow-lg rounded-2xl p-8 border">

              <div className="text-5xl">
                🦠
              </div>

              <h3 className="text-2xl font-bold mt-5">
                Disease Awareness
              </h3>

              <p className="text-gray-500 mt-3">
                Understand common diseases, symptoms and prevention methods.
              </p>

              <Link
                to="/diseases"
                className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold no-underline hover:bg-blue-700"
              >
                View Details →
              </Link>

            </div>


            {/* HOSPITALS */}

            <div className="bg-white shadow-lg rounded-2xl p-8 border">

              <div className="text-5xl">
                🏥
              </div>

              <h3 className="text-2xl font-bold mt-5">
                Nearby Hospitals
              </h3>

              <p className="text-gray-500 mt-3">
                Find hospitals and healthcare facilities near you.
              </p>

              <a
                href="https://www.google.com/maps/search/hospitals+near+me"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold no-underline hover:bg-blue-700"
              >
                🗺️ Google Maps →
              </a>

            </div>

          </div>

        </div>

      </section>


      {/* ================= HEALTHCARE TOOLS ================= */}

      <section className="bg-blue-50 py-16 px-6">

        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">

            <p className="text-blue-600 font-semibold">
              OUR HEALTHCARE SERVICES
            </p>

            <h2 className="text-4xl font-bold text-gray-800 mt-3">
              Smart Tools for Better Health
            </h2>

          </div>


          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">


            {/* BMI */}

            <ServiceCard
              icon="⚖️"
              title="BMI Tracker"
              description="Calculate your BMI and understand your general weight category."
              link={isLoggedIn ? "/bmi" : "/login"}
              button={isLoggedIn ? "Open BMI Tracker" : "Login to Access"}
            />


            {/* PILL */}

            <ServiceCard
              icon="💊"
              title="Pill Reminder"
              description="Set reminders and manage your daily medication schedule."
              link={isLoggedIn ? "/pill-reminder" : "/login"}
              button={isLoggedIn ? "Open Pill Reminder" : "Login to Access"}
            />


            {/* OP QUEUE */}

            <ServiceCard
              icon="🎫"
              title="OP Queue"
              description="Check your outpatient queue position and waiting information."
              link={isLoggedIn ? "/op-queue" : "/login"}
              button={isLoggedIn ? "Open OP Queue" : "Login to Access"}
            />


            {/* DOCTOR */}

            <ServiceCard
              icon="👨‍⚕️"
              title="Doctor Recommendation"
              description="Get a general specialty recommendation based on symptoms."
              link={isLoggedIn ? "/doctor-recommendation" : "/login"}
              button={
                isLoggedIn
                  ? "Get Recommendation"
                  : "Login to Access"
              }
            />


            {/* CHATBOT */}

            <ServiceCard
              icon="🤖"
              title="AI Health Chatbot"
              description="Ask general health and hygiene awareness questions."
              link={isLoggedIn ? "/chatbot" : "/login"}
              button={
                isLoggedIn
                  ? "Open AI Chatbot"
                  : "Login to Access"
              }
            />


            {/* POSTERS */}

            <ServiceCard
              icon="📋"
              title="Health Awareness Posters"
              description="Explore posters covering hygiene, nutrition, exercise and disease prevention."
              link="/posters"
              button="Explore Posters"
            />

          </div>

        </div>

      </section>


      <Emergency />

      {/* ================= CTA ================= */}

      <section className="py-16 px-6">

        <div className="max-w-5xl mx-auto bg-blue-600 rounded-3xl text-white text-center p-12">

          <h2 className="text-4xl font-bold">
            Take Care of Your Health
          </h2>

          <p className="mt-4 text-blue-100">
            Explore health information and smart healthcare tools.
          </p>

          <Link
            to="/feedback"
            className="inline-block mt-7 bg-white text-blue-600 px-7 py-3 rounded-lg font-semibold no-underline"
          >
            Give Feedback
          </Link>

        </div>

      </section>




    </div>
  );
}


/* ================= SERVICE CARD ================= */

function ServiceCard({
  icon,
  title,
  description,
  link,
  button
}) {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition">

      <div className="text-5xl mb-5">
        {icon}
      </div>

      <h3 className="text-2xl font-bold text-gray-800">
        {title}
      </h3>

      <p className="text-gray-500 mt-3 leading-7">
        {description}
      </p>

      <Link
        to={link}
        className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-700 no-underline"
      >
        {button}
      </Link>

    </div>
  );
}

export default Home;