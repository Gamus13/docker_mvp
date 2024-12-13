import React, { useContext } from 'react';
import { motion } from "framer-motion";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import TitleLight from "../components/ui/TitleLight";
import { worksImages } from "../data.json";
import DescriptionTitle from "../components/Common/descriptionTitle";
import { ThemeContext } from '../contexts/ThemeContext';

export default function BeautifulWorks() {
  const { theme } = useContext(ThemeContext);
  return (
    <div id="beautifulWorks" className="px-8 md:px-16 lg:px-24">
      <DescriptionTitle
        description="generate any document in one click"
        center
      />
      <FadeOnScroll>
        <div className="space-y-6 flex flex-col items-center">
          <h2 className={`text-3xl md:text-4xl mt-8 font-bold ${theme === "dark" ? "text-white" : "text-black"} mr-4`}>Templates that Live Up to Your Ambitions!</h2>
          
          <p className={`text-lg md:text-xl mb-8 font-sm max-w-2xl text-center ${theme === "dark" ? "text-white" : "text-black"} `}>
            Discover our library of customizable templates: cover letters, contracts, certificates, quotes, and much more. With DOCXTALK, create your documents quickly and easily
          </p>
        </div>
        
      </FadeOnScroll>
      <div className="w-full pt-20">
        <div className="grid h-[1000px] grid-cols-2 gap-5 overflow-hidden md:grid-cols-4">
          {worksImages.concat(worksImages).map((image, index) => (
            <motion.div
              key={index}
              initial={{ translateY: index % 2 === 0 ? "0%" : "-200%" }}
              animate={{ translateY: index % 2 === 0 ? "-200%" : "0%" }}
              transition={{
                duration: 20,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className={`${index % 2 === 0 ? "-mb-20 mt-20" : ""}`}>
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full object-cover shadow-lg"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
