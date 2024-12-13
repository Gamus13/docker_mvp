// src/contexts/VisibilityContext.js
import React, { createContext, useContext, useState } from 'react';

// Créer le contexte
const VisibilityContext = createContext();

// Créer un provider pour le contexte
export const VisibilityProvider = ({ children }) => {
  const [isIcon3Visible, setIcon3Visibility] = useState(false);

  return (
    <VisibilityContext.Provider value={{ isIcon3Visible, setIcon3Visibility }}>
      {children}
    </VisibilityContext.Provider>
  );
};

// Hook personnalisé pour utiliser le contexte
export const useVisibilityContext = () => useContext(VisibilityContext);
