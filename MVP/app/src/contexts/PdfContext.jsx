
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from '../axios';

// Créer le contexte
const PdfContext = createContext();

// Créer un provider pour le contexte
export const PdfProvider = ({ children }) => {
  const [pdfPath, setPdfPath] = useState('https://dp-www.s3.ensam.eu/public/2016-11/pdf.pdf');
  const [loading, setLoading] = useState(false);

  // Fonction pour récupérer les PDF
  const fetchPdf = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/pdfs');
      if (response.data.length > 0) {
        const pdfPathFromServer = response.data[0].path.replace(/\\/g, '/'); 
        setPdfPath(pdfPathFromServer);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchPdfUpdate = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/pdfsupdate');
      if (response.data.length > 0) {
        setPdfPath(response.data[0].path);
      }
    } catch (error) {
      console.error('Erreur lors de la récupération des mises à jour PDF:', error);
    } finally {
      setLoading(false);
    }
  };

  // Fonction pour sélectionner un modèle PDF et mettre à jour `pdfPath`
  const handleSelectModel = (pdfPath) => {
    setPdfPath(pdfPath); // Met à jour le chemin du PDF sélectionné
  };

  return (
    <PdfContext.Provider value={{ pdfPath, fetchPdf, fetchPdfUpdate, handleSelectModel, loading }}>
      {children}
    </PdfContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const usePdfContext = () => {
  return useContext(PdfContext);
};
