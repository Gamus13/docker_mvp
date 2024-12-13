import React, { useState } from 'react';
import { MdEdit } from 'react-icons/md'; // Icône d'édition
// import ContactForm from './Pdfmailsend';
import '../index.css';
import PdfUpdateForm from './PdfUpdateForm';

const Icon3 = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleIconClick = () => {
        setIsModalOpen(true); // Ouvrir la modal
    };

    const closeModal = () => {
        setIsModalOpen(false); // Fermer la modal
    };

    return (
        <div>
            <div className="icon" title="Edit the document" onClick={handleIconClick}>
                <MdEdit />
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    {/* Contenu de la modal centré */}
                    <div className="bg-white rounded-lg p-6 shadow-lg max-w-md w-full relative">
                        <button 
                            onClick={closeModal} 
                            className="absolute top-2 right-2 text-black text-xl focus:outline-none"
                        >
                            &times; {/* Icône de fermeture */}
                        </button>
                        <PdfUpdateForm/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Icon3;
