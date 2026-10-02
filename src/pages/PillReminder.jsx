import { useEffect, useState } from "react";

const API =
  "https://smart-health-portal-backend-production.up.railway.app";

// ------------------------------------------------------------
// GET LOGGED-IN USER
// ------------------------------------------------------------
const getUser = () => {
  try {
    return JSON.parse(localStorage.getItem("user"));
  } catch {
    return null;
  }
};

// ------------------------------------------------------------
// CONVERT VAPID PUBLIC KEY
// ------------------------------------------------------------
function keyToBytes(base64) {
  const padding = "=".repeat(
    (4 - (base64.length % 4)) % 4
  );

  const base64String = (base64 + padding)
    .replace(/-/g, "+")
    .replace(/_/g, "/");

  const rawData = window.atob(base64String);

  return Uint8Array.from(
    [...rawData].map((char) => char.charCodeAt(0))
  );
}

// ------------------------------------------------------------
// PILL REMINDER COMPONENT
// ------------------------------------------------------------
export default function PillReminder() {
  const [medicine, setMedicine] = useState("");
  const [time, setTime] = useState("");
  const [dosage, setDosage] = useState("");

  const [reminders, setReminders] = useState([]);

  const [notice, setNotice] = useState("");

  const [notificationEnabled, setNotificationEnabled] =
    useState(false);

  const [loading, setLoading] = useState(false);

  // ----------------------------------------------------------
  // LOAD REMINDERS FROM MYSQL
  // ----------------------------------------------------------
  const load = async () => {
    try {
      const user = getUser();

      if (!user || !user.id) {
        return;
      }

      const response = await fetch(
        `${API}/api/pill-reminders/${user.id}`
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Could not load reminders."
        );
      }

      if (data.success) {
        setReminders(data.reminders || []);
      } else {
        setReminders([]);
      }
    } catch (error) {
      console.error("Load reminders error:", error);
    }
  };

  // ----------------------------------------------------------
  // LOAD REMINDERS WHEN PAGE OPENS
  // ----------------------------------------------------------
  useEffect(() => {
    load();
  }, []);

  // ----------------------------------------------------------
  // CHECK CURRENT NOTIFICATION PERMISSION
  // ----------------------------------------------------------
  useEffect(() => {
    if (
      "Notification" in window &&
      Notification.permission === "granted"
    ) {
      setNotificationEnabled(true);
    }
  }, []);

  // ----------------------------------------------------------
  // ENABLE REAL BROWSER PUSH NOTIFICATIONS
  // ----------------------------------------------------------
  const enableNotifications = async () => {
    try {
      const user = getUser();

      // Login check
      if (!user || !user.id) {
        alert("Please login first.");
        return;
      }

      // Browser notification support
      if (!("Notification" in window)) {
        alert(
          "Your browser does not support notifications."
        );
        return;
      }

      // Service worker support
      if (!("serviceWorker" in navigator)) {
        alert(
          "Your browser does not support service workers."
        );
        return;
      }

      // Push API support
      if (!("PushManager" in window)) {
        alert(
          "Your browser does not support push notifications."
        );
        return;
      }

      // Ask permission
      const permission =
        await Notification.requestPermission();

      if (permission !== "granted") {
        alert(
          "Notification permission was not granted."
        );
        return;
      }

      // ------------------------------------------------------
      // REGISTER SERVICE WORKER
      // ------------------------------------------------------
      const registration =
        await navigator.serviceWorker.register(
          "/service-worker.js"
        );

      console.log(
        "Service worker registered:",
        registration
      );

      // Wait until service worker is ready
      await navigator.serviceWorker.ready;

      // ------------------------------------------------------
      // GET VAPID PUBLIC KEY FROM RAILWAY BACKEND
      // ------------------------------------------------------
      const keyResponse = await fetch(
        `${API}/api/push/public-key`
      );

      if (!keyResponse.ok) {
        throw new Error(
          "Could not get VAPID public key from backend."
        );
      }

      const keyData = await keyResponse.json();

      if (!keyData.publicKey) {
        throw new Error(
          "VAPID public key is missing from backend."
        );
      }

      console.log("VAPID public key received.");

      // ------------------------------------------------------
      // GET EXISTING PUSH SUBSCRIPTION
      // ------------------------------------------------------
      let subscription =
        await registration.pushManager.getSubscription();

      // ------------------------------------------------------
      // CREATE NEW PUSH SUBSCRIPTION IF NEEDED
      // ------------------------------------------------------
      if (!subscription) {
        subscription =
          await registration.pushManager.subscribe({
            userVisibleOnly: true,

            applicationServerKey:
              keyToBytes(keyData.publicKey),
          });
      }

      console.log(
        "Push subscription created:",
        subscription
      );

      // ------------------------------------------------------
      // SEND SUBSCRIPTION TO RAILWAY BACKEND
      // ------------------------------------------------------
      const saveResponse = await fetch(
        `${API}/api/push/subscribe`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: user.id,
            subscription: subscription.toJSON(),
          }),
        }
      );

      const saveData = await saveResponse.json();

      if (!saveResponse.ok) {
        throw new Error(
          saveData.message ||
            "Could not save push subscription."
        );
      }

      // ------------------------------------------------------
      // SUCCESS
      // ------------------------------------------------------
      setNotificationEnabled(true);

      setNotice(
        "🔔 Browser notifications are enabled."
      );

      alert(
        "✅ Real browser notifications enabled successfully!"
      );
    } catch (error) {
      console.error(
        "Notification setup error:",
        error
      );

      alert(
        "Could not enable notifications.\n\n" +
          error.message
      );
    }
  };

  // ----------------------------------------------------------
  // ADD NEW PILL REMINDER
  // ----------------------------------------------------------
  const add = async (event) => {
    event.preventDefault();

    const user = getUser();

    if (!user || !user.id) {
      alert("Please login first.");
      return;
    }

    if (!medicine || !time) {
      alert(
        "Please enter medicine name and reminder time."
      );
      return;
    }

    // Make sure browser permission is granted
    if (
      !("Notification" in window) ||
      Notification.permission !== "granted"
    ) {
      await enableNotifications();

      // Stop if permission was not granted
      if (
        !("Notification" in window) ||
        Notification.permission !== "granted"
      ) {
        return;
      }
    }

    try {
      setLoading(true);

      // ------------------------------------------------------
      // SAVE REMINDER IN MYSQL THROUGH RAILWAY BACKEND
      // ------------------------------------------------------
      const response = await fetch(
        `${API}/api/pill-reminders`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({
            user_id: user.id,
            medicine_name: medicine,
            dosage: dosage || null,
            reminder_time: time,
            start_date: null,
            end_date: null,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not save the reminder."
        );
      }

      if (!data.success) {
        throw new Error(
          data.message ||
            "Could not save the reminder."
        );
      }

      // Clear form
      setMedicine("");
      setTime("");
      setDosage("");

      setNotice(
        `✅ Reminder saved for ${medicine} at ${time}.`
      );

      // Reload reminders from MySQL
      await load();
    } catch (error) {
      console.error(
        "Add reminder error:",
        error
      );

      alert(
        "Could not save the reminder.\n\n" +
          error.message
      );
    } finally {
      setLoading(false);
    }
  };

  // ----------------------------------------------------------
  // DELETE REMINDER
  // ----------------------------------------------------------
  const del = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/pill-reminders/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Could not delete reminder."
        );
      }

      setNotice(
        "✅ Reminder deleted successfully."
      );

      await load();
    } catch (error) {
      console.error(
        "Delete reminder error:",
        error
      );

      alert(
        "Could not delete the reminder.\n\n" +
          error.message
      );
    }
  };

  // ----------------------------------------------------------
  // USER INTERFACE
  // ----------------------------------------------------------
  return (
    <div className="min-h-screen bg-blue-50 py-12 px-6">

      <div className="max-w-4xl mx-auto">

        {/* -------------------------------------------------- */}
        {/* HEADER                                             */}
        {/* -------------------------------------------------- */}

        <div className="text-center mb-10">

          <div className="text-6xl">
            💊
          </div>

          <h1 className="text-4xl font-bold text-blue-700 mt-3">
            Pill Reminder
          </h1>

          <p className="text-gray-600 mt-3">
            Save reminders to MySQL and receive
            browser notifications.
          </p>

        </div>


        {/* -------------------------------------------------- */}
        {/* ADD REMINDER                                       */}
        {/* -------------------------------------------------- */}

        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">

          <h2 className="text-2xl font-bold mb-5">
            Add New Reminder
          </h2>

          <form onSubmit={add}>

            <div className="grid md:grid-cols-3 gap-5">

              {/* Medicine */}

              <div>

                <label className="block font-semibold mb-2">
                  Medicine
                </label>

                <input
                  type="text"
                  value={medicine}
                  onChange={(e) =>
                    setMedicine(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="Vitamin C"
                />

              </div>


              {/* Dosage */}

              <div>

                <label className="block font-semibold mb-2">
                  Dosage
                </label>

                <input
                  type="text"
                  value={dosage}
                  onChange={(e) =>
                    setDosage(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3"
                  placeholder="1 tablet"
                />

              </div>


              {/* Time */}

              <div>

                <label className="block font-semibold mb-2">
                  Time
                </label>

                <input
                  type="time"
                  value={time}
                  onChange={(e) =>
                    setTime(e.target.value)
                  }
                  className="w-full border rounded-lg px-4 py-3"
                />

              </div>

            </div>


            {/* Save button */}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-50"
            >
              {loading
                ? "Saving..."
                : "Save Reminder"}
            </button>

          </form>

        </div>


        {/* -------------------------------------------------- */}
        {/* BROWSER NOTIFICATIONS                              */}
        {/* -------------------------------------------------- */}

        <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 flex items-center justify-between gap-4">

          <div>

            <h3 className="font-bold text-lg">
              Real Browser Notifications
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Enable once to allow scheduled push
              notifications.
            </p>

            {notice && (
              <p className="text-green-600 mt-2 font-medium">
                {notice}
              </p>
            )}

          </div>


          <button
            type="button"
            onClick={enableNotifications}
            className="bg-green-600 text-white px-5 py-3 rounded-lg font-semibold hover:bg-green-700 whitespace-nowrap"
          >
            {notificationEnabled
              ? "✅ Enabled"
              : "Enable"}
          </button>

        </div>


        {/* -------------------------------------------------- */}
        {/* REMINDER LIST                                      */}
        {/* -------------------------------------------------- */}

        <div className="bg-white rounded-2xl shadow-lg p-8">

          <h2 className="text-2xl font-bold mb-5">
            My Reminders
          </h2>


          {reminders.length === 0 ? (

            <p className="text-gray-500">
              No reminders yet.
            </p>

          ) : (

            <div>

              {reminders.map((reminder) => (

                <div
                  key={reminder.id}
                  className="border rounded-xl p-5 flex justify-between items-center mb-3 gap-4"
                >

                  <div>

                    <b className="text-lg">
                      💊 {reminder.medicine_name}
                    </b>

                    <p className="text-blue-600 mt-1">
                      ⏰{" "}
                      {String(
                        reminder.reminder_time
                      ).slice(0, 5)}

                      {reminder.dosage
                        ? ` • ${reminder.dosage}`
                        : ""}
                    </p>

                    <p className="text-sm text-green-600 mt-1">
                      Status:{" "}
                      {reminder.status || "active"}
                    </p>

                  </div>


                  <button
                    type="button"
                    onClick={() =>
                      del(reminder.id)
                    }
                    className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>

                </div>

              ))}

            </div>

          )}

        </div>


        {/* -------------------------------------------------- */}
        {/* DISCLAIMER                                        */}
        {/* -------------------------------------------------- */}

        <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-xl p-5">

          <p className="text-sm text-gray-600">

            <strong>Important:</strong>{" "}
            This reminder is a scheduling aid and
            does not provide medical advice. Take
            medicines only according to instructions
            from a qualified healthcare professional.

          </p>

        </div>

      </div>

    </div>
  );
}