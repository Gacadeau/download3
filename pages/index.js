// pages/index.js

import { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoDownloadButton from './components/VideoDownloadButton';
import CachedVideos from './cached-videos';
import { useRouter } from 'next/router';

const Home = () => {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    // Vérifier si le service worker est enregistré
    navigator.serviceWorker.getRegistration().then((registration) => {
      if (!registration) {
        // Enregistrer le service worker s'il n'est pas déjà enregistré
        navigator.serviceWorker.register('/service-worker.js').then(() => {
          console.log('Service Worker enregistré avec succès.');
        });
      }
    });

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const videoUrl = '/dance.mp4';

  const handleDownloadClick = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const response = await fetch(videoUrl);
      const blob = await response.blob();

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

  useEffect(() => {
    if (!isOnline) {
      console.log('Redirection vers la page de vidéos mises en cache');
      router.push('/cached-videos');
    }
  }, [isOnline]);

  return (
    <div className="container mx-auto mt-8 text-center">
      {isOnline ? (
        <div>
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur la page d'accueil</h1>
          <VideoPlayer videoUrl={videoUrl} />
          <VideoDownloadButton videoUrl={videoUrl} onClick={handleDownloadClick} />
        </div>
      ) : (
        <CachedVideos />
      )}
    </div>
  );
};

export default Home;
