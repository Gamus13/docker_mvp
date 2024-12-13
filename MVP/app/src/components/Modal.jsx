import React from 'react';
import ContactForm from './Pdfmailsend';

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null; // Ne rien afficher si le modal n'est pas ouvert

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
        <button 
          onClick={onClose} 
          className="absolute top-2 right-2 text-black text-xl focus:outline-none"
        >
          &times; {/* Icône de fermeture */}
        </button>
        <ContactForm/>
      </div>
    </div>
  );
};

export default Modal;
