// ============================================================
// SMART HEALTH PORTAL - SERVICE WORKER
// Browser Push Notification Handler
// ============================================================

// ------------------------------------------------------------
// RECEIVE PUSH NOTIFICATION
// ------------------------------------------------------------
self.addEventListener("push", function (event) {
  let data = {
    title: "💊 Smart Health Portal",
    body: "You have a health reminder."
  };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (error) {
    console.error("Push data error:", error);

    // Fallback if push data is not valid JSON
    try {
      if (event.data) {
        data = {
          title: "💊 Smart Health Portal",
          body: event.data.text()
        };
      }
    } catch (fallbackError) {
      console.error(
        "Push fallback error:",
        fallbackError
      );
    }
  }

  const title =
    data.title || "💊 Smart Health Portal";

  const options = {
    body:
      data.body ||
      "You have a health reminder.",
    icon: "/favicon.ico",
    badge: "/favicon.ico",
    tag: "smart-health-pill-reminder",
    renotify: true
  };

  event.waitUntil(
    self.registration.showNotification(
      title,
      options
    )
  );
});


// ------------------------------------------------------------
// HANDLE NOTIFICATION CLICK
// ------------------------------------------------------------
self.addEventListener(
  "notificationclick",
  function (event) {
    event.notification.close();

    event.waitUntil(
      clients
        .matchAll({
          type: "window",
          includeUncontrolled: true
        })
        .then(function (clientList) {

          // Try to focus the already-open website
          for (const client of clientList) {
            if (
              client.url.includes(
                "smart-health-portal.vercel.app"
              ) &&
              "focus" in client
            ) {
              return client.focus();
            }
          }

          // Otherwise open the deployed website
          if (clients.openWindow) {
            return clients.openWindow(
              "https://smart-health-portal.vercel.app/"
            );
          }

          return null;
        })
    );
  }
);


// ------------------------------------------------------------
// SERVICE WORKER INSTALL
// ------------------------------------------------------------
self.addEventListener(
  "install",
  function () {
    console.log(
      "Smart Health Portal service worker installed."
    );

    self.skipWaiting();
  }
);


// ------------------------------------------------------------
// SERVICE WORKER ACTIVATION
// ------------------------------------------------------------
self.addEventListener(
  "activate",
  function (event) {
    console.log(
      "Smart Health Portal service worker activated."
    );

    event.waitUntil(
      self.clients.claim()
    );
  }
);