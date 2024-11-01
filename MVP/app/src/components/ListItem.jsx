import React, { useState } from "react";
import { FaPaperPlane } from "react-icons/fa"; // Importer l'icône d'avion en papier
import Modal from './Modal'; // Importer le composant Modal

const ListItem = ({ image, name, href, date, onClick }) => {
  const [isModalOpen, setModalOpen] = useState(false); // État pour contrôler l'affichage du modal

  const handleOpenModal = () => {
    setModalOpen(true); // Ouvrir le modal
  };

  const handleCloseModal = () => {
    setModalOpen(false); // Fermer le modal
  };

  return (
    <>
      <button
        className="relative group flex flex-col items-center rounded-md overflow-hidden gap-y-2
        bg-neutral-100/10 hover:bg-neutral-100/20 transition p-4"
        onClick={onClick}
      >
        <div className="relative w-20 h-20"> {/* Ajustez la taille de l'image si nécessaire */}
          <img className="object-cover w-full h-full rounded-md" src={image} alt="Image" />
        </div>
        <p className="font-medium truncate text-center">{name}</p>
        <p className="font-medium truncate  text-right">{date}</p>
        <div
          className="absolute transition opacity-0 rounded-full flex justify-center items-center
          bg-sky-700 p-3 drop-shadow-md right-3 bottom-3 group-hover:opacity-100 hover:scale-110"
        >
          <FaPaperPlane className="text-white" onClick={handleOpenModal} /> {/* Ouvrir le modal */}
        </div>
      </button>

      {/* Composant Modal */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-2xl text-black font-semibold mb-4">Envoyer le PDF</h2>
        <p className="text-black">Voulez-vous envoyer le fichier {name} ?</p>
        {/* Ajouter ici d'autres éléments comme un formulaire pour envoyer le PDF */}
        <button
          className="mt-4 bg-blue-500 text-white rounded px-4 py-2"
          onClick={handleCloseModal}
        >
          Envoyer
        </button>
      </Modal>
    </>
  );
};

export default ListItem;
