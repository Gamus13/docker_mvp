// src/components/DocumentIcon.js
import React from 'react';
import { AiFillEye } from 'react-icons/ai'; // Importez l'icône de l'œil
import { usePdfContext } from '../contexts/PdfContext';

const DocumentIcon = ({ size = 24, color = 'black', onClick }) => {
    const { fetchPdfUpdate } = usePdfContext(); // Utiliser le contexte PDF

    const handleReset = () => {
        fetchPdfUpdate(); // Appeler la fonction pour mettre à jour le PDF
    };

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <AiFillEye size={size} color={color} /> {/* Icône de l'œil */}
      <span 
        style={{ fontSize: '14px', color, cursor: 'pointer' }} 
        onClick={handleReset} // Utilise handleReset
      >
        Voir le document modifié
      </span>
    </div>
  );
};

export default DocumentIcon;
