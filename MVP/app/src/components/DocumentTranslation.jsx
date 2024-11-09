import React, { useState } from "react";
import axios from "../axios";

const DocumentTranslation = () => {
  const [file, setFile] = useState(null);
  const [language, setLanguage] = useState("fr");  // Langue par défaut: français
  const [translation, setTranslation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleLanguageChange = (e) => {
    setLanguage(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      alert("Veuillez télécharger un fichier !");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("language", language);

    setLoading(true);

    try {
      const response = await axios.post("/translate-document", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setTranslation(response.data);
    } catch (error) {
      console.error("Erreur lors de la traduction : ", error);
      alert("Erreur lors de la traduction.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Traduction de document</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Choisir un fichier :</label>
          <input type="file" onChange={handleFileChange} />
        </div>
        <div>
          <label>Langue cible :</label>
          <input
            type="text"
            value={language}
            onChange={handleLanguageChange}
            placeholder="ex: fr"
            maxLength={2}  // Optionnel : pour forcer une entrée à 2 caractères
            className="text-black"
          />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? "Chargement..." : "Traduire"}
        </button>
      </form>

      {translation && (
        <div>
          <h3>Traduction :</h3>
          <p>{translation.translation}</p>
        </div>
      )}
    </div>
  );
};

export default DocumentTranslation;
