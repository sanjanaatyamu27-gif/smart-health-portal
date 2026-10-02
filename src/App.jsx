import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { io } from "socket.io-client";
import API from "./config";
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
import DoctorRecommendation from "./pages/DoctorRecommendation";
import Profile from "./pages/Profile";
import DailyHealthReport from "./pages/DailyHealthReport";

function App() {
  useEffect(() => {
  const socket = io(API);

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
          path="/daily-health-report"
          element={
            <ProtectedRoute>
              <DailyHealthReport />
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