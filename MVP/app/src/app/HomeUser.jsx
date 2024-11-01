import React, { useEffect, useState, useContext } from "react"; 
import axios from "../axios"; 
import HeaderUser from "../components/Headeruser";
import ListItem from "../components/ListItem";
import { ThemeContext } from '../contexts/ThemeContext';

const HomeUser = () => {
  const [documents, setDocuments] = useState([]); 
  const [loading, setLoading] = useState(true); 
  const { theme } = useContext(ThemeContext);

  useEffect(() => {
    const fetchDocuments = async () => {
      try {
        const response = await axios.get('/Userpdfs'); 
        setDocuments(response.data); 
      } catch (error) {
        console.error('Erreur lors de la récupération des documents:', error);
      } finally {
        setLoading(false); 
      }
    };
    fetchDocuments(); 
  }, []); 

  const downloadDocument = (path) => {
    const url = `/${path}`; 
    window.open(url, '_blank'); 
  };

  return (
    <div className="text-neutral-400 rounded-lg w-full h-full overflow-hidden overflow-y-auto">
      <HeaderUser>
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 mt-4">
          <ListItem src="./images/liked.png" name="Liked Songs" href="liked" />
        </div>
      </HeaderUser>
      <div className="mt-2 px-6">
        <div className="flex justify-between items-center">
          {/* <h1 className="text-white text-2xl font-semibold">Your Recent Documents</h1> */}
          <h1 className={`${theme === 'dark' ? 'text-white text-3xl font-semibold': ' text-black text-3xl font-semibold'}`}>Your Recent Documents</h1>
        </div>
        {loading ? (
          <p>Loading documents...</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-4">
            {documents.length > 0 ? (
              documents.map((doc) => (
                <ListItem
                  key={doc.id}
                  image="data:image/jpeg;base64,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"
                  name={doc.filename}
                  // href={() => downloadDocument(doc.path)}
                  date={`Created on : ${new Date(doc.created_at).toLocaleString()}`}
                />
              ))
            ) : (
              <p>Aucun document disponible.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeUser;
