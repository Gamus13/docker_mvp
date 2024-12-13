import React, { useState, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import faqData from './faqData'; // Assure-toi que le chemin d'importation est correct
import SectionTitle from '../Common/SectionTitle';
import DescriptionTitle from '../Common/descriptionTitle';
import { ThemeContext } from '../../contexts/ThemeContext';

const Faq = () => {
  const [selectedId, setSelectedId] = useState(null);
  const { theme } = useContext(ThemeContext);

  const handleToggle = (id) => {
    setSelectedId(selectedId === id ? null : id);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 " id="faq"> 
      
      <div className="w-full max-w-2xl p-4  rounded-lg ">
        <DescriptionTitle
          description="Faq"
          center
        />
        <SectionTitle
          title="Frequently Asked Questions"
          paragraph="Here are some questions that many people ask about the tool."
          center
          width="665px"
        />
        
        <div className="space-y-4 ">
          {faqData.map(({ id, quest, ans }) => (
            <div key={id} className="border-b border-gray-100 shadow-lg">
              <button
                onClick={() => handleToggle(id)}
                className={`w-full text-left py-3 px-4 font-semibold text-lg  rounded-t-lg flex items-center justify-between focus:outline-none ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-gray-200 text-black'}`}
              >
                <span>{quest}</span>
                <span className={`${theme === 'dark' ? 'text-white' : 'text-gray-600'}`}>
                  {selectedId === id ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-6 h-6"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  )}
                </span>
              </button>
              <AnimatePresence>
                {selectedId === id && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className={`overflow-hidden px-4 py-3  rounded-b-lg ${theme === 'dark' ? 'bg-gray-900 text-gray-400' : 'bg-gray-200'}`}
                  >
                    <p>{ans}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
      
    </div>
  );
};

export default Faq;
