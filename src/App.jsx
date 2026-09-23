import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoutes";

import Home from "./pages/Home";
import HealthTips from "./pages/HealthTips";
import Diseases from "./pages/Diseases";
import Hospitals from "./pages/Hospitals";
import Posters from "./pages/Posters";
import Chatbot from "./pages/Chatbot";
import Feedback from "./pages/Feedback";
import Login from "./pages/Login";

import BMI from "./pages/BMI";
import PillReminder from "./pages/PillReminder";
import OPQueue from "./pages/OPQueue";
import DoctorRecommendation from "./pages/DoctorRecommendation";
import Profile from "./pages/Profile";

function App() {
  useEffect(() => {
  const socket = io("http://localhost:5000");

  socket.on("connect", () => {
    console.log("Connected to real-time server:", socket.id);
  });

  return () => {
    socket.disconnect();
  };
}, []);
  return (
    <BrowserRouter>

      <Navbar />

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route path="/" element={<Home />} />

        <Route
          path="/healthtips"
          element={<HealthTips />}
        />

        <Route
          path="/diseases"
          element={<Diseases />}
        />

        <Route
          path="/hospitals"
          element={<Hospitals />}
        />

        <Route
          path="/posters"
          element={<Posters />}
        />

        <Route
          path="/feedback"
          element={<Feedback />}
        />

        <Route
          path="/login"
          element={<Login />}
        />


        {/* ================= PROTECTED PAGES ================= */}

        <Route
          path="/bmi"
          element={
            <ProtectedRoute>
              <BMI />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pill-reminder"
          element={
            <ProtectedRoute>
              <PillReminder />
            </ProtectedRoute>
          }
        />

        <Route
          path="/op-queue"
          element={
            <ProtectedRoute>
              <OPQueue />
            </ProtectedRoute>
          }
        />

        <Route
          path="/doctor-recommendation"
          element={
            <ProtectedRoute>
              <DoctorRecommendation />
            </ProtectedRoute>
          }
        />


        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/chatbot"
          element={
            <ProtectedRoute>
              <Chatbot />
            </ProtectedRoute>
          }
        />

      </Routes>

      <Footer />

    </BrowserRouter>
  );
}

export default App;