import { useState } from 'react';
import axios from '../axios';

const JsonTranslator = () => {
  const [language, setLanguage] = useState('fr'); // Langue sélectionnée
  const [translatedJson, setTranslatedJson] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleTranslate = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post('/translate-json', {
        language: language, // Langue cible
      });

      // Mise à jour du state avec le JSON traduit
      setTranslatedJson(response.data.translated_json);
    } catch (err) {
      setError('Erreur lors de la traduction du JSON.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Traduction de JSON</h1>
      
      <div>
        <label>Choisir la langue :</label>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="fr">Français</option>
          <option value="de">Allemand</option>
          <option value="en">Anglais</option>
        </select>
      </div>

      <button onClick={handleTranslate} disabled={loading}>
        {loading ? 'Chargement...' : 'Traduire'}
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {translatedJson && (
        <div>
          <h2>JSON traduit :</h2>
          <pre>{JSON.stringify(translatedJson, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default JsonTranslator;
