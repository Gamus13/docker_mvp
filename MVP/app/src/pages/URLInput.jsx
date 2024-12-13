import { useState, useEffect } from 'react';
import axios from '../axios';
import { useToast } from '../contexts/ToastContext';

const URLInput = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false); // État pour le message de réussite
  const showToast = useToast(); // Utilisez uniquement showToast

  // Envoie des données au backend via Axios
  const sendUrlToBackend = async (url) => {
    setLoading(true); // Démarrer l'animation
    showToast('info', "Step 1 successful. Please wait until the upload is complete before proceeding to step 3.");
    setSuccess(false); // Réinitialiser le message de succès

    try {
      const response = await axios.post('/convert-url-to-pdf', { url });
      console.log('Conversion réussie:', response.data);
      setSuccess(true); // Afficher le message de succès
      showToast('success', "The company information has been successfully retrieved. You can proceed to step 3.");
    } catch (error) {
      console.error('Erreur lors de la conversion:', error);
      showToast('error', "Oops, something went wrong. Please try again.");
    } finally {
      setLoading(false); // Arrêter l'animation après l'envoi
    }
  };

  // Utilisation de useEffect pour déclencher l'envoi quand l'URL change
  useEffect(() => {
    if (url) {
      const timer = setTimeout(() => {
        sendUrlToBackend(url);
        setUrl(''); // Réinitialiser le champ après l'envoi
      }, 1000); // 1 seconde de délai avant l'envoi

      return () => clearTimeout(timer); // Nettoie le timer si l'URL change rapidement
    }
  }, [url]);

  return (
    <div className="w-full max-w-md mx-auto relative">
      <label className="text-sm font-medium mb-2 block">2- paste the link to the recipient's website :</label>
      <div className="relative flex flex-col items-start">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="http://example.com"
          className="p-2 border border-gray-300 rounded-md text-black focus:outline-none focus:ring-2 focus:ring-indigo-500 w-full"
        />

        {/* Afficher l'animation ou le message de réussite */}
        {loading ? (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg
              className="animate-spin h-4 w-4 text-indigo-600"
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
        ) : success ? (
          <div className="mt-2 text-center text-green-600">
            Conversion successful !
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default URLInput;
