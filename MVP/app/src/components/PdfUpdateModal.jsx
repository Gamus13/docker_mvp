// // src/PdfUpdateModal.js
// import React, { useState } from 'react';
// import PdfUpdateForm from './PdfUpdateForm';

// const PdfUpdateModal = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);

//     // Ouvrir la modale
//     const openModal = () => setIsModalOpen(true);

//     // Fermer la modale
//     const closeModal = () => setIsModalOpen(false);

//     return (
//         <div>
//             {/* Bouton pour ouvrir la modale */}
//             <button onClick={openModal} style={{ padding: '10px 20px', cursor: 'pointer' }}>
//                 Ouvrir le formulaire de mise à jour PDF
//             </button>

//             {/* Modale */}
//             {isModalOpen && (
//                 <div style={modalOverlayStyles}>
//                     <div style={modalContentStyles}>
//                         <button onClick={closeModal} style={closeButtonStyles}>X</button>
//                         <h2 className='text-black'> mise à jour des produits PDF</h2>
//                         <PdfUpdateForm />
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// // Styles CSS de la modale
// const modalOverlayStyles = {
//     position: 'fixed',
//     top: 0,
//     left: 0,
//     right: 0,
//     bottom: 0,
//     backgroundColor: 'rgba(0, 0, 0, 0.5)',
//     display: 'flex',
//     justifyContent: 'center',
//     alignItems: 'center',
//     zIndex: 1000,
// };

// const modalContentStyles = {
//     backgroundColor: '#fff',
//     padding: '20px',
//     borderRadius: '8px',
//     width: '80%',
//     maxWidth: '500px',
//     position: 'relative',
// };

// const closeButtonStyles = {
//     position: 'absolute',
//     top: '10px',
//     right: '10px',
//     color: 'black',
//     // backgroundColor: 'black',
//     border: 'none',
//     fontSize: '16px',
//     cursor: 'pointer',
// };

// export default PdfUpdateModal;

import React, { useState } from 'react';
import PdfUpdateForm from './PdfUpdateForm';
import { MdEdit } from 'react-icons/md';

const PdfUpdateModal = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Ouvrir la modale
    const openModal = () => setIsModalOpen(true);

    // Fermer la modale
    const closeModal = () => setIsModalOpen(false);

    return (
        <div>
            {/* Bouton pour ouvrir la modale avec l'icône d'édition */}
            <button onClick={openModal} style={openButtonStyles}>
                <MdEdit size={24} color="blue" />
            </button>

            {/* Modale */}
            {isModalOpen && (
                <div style={modalOverlayStyles}>
                    <div style={modalContentStyles}>
                        <button onClick={closeModal} style={closeButtonStyles}>X</button>
                        <h2 className='text-black'>Mise à jour des produits PDF</h2>
                        <PdfUpdateForm />
                    </div>
                </div>
            )}
        </div>
    );
};

// Styles CSS pour le bouton d'ouverture
const openButtonStyles = {
    padding: '10px',
    cursor: 'pointer',
    background: 'none',
    border: 'none',
    outline: 'none',
};

const modalOverlayStyles = {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
};

const modalContentStyles = {
    backgroundColor: '#fff',
    padding: '20px',
    borderRadius: '8px',
    width: '80%',
    maxWidth: '500px',
    position: 'relative',
};

const closeButtonStyles = {
    position: 'absolute',
    top: '10px',
    right: '10px',
    color: 'black',
    border: 'none',
    fontSize: '16px',
    cursor: 'pointer',
};

export default PdfUpdateModal;
