import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';
import OfferList from './Pricing/OfferList';

const DemarquezVous = () => {
  return (
    <div className="flex flex-col md:flex-row items-center justify-center mx-auto p-6 rounded-lg shadow-lg md:space-x-6 w-11/12 md:w-3/4 lg:w-2/3">
      <div className="relative w-full md:w-1/2 mb-6 md:mb-0 h-full">
        <img
          src="https://cdn.pixabay.com/photo/2015/12/13/00/44/sailing-vessel-1090467_640.jpg" // Remplacez par le chemin de votre image
          alt="Download Assets"
          className="w-full h-full rounded-lg"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-50 rounded-full p-2">
            <FontAwesomeIcon icon={faPlay} className="text-white text-2xl" />
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 p-4  rounded-lg  h-full flex flex-col justify-center">
        <h2 className="text-[3vw] md:text-[2vw] font-bold mb-4 text-black text-center md:text-left">
          Démarquez-vous avec les meilleures créatives
        </h2>
        <p className="text-[1.5vw] md:text-[1vw] text-gray-700 mb-4 text-center md:text-left">
          La clé de la rentabilité réside dans la création d’annonces exceptionnelles qui captiveront votre audience. Accédez aux annonces les plus performantes de votre niche, en temps réel.
        </p>
        <ul className="list-disc list-inside text-sky-500 text-[1.5vw] md:text-[1vw] text-center md:text-left">
            <OfferList text="Trouvez des angles marketing différents" status="active" className="text-white" />
            <OfferList text="Comparez les données d’engagement" status="active" className="text-white" />
            <OfferList text="Téléchargez facilement toutes les créatives" status="active" className="text-white" />
        </ul>
      </div>
    </div>
  );
};

export default DemarquezVous;
