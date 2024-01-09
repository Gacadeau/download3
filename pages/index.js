// pages/index.js
//https://download2-7r9q.vercel.app/

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
    // Fonction pour mettre à jour l'état en fonction de la connectivité
    const handleOnlineStatusChange = () => {
      setIsOnline(navigator.onLine);
    };

    // Ajouter des écouteurs d'événements pour la connectivité en ligne/hors ligne
    window.addEventListener('online', handleOnlineStatusChange);
    window.addEventListener('offline', handleOnlineStatusChange);

    // Vérifier la connectivité réseau lors du rendu côté serveur
    setIsOnline(navigator.onLine);

    // Supprimer les écouteurs d'événements lors du démontage du composant
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
    // Rediriger vers la page des vidéos en cache si l'utilisateur est hors ligne
    if (!isOnline && router.pathname === '/') {
      router.push('/cached-videos');
    }
  }, [isOnline, router]);

  return (
    <div className="container mx-auto mt-8 text-center">
      {isOnline ? (
        // Afficher la page normale si la connexion est disponible
        <div>
          <h1 className="text-3xl font-bold mb-4">Bienvenue sur la page d'accueil</h1>
          <VideoPlayer videoUrl={videoUrl} />
          <VideoDownloadButton videoUrl={videoUrl} onClick={handleDownloadClick} />
        </div>
      ) : (
        // Rediriger vers la page des vidéos en cache si l'utilisateur est hors ligne
        <CachedVideos />
      )}
    </div>
  );
};

export default Home;
