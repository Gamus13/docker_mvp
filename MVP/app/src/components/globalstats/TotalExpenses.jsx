import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { IoBook } from 'react-icons/io5'; // Import de l'icône du livre

export default function TotalDocuments() {
  const [totalDocuments, setTotalDocuments] = useState(0);

  useEffect(() => {
    const fetchTotalDocuments = async () => {
      try {
        const response = await axios.get('/documents/total');
        setTotalDocuments(response.data.total_documents);
      } catch (error) {
        console.error('Error fetching total documents:', error);
      }
    };

    fetchTotalDocuments();
  }, []);

  return (
    <BoxWrapper>
      <div className="rounded-full h-12 w-12 flex items-center justify-center bg-orange-600">
        <IoBook className="text-2xl text-white" /> {/* Icône du livre */}
      </div>
      <div className="pl-4">
        <span className="text-sm text-gray-500 font-light">Total Documents</span>
        <div className="flex items-center">
          <strong className="text-xl text-gray-700 font-semibold">{totalDocuments}</strong>
        </div>
      </div>
    </BoxWrapper>
  );
}

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
