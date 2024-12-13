
import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";

const CustomComponent = () => {
  const { theme } = useContext(ThemeContext);

  return (
    <div
      className={`min-h-screen flex flex-col items-center py-10 ${
        theme === "dark"
          ? "bg-gradient-to-r from-gray-900 via-blue-700 to-gray-900"
          : "bg-gradient-to-r from-sky-400 via-blue-200 to-blue-600"
      }`}
    >
      {/* Main Pricing Plans */}
      <div className="flex justify-center gap-6 w-full px-6 max-w-7xl">
        {/* Basic Plan */}
        <div className="flex flex-col bg-white w-full md:w-[30%] lg:w-[25%] rounded-lg shadow-lg">
          <div className="bg-red-500 text-white text-lg font-bold py-3 px-4 rounded-t-lg">
            Before Docxtalk
          </div>
          <div className="flex flex-col divide-y">
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">❌</span> Long hours spent creating a document
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">❌</span> High risk of human error
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">❌</span> Lack of customizable templates
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-red-500 mr-2">❌</span> Manual Recipient Tracking Process
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-red-500 mr-2">❌</span> Stress and frustration
            </div>
          </div>
        </div>

        {/* Professional Plan */}
        <div className="flex flex-col bg-white w-full md:w-[45%] lg:w-[40%] rounded-lg shadow-lg">
          <div className="bg-sky-500 text-white text-lg font-bold py-3 px-4 rounded-t-lg">
            After Docxtalk
          </div>
          <div className="flex flex-col divide-y">
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">✔️</span> PDF documents generated in minutes
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">✔️</span> Accurate Documents Through Automation
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">✔️</span> Choice of many modern templates
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">✔️</span> Automatic notifications and email tracking
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">✔️</span> Peace of mind and time saving
            </div>
            <div className="py-3 px-4 text-black flex items-center hover:font-bold hover:pl-6 transition-all">
              <span className="text-green-500 mr-2">✔️</span> A single all-in-one solution
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomComponent;
