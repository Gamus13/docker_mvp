import React, { useContext } from "react";
import { ThemeContext } from '../../contexts/ThemeContext';

const DescriptionTitle = ({ description,  center = false }) => {
    const { theme } = useContext(ThemeContext);
    return (
        
        <div className="flex items-center justify-center w-30 h-22">
            <div className="inline-flex p-1 bg-transparent border-2 border-sky-400 rounded-full">
                <button className="bg-sky-500 text-white font-bold py-2 px-4 rounded-full shadow-md hover:bg-sky-600 transition duration-200">
                {description}
                </button>
            </div>
        </div>
    );
};

export default DescriptionTitle;
