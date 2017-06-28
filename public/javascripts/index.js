(function(){
    function urlB64ToUint8Array(base64String) {
        const padding = '='.repeat((4 - base64String.length % 4) % 4);
        const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');

        const rawData = window.atob(base64);
        const outputArray = new Uint8Array(rawData.length);

        for (let i = 0; i < rawData.length; ++i) {
            outputArray[i] = rawData.charCodeAt(i);
        }
        return outputArray;
    }

    // verificamos que service worker este disponible en el navegador y ademas la api de PushManager
    window.addEventListener("DOMContentLoaded", function(){
        navigator.serviceWorker.addEventListener('message', function handler (event) {
            console.log("on message", event);
            if (event.data.type === "sound") {
                const soundSrc = event.data.payload.sound;
                const audio = new Audio(soundSrc);
                audio.play();
            }
        });
        
        const applicationServerPublicKey = "AIzaSyBD0Ah7Qzn3yAVGu05NNOTs7Iu42AK2VIw";//"BOlN5XSX1UZ5MwHHb6MLS-fWx56glckmiZC7jYP61rEVADUK5gECXqLUJ6pu2Q3jmnQ_YUnBU93oXJ3Nxmi1IIU";
        var registerSW = null;
        var isSubscribed = null;
        var pushButton = document.getElementById("notification");

        if ("serviceWorker" in navigator && "PushManager" in window) {
            // agregamos escucha para cuando cargue la pagina web
            window.addEventListener("load", function(){
                navigator.serviceWorker.register("/javascripts/service.js").then(function(registration){
                    registerSW = registration;
                    initUI();
                }).catch(function(err){
                    console.log("Error:",err);
                });
            })
        }

        function updateSubscriptionOnServer(subscription) {
            if (subscription) {
                const subscriptionDetails = document.getElementById("subscriptionDetails");
                subscriptionDetails.innerHTML = JSON.stringify(subscription, 2, 2);

                isSubscribed = true;
            } else {
                console.log("Usuario no esta subscrito");
            }
        }

        function subscribeUser() {
            const applicationServerKey = urlB64ToUint8Array(applicationServerPublicKey);
            //const applicationServerKey = applicationServerPublicKey;

            registerSW.pushManager.subscribe({
                userVisibleOnly: true
            }).then(function(subscription){
                updateSubscriptionOnServer(subscription);
            }).catch(function(err){
                console.log("Error", err);
            });
        }

        function initUI() {
            pushButton.addEventListener("click", function(){
                pushButton.disabled = true;
                if (isSubscribed) {
                    console.log("USUARIO SUBSCRIPTO");
                } else {
                    subscribeUser();
                }
            });

            registerSW.pushManager.getSubscription().then(function(subscription){
                console.log("subscription", subscription);
                isSubscribed = !(subscription === null);

                updateSubscriptionOnServer(subscription);

                if (isSubscribed) {
                    console.log("Usuario suscrito");
                } else {
                    subscribeUser();
                }
            });
        }
    });
})()