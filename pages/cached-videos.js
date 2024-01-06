// pages/cached-videos.js

import { useEffect, useState } from 'react';

const CachedVideos = () => {
  const [cachedVideos, setCachedVideos] = useState([]);

  useEffect(() => {
    // Charger la liste des vidéos depuis le cache
    caches.open('downloaded-videos-cache').then((cache) => {
      cache.keys().then((requests) => {
        const videoUrls = requests.map((request) => request.url);
        setCachedVideos(videoUrls);
        console.log('videos:',cachedVideos)
      });
    });
  }, []);
console.log('videos1:',cachedVideos)
  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Vidéos mises en cache</h1>
      {cachedVideos.length > 0 ? (
        <div>
          <p>Vous pouvez lire les vidéos mises en cache :</p>
          <ul>
            {cachedVideos.map((url, index) => (
              <li key={index}>
                <a href={url} target="_blank" rel="noopener noreferrer">
                  Vidéo {index + 1}
                </a>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <p>Aucune vidéo mise en cache disponible.</p>
      )}
    </div>
  );
};

export default CachedVideos;
