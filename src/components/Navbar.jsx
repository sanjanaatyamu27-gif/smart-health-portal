import { Link, useNavigate } from "react-router-dom";

function Navbar() {
  const navigate = useNavigate();

  const isLoggedIn =
    localStorage.getItem("isLoggedIn") === "true";

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("user");

    alert("Logged out successfully!");

    navigate("/login");
  };

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        {/* LOGO */}
        <Link
          to="/"
          className="flex items-center gap-2 no-underline"
        >
          <span className="text-3xl">🏥</span>

          <h1 className="text-xl md:text-2xl font-bold text-blue-700">
            Smart Health Portal
          </h1>
        </Link>

        {/* NAVIGATION */}
        <ul className="flex items-center gap-5 text-gray-700 font-medium list-none m-0 p-0">

          <li>
            <Link
              to="/"
              className="hover:text-blue-600 no-underline"
            >
              Home
            </Link>
          </li>

          <li>
            <Link
              to="/healthtips"
              className="hover:text-blue-600 no-underline"
            >
              Health Tips
            </Link>
          </li>

          <li>
            <Link
              to="/diseases"
              className="hover:text-blue-600 no-underline"
            >
              Diseases
            </Link>
          </li>

          <li>
            <Link
              to="/hospitals"
              className="hover:text-blue-600 no-underline"
            >
              Hospitals
            </Link>
          </li>

          <li>
            <Link
              to="/posters"
              className="hover:text-blue-600 no-underline"
            >
              Posters
            </Link>
          </li>

          <li>
            <Link
              to="/feedback"
              className="hover:text-blue-600 no-underline"
            >
              Feedback
            </Link>
          </li>

          {/* PROFILE / LOGIN / LOGOUT */}
          {isLoggedIn ? (
            <>
              <li><Link to="/profile" className="hover:text-blue-600 no-underline">Profile</Link></li>
              <li><button onClick={handleLogout} className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600">Logout</button></li>
            </>
          ) : (
            <li>
              <Link
                to="/login"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 no-underline"
              >
                Login
              </Link>
            </li>
          )}

        </ul>

      </div>
    </nav>
  );
}

export default Navbar;