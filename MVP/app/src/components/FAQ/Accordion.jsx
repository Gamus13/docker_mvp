import React, { useState } from 'react';

const Accordion = ({ title, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="py-2 border-b border-stroke dark:border-strokedark">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full px-6 py-5 text-metatitle3 font-medium text-black dark:text-white lg:px-9 lg:py-7.5"
      >
        <span>{title}</span>
        <svg
          className={`fill-indigo-500 shrink-0 ml-8 transition-transform duration-200 ease-out ${
            isOpen ? 'rotate-180' : ''
          }`}
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect y="7" width="16" height="2" rx="1" />
          <rect
            y="7"
            width="16"
            height="2"
            rx="1"
            className={`transform rotate-90 transition-transform duration-200 ease-out ${
              isOpen ? 'rotate-180' : ''
            }`}
          />
        </svg>
      </button>
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden text-slate-600 text-sm ${
          isOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 py-5 dark:border-strokedark lg:px-9 lg:py-7.5">{answer}</div>
      </div>
    </div>
  );
};

export default Accordion;
