import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom';
import axios from '../axios';

function TopicPage() {
  const { keyword } = useParams();
  const [topicData, setTopicData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`/topics/${keyword}`)
      .then(response => {
        setTopicData(response.data);
        setLoading(false);
      })
      .catch(error => {
        if (error.response) {
          setError(`Erreur serveur: ${error.response.data.message || 'Quelque chose a mal tourné'}`);
        } else if (error.request) {
          setError('Erreur de connexion: Impossible de joindre le serveur');
        } else {
          setError('Une erreur inconnue est survenue');
        }
        setLoading(false);
      });
  }, [keyword]);

  if (loading) return <div className="text-center mt-10 text-blue-600">Chargement...</div>;

  if (error) return <div className="text-center mt-10 text-red-600">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <Helmet>
        <title>{topicData.title}</title>
        <meta name="description" content={topicData.description} />
        <meta property="og:image" content={topicData.featured_image} />
        <meta property="og:title" content={topicData.title} />
      </Helmet>

      <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
        {/* Texte à gauche avec espacement à droite */}
        <div className="md:w-1/2 md:pr-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">{topicData.title}</h1>
          <p className="text-lg text-gray-600 mb-6">{topicData.description}</p>
          <h3 className="text-2xl font-semibold text-gray-700 mb-3">Informations détaillées</h3>
          <p className="text-gray-600 mb-6">{topicData.detailed_information}</p>

          {/* Bouton d'action */}
          <button className="mt-4 px-6 py-2 bg-sky-400 text-white  shadow-md hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-300 focus:ring-offset-2">
            Try for Free 
          </button>
        </div>

        {/* Image à droite avec hauteur augmentée */}
        <div className="md:w-1/2 flex justify-center">
          <img
            src={topicData.featured_image}
            alt={topicData.title}
            className="rounded-lg shadow-md w-full object-cover h-[700px]" // Augmentation de la hauteur
          />
        </div>
      </div>
    </div>
  );
}

export default TopicPage;
