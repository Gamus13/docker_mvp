import React, { createContext, useState } from 'react';

export const UploadContext = createContext();

export const UploadProvider = ({ children }) => {
  const [refresh, setRefresh] = useState(false); // État de rafraîchissement

  return (
    <UploadContext.Provider value={{ refresh, setRefresh }}>
      {children}
    </UploadContext.Provider>
  );
};
