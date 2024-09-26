import { useState, useEffect } from 'react';
import axios from '../axios';

const URLInput = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);

  // Envoie des données au backend via Axios
  const sendUrlToBackend = async (url) => {
    setLoading(true); // Démarrer l'animation
    try {
      const response = await axios.post('/create-movie', { url });
      console.log('Données envoyées avec succès:', response.data);
    } catch (error) {
      console.error('Erreur lors de l\'envoi:', error);
    } finally {
      setLoading(false); // Arrêter l'animation après l'envoi
    }
  };

  // Utilisation de useEffect pour déclencher l'envoi quand l'URL change
  useEffect(() => {
    if (url) {
      // Ajouter un léger délai pour simuler une validation ou s'assurer que l'utilisateur a terminé l'entrée
      const timer = setTimeout(() => {
        sendUrlToBackend(url);
        setUrl(''); // Réinitialiser le champ après l'envoi
      }, 1000); // 1 seconde de délai avant l'envoi

      return () => clearTimeout(timer); // Nettoie le timer si l'URL change rapidement
    }
  }, [url]); // L'envoi est déclenché à chaque fois que l'URL change

  return (
    <div className="w-full max-w-md mx-auto relative">
      <label className="text-lg font-medium mb-2 block">Collez une URL :</label>
      <input
        type="text"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        placeholder="http://example.com"
        className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
      />

      {/* Afficher l'animation à droite de l'input quand c'est en cours */}
      {loading && (
        <div className="absolute right-3 top-10">
          <svg
            className="animate-spin h-5 w-5 text-indigo-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      )}
    </div>
  );
};

export default URLInput;
