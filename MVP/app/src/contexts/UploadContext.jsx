import React, { createContext, useState, useContext, useEffect } from 'react';

// Créer le contexte pour gérer l'état de l'icône
export const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [isIconClickable, setIsIconClickable] = useState(true); // L'icône est cliquable au départ

  // Fonction pour désactiver l'icône pendant 1 minute après l'upload
  const disableIconTemporarily = () => {
    setIsIconClickable(false);
    setTimeout(() => {
      setIsIconClickable(true);
    }, 60000); // 1 minute
  };

  return (
    <UploadContext.Provider value={{ isIconClickable, disableIconTemporarily }}>
      {children}
    </UploadContext.Provider>
  );
};

// Hook personnalisé pour accéder facilement au contexte
export const useUploadContext = () => useContext(UploadContext);
