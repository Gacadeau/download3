// pages/index.js

import VideoPlayer from './components/VideoPlayer';
import VideoDownloadButton from './components/VideoDownloadButton';

const Home = () => {
  const videoUrl = '/dance.mp4'; // Chemin vers votre vidéo dans le dossier "public"

  return (
    <div className="container mx-auto mt-8 text-center">
      <h1 className="text-3xl font-bold mb-4">Bienvenue sur la page d'accueil</h1>
      <VideoPlayer videoUrl={videoUrl} />
      <VideoDownloadButton videoUrl={videoUrl} />
    </div>
  );
};

export default Home;
