self.addEventListener("push", function (event) {
  let data = {
    title: "Smart Health Portal",
    body: "You have a health reminder.",
  };

  try {
    if (event.data) {
      data = event.data.json();
    }
  } catch (error) {
    console.error("Push data error:", error);
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
    })
  );
});


self.addEventListener("notificationclick", function (event) {
  event.notification.close();

  event.waitUntil(
    clients.matchAll({
      type: "window",
      includeUncontrolled: true,
    }).then(function (clientList) {

      for (const client of clientList) {
        if ("focus" in client) {
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(
          self.location.origin + "/"
        );
      }
    })
  );
});