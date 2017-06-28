// self hace referencia al servicio propio, es decir el mismo archivo.
self.addEventListener("push", function(event){
    const title = "Pharol";

    const msg = event.data.text() || "Mensaje predefinido Pharol";

    const options = {
        body: msg,
        icon: "/images/pharol.jpg"
    };

    event.waitUntil(self.registration.showNotification(title, options));

    self.clients.matchAll({type: "window"}).then(function(clients){
        clients.forEach(function(client){
            client.postMessage({type: "sound", payload: { sound: "/sounds/tasty.mp3", ts: new Date() * 1 }});
        });
    });
});

self.addEventListener("activate", function(event){
    event.waitUntil(self.clients.claim());
});

// ahora manejaremos los click en una notification

self.addEventListener("notificationclick", function(event){
    // cerramos al notificacions al hacer lick
    event.notification.close();
    // abrimos una URL, podemos pasar parametros por get
    event.waitUntil(clients.openWindow("http://pharol.cl/?id=1234"));
});