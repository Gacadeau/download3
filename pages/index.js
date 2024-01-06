// pages/index.js

import { useEffect, useState } from 'react';
import VideoPlayer from './components/VideoPlayer';
import VideoDownloadButton from './components/VideoDownloadButton';
import { useRouter } from 'next/router';

const Home = () => {
  const [isOnline, setIsOnline] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Vérifier la connectivité réseau
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    return () => {
      window.removeEventListener('online', handleOnlineStatusChange);
      window.removeEventListener('offline', handleOnlineStatusChange);
    };
  }, []);

  const videoUrl = '/dance.mp4'; // Chemin vers votre vidéo dans le dossier "public"

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

  useEffect(() => {
    if (!isOnline) {
      // Rediriger vers la page des vidéos en cache si l'utilisateur est hors ligne
      router.push('/cached-videos');
    }
  }, [isOnline]);

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur la page d'accueil</h1>
      <VideoPlayer videoUrl={videoUrl} />
      <VideoDownloadButton videoUrl={videoUrl} onClick={handleDownloadClick} />
    </div>
  );
};

export default Home;
