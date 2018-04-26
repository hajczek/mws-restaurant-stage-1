// Name for cache
let cacheRestaurant = 'cacheRestaurant'; 

// Files to cache
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

// Install Service Worker
self.addEventListener('install', function(e) {
    console.log('Service Worker installed');

    e.waitUntil(
    	// Open the cache
	    caches.open(cacheRestaurant).then(function(cache) {

	    	// Add files to the cache
			console.log('Service Worker caching files');
			return cache.addAll(cacheFiles);
	    })
	);
});

// Activate Service Worker
self.addEventListener('activate', function(e) {
    console.log('Service Worker activated');

    e.waitUntil(
		caches.keys().then(function(cacheRestaurant) {
			return Promise.all(cacheRestaurant.map(function(thisCacheName) {

				// If a cached item is saved under a previous cacheName
				if (thisCacheName !== cacheRestaurant) {

					// Delete that cached file
					console.log('Service Worker removing cached files from cache - ', thisCacheName);
					return caches.delete(thisCacheName);
				}
			}));
		})
	);

});

self.addEventListener('fetch', function(e) {
	console.log('Service Worker is fetch', e.request.url);

	e.respondWith(
        
		caches.match(e.request)
        
        .then(function(response) {

            if ( response ) {
				console.log("Service Worker found in cache", e.request.url, response);
				return response;
            }
        }) 
	);
});