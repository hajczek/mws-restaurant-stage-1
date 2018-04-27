// Cache name
let cacheRestaurant = 'cacheRestaurant-2'; 

// Files list to cache
let cacheFiles = [
	'./',
	'./index.html',
    './js/dbhelper.js',
    './js/main.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
	'./css/styles.css',
    './img/small',
    './img/medium'
]

// Installation Service worker
self.addEventListener('install', function(e) {
    e.waitUntil(caches.open(cacheRestaurant).then(cache => cache.addAll(cacheFiles)));
});

// Activation Service worker
self.addEventListener('activate', function (e) {
    e.waitUntil(caches.keys().then(cacheNames => Promise.all(cacheNames.filter(cacheName => cacheName.startsWith('cacheRestaurant') && cacheName !== cacheRestaurant).map(cacheName => caches.delete(cacheName)))))
});


// Fetch Service worker
self.addEventListener('fetch', function (e) {
    e.respondWith(caches.match(e.request).then(response => response || fetch(e.request)));
});
