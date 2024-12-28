import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../index.css';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [email, setEmail] = useState('');
  const [latestFile, setLatestFile] = useState(null); // Dernier fichier récupéré
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Charger les données utilisateur et le dernier fichier via les requêtes API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user');
        setName(response.data.name);
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      }
    };

    const fetchLatestFile = async () => {
      try {
        const response = await axios.get('/latest-uploaded-file');
        setLatestFile(response.data); // Charger le dernier fichier
      } catch (error) {
        console.error('Erreur lors de la récupération du dernier fichier:', error);
      }
    };

    fetchUserData();
    fetchLatestFile();
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('message', body);
    formData.append('email', email);

    // Vérifier si le dernier fichier est récupéré et utiliser son chemin
    if (latestFile) {
      formData.append('file_path', latestFile.path); // Utiliser le chemin du dernier fichier récupéré
    }

    try {
      const response = await axios.post('/send-emailcreate', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data);
      setName('');
      setTitle('');
      setBody('');
      setEmail('');
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Nom :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Corps :</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>
      <div className="mb-4">
        {latestFile ? (
          <p>Dernier fichier: {latestFile.filename}</p>
        ) : (
          <p>Aucun fichier trouvé.</p>
        )}
      </div>
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 relative"
      >
        Envoyer
      </button>
    </form>
  );
};

export default ContactForm;
