import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {

  const navigate = useNavigate();

  const [isRegister, setIsRegister] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {

    e.preventDefault();

    if (!email || !password) {

      setMessage("Please enter email and password.");

      return;
    }

    setLoading(true);
    setMessage("");

    try {

      const response = await fetch(
        "https://smart-health-portal-backend-production.up.railway.app/api/login",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        localStorage.setItem(
          "isLoggedIn",
          "true"
        );

        localStorage.setItem(
          "user",
          JSON.stringify(data.user)
        );

        setMessage("Login successful!");

        setTimeout(() => {
          navigate("/");
        }, 500);

      } else {

        setMessage(data.message);

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Cannot connect to backend. Make sure the server is running."
      );

    } finally {

      setLoading(false);

    }

  };

  // ==========================================
  // REGISTER
  // ==========================================

  const handleRegister = async (e) => {

    e.preventDefault();

    if (!name || !email || !password) {

      setMessage("Please fill all fields.");

      return;
    }

    if (password.length < 6) {

      setMessage(
        "Password must contain at least 6 characters."
      );

      return;
    }

    setLoading(true);
    setMessage("");

    try {

      const response = await fetch(
        "https://smart-health-portal-backend-production.up.railway.app/api/register",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify({
            name,
            email,
            password
          })
        }
      );

      const data = await response.json();

      if (data.success) {

        setMessage(
          "Registration successful! Please login."
        );

        setName("");
        setEmail("");
        setPassword("");

        setIsRegister(false);

      } else {

        setMessage(data.message);

      }

    } catch (error) {

      console.error(error);

      setMessage(
        "Cannot connect to backend. Make sure the server is running."
      );

    } finally {

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen bg-blue-50 flex items-center justify-center px-6 py-12">

      <div className="bg-white w-full max-w-md rounded-2xl shadow-xl p-8">

        {/* Header */}

        <div className="text-center mb-6">

          <div className="text-5xl mb-3">
            🏥
          </div>

          <h1 className="text-3xl font-bold text-blue-700">
            Smart Health Portal
          </h1>

          <p className="text-gray-600 mt-2">

            {isRegister
              ? "Create your account"
              : "Login to access healthcare tools"}

          </p>

        </div>


        {/* Message */}

        {message && (

          <div className="mb-5 p-3 rounded-lg bg-blue-50 text-blue-700 text-center">

            {message}

          </div>

        )}


        {/* LOGIN */}

        {!isRegister ? (

          <form onSubmit={handleLogin}>

            {/* Email */}

            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>


            {/* Password */}

            <div className="mb-6">

              <label className="block font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Enter your password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >

              {loading
                ? "Logging in..."
                : "Login"}

            </button>

          </form>

        ) : (

          /* REGISTER */

          <form onSubmit={handleRegister}>

            {/* Name */}

            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Full Name
              </label>

              <input
                type="text"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                placeholder="Enter your full name"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>


            {/* Email */}

            <div className="mb-5">

              <label className="block font-semibold text-gray-700 mb-2">
                Email
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>


            {/* Password */}

            <div className="mb-6">

              <label className="block font-semibold text-gray-700 mb-2">
                Password
              </label>

              <input
                type="password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                placeholder="Create a password"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />

            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition disabled:bg-gray-400"
            >

              {loading
                ? "Creating account..."
                : "Create Account"}

            </button>

          </form>

        )}


        {/* SWITCH */}

        <div className="text-center mt-6">

          {!isRegister ? (

            <p className="text-gray-600">

              Don't have an account?{" "}

              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setIsRegister(true);
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Register
              </button>

            </p>

          ) : (

            <p className="text-gray-600">

              Already have an account?{" "}

              <button
                type="button"
                onClick={() => {
                  setMessage("");
                  setIsRegister(false);
                }}
                className="text-blue-600 font-semibold hover:underline"
              >
                Login
              </button>

            </p>

          )}

        </div>

      </div>

    </div>

  );
}

export default Login;