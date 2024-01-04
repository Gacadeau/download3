// components/VideoDownloadButton.js

import React from 'react';

const VideoDownloadButton = ({ videoUrl }) => {
  const handleDownloadClick = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const response = await fetch(videoUrl);
      const blob = await response.blob();

      // Envoyer un message au service worker pour stocker la vidéo en cache
      registration.active.postMessage({
        type: 'CACHE_VIDEO',
        url: videoUrl,
        blob,
      });

      console.log('Video ajoutée au cache avec succès.');
    } catch (error) {
      console.error('Erreur lors du téléchargement de la vidéo:', error);
    }
  };

  return (
    <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleDownloadClick}>
      Télécharger la vidéo
    </button>
  );
};

export default VideoDownloadButton;
