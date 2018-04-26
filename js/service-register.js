if ('serviceWorker' in navigator) {

  navigator.serviceWorker
    .register('./sw.js', { scope: './' })
    .then(function (registration) {
      console.log("Service Worker registered");
    })
    .catch(function (errorr) {
      console.log("Service Worker is not registered", errorr);
    })

}