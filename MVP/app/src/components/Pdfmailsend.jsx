import React, { useState, useEffect } from 'react';
import axios from '../axios';
import '../index.css';

const ContactForm = () => {
  const [name, setName] = useState(''); // État pour le nom
  const [title, setTitle] = useState(''); // État pour le titre
  const [body, setBody] = useState(''); // État pour le corps du message
  const [email, setEmail] = useState(''); // État pour l'email
  const [file, setFile] = useState(null); // État pour le fichier
  const [loadingName, setLoadingName] = useState(true); // Animation de chargement pour le nom
  const [isSubmitting, setIsSubmitting] = useState(false); // Animation de chargement pour l'envoi du formulaire

  // Fonction pour récupérer les données de l'utilisateur depuis /user
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await axios.get('/user');
        setName(response.data.name); // Préremplir uniquement le champ Nom avec la valeur récupérée
      } catch (error) {
        console.error('Erreur lors de la récupération des données utilisateur:', error);
      } finally {
        setLoadingName(false); // Arrêter l'animation de chargement pour le nom
      }
    };

    fetchUserData();
  }, []);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Enregistrer le fichier sélectionné
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsSubmitting(true); // Déclencher l'animation de chargement pour l'envoi

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('message', body);
    formData.append('email', email);
    formData.append('file', file);

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
      setFile(null);
    } catch (error) {
      console.error("Erreur lors de l'envoi de l'email:", error);
    } finally {
      setIsSubmitting(false); // Arrêter l'animation de chargement pour l'envoi
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <label>Nom :</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        {loadingName && (
          <span className="loaderv" style={{ marginLeft: '8px' }} />
        )}
      </div>
      <div>
        <label>Titre :</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div>
        <label>Corps :</label>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </div>
      <div>
        <label>Email :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        <label>Fichier :</label>
        <input type="file" onChange={handleFileChange} />
      </div>
      <button type="submit" disabled={isSubmitting} style={{ position: 'relative' }}>
        Envoyer
        {isSubmitting && (
          <span className="loaderv" style={{ marginLeft: '8px', position: 'absolute', right: '-24px', top: '50%', transform: 'translateY(-50%)' }} />
        )}
      </button>
    </form>
  );
};

export default ContactForm;


