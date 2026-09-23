import { useState } from "react";

function Feedback() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [rating, setRating] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !rating || !message) {
      alert("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "http://localhost:5000/api/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            email,
            rating,
            message,
          }),
        }
      );

      const data = await response.json();

      if (data.success) {
        alert("✅ Feedback submitted successfully!");

        setName("");
        setEmail("");
        setRating("");
        setMessage("");
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error(error);

      alert(
        "❌ Could not connect to the backend. Make sure the backend server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">
      <div className="max-w-2xl mx-auto">

        <div className="text-center mb-10">
          <div className="text-6xl mb-4">
            💬
          </div>

          <h1 className="text-4xl font-bold text-blue-700">
            Feedback
          </h1>

          <p className="text-gray-600 mt-3">
            We would love to hear your feedback about
            Smart Health Portal.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-xl p-8">

          <form onSubmit={handleSubmit}>

            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <div className="mb-5">
              <label className="block font-semibold text-gray-700 mb-2">
                Rate Your Experience
              </label>

              <select
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                <option value="">
                  Select Rating
                </option>

                <option value="5">
                  ⭐⭐⭐⭐⭐ Excellent
                </option>

                <option value="4">
                  ⭐⭐⭐⭐ Very Good
                </option>

                <option value="3">
                  ⭐⭐⭐ Good
                </option>

                <option value="2">
                  ⭐⭐ Average
                </option>

                <option value="1">
                  ⭐ Poor
                </option>
              </select>
            </div>

            <div className="mb-6">
              <label className="block font-semibold text-gray-700 mb-2">
                Your Feedback
              </label>

              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Write your feedback here..."
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >
              {loading
                ? "Submitting..."
                : "Submit Feedback"}
            </button>

          </form>

        </div>
      </div>
    </div>
  );
}

export default Feedback;