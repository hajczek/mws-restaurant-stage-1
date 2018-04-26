let cacheRestaurant = 'cacheRestaurant-1'; 

let cacheFiles = [
	'./',
	'./index.html',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
	'./css/styles.css',
    './img/small/',
    './img/medium/'
]

self.addEventListener('install', function(e) {
    e.waitUntil(caches.open(cacheRestaurant).then(function(cache) {
        return cache.addAll(cacheFiles);
    }));
});

self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(function (cacheNames) {
        return Promise.all(cacheNames.filter(function (cacheName) {
            return cacheName.startsWith('cacheRestaurant') && cacheName !== cacheRestaurant;
        }).map(function (cacheName) {
            return caches.delete(cacheName);
        }));
    }));
});

self.addEventListener('fetch', function (e) {
  e.respondWith(caches.match(e.request).then(function (response) {
    console.log('Service Worker is fetch');
    return response || fetch(e.request);
  }));
});