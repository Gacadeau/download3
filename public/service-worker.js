// public/service-worker.js

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'CACHE_VIDEO') {
      const { url, blob } = event.data;
  
      caches.open('downloaded-videos-cache').then((cache) => {
        cache.put(url, new Response(blob));
      });
    }
  });
  
  self.addEventListener('fetch', (event) => {
    // Mettre en cache les vidéos provenant de votre API ou serveur
    if (event.request.url.endsWith('.mp4')) {
      event.respondWith(
        caches.match(event.request).then((response) => {
          return response || fetch(event.request);
        })
      );
    }
  });
  