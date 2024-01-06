
const withOffline = require('next-offline');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Autres configurations Next.js ici...

  // Configuration du service worker avec Workbox
  workbox: {
    // Gestion de la génération du service worker
    generateInDevMode: true,
    // Exclure les pages API du caching
    exclude: [/\/api\//],
    // Chemin vers votre fichier service worker personnalisé
    swSrc: './public/service-worker.js', // Assurez-vous que le chemin est correct
  },
};

module.exports = withOffline(nextConfig);
