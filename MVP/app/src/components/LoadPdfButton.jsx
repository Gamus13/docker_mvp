import React from 'react';
import { usePdfContext } from '../contexts/PdfContext';

function LoadPdfButton() {
  const { fetchPdf } = usePdfContext();

  const handleLoadDocument = async () => {
    await fetchPdf(); // Récupérer le PDF
  };

  return (
    <button onClick={handleLoadDocument} className="mb-4 p-2 bg-sky-400 text-white rounded">
      Load the document
    </button>
  );
}

export default LoadPdfButton;
