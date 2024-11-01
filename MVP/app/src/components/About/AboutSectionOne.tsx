import React, { useContext } from "react";
import { motion } from "framer-motion";
import SectionTitle from "../Common/SectionTitle";
import { ThemeContext } from "../../contexts/ThemeContext";

const checkIcon = (
  <svg width="16" height="13" viewBox="0 0 16 13" className="fill-current">
    <path d="M5.8535 12.6631C5.65824 12.8584 5.34166 12.8584 5.1464 12.6631L0.678505 8.1952C0.483242 7.99994 0.483242 7.68336 0.678505 7.4881L2.32921 5.83739C2.52467 5.64193 2.84166 5.64216 3.03684 5.83791L5.14622 7.95354C5.34147 8.14936 5.65859 8.14952 5.85403 7.95388L13.3797 0.420561C13.575 0.22513 13.8917 0.225051 14.087 0.420383L15.7381 2.07143C15.9333 2.26669 15.9333 2.58327 15.7381 2.77854L5.8535 12.6631Z" />
  </svg>
);

const List = ({ text }) => {
  const { theme } = useContext(ThemeContext);

  return (
    <p className={`mb-5 flex items-center text-lg font-medium ${theme === 'dark' ? 'text-gray-300' : 'text-body-color'}`}>
      <span className={`mr-4 flex h-[30px] w-[30px] items-center justify-center rounded-md ${theme === 'dark' ? 'bg-blue-700 text-primary' : 'bg-blue-200 text-primary'}`}>
        {checkIcon}
      </span>
      {text}
    </p>
  );
};

const AboutSectionOne = () => {
  const { theme } = useContext(ThemeContext);

  // Variantes d'animation pour l'apparition au défilement
  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className={`pt-16 md:pt-20 lg:pt-28 ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'}`}>
      <div className="container">
        <motion.div
          className={`border-b ${theme === 'dark' ? 'border-white/[.15]' : 'border-body-color/[.15]'} pb-16 dark:border-white/[.15] md:pb-20 lg:pb-28`}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }} // Déclenche l'animation lorsque 10% de la section est visible
          variants={sectionVariants}
          transition={{ duration: 0.6 }} // Durée de l'animation
        >
          <div className="-mx-4 flex flex-wrap items-center">
            <div className="w-full px-4 lg:w-1/2">
              <SectionTitle
                title="Our mission is to make information more accessible and interactive."
                paragraph="We designed Docxtalk to simplify the way you access the information in your PDF documents. Whether you are a student, professional or simply curious, our tool saves you time by giving you a new way to consult, explore and learn from your PDF files."
                mb="44px"
              />

              <div className="mb-12 max-w-[570px] lg:mb-0" data-wow-delay=".15s">
                <div className="mx-[-12px] flex flex-wrap">
                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Premium quality" />
                    <List text="Tailwind CSS" />
                    <List text="Use for lifetime" />
                  </div>

                  <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                    <List text="Next.js" />
                    <List text="Rich documentation" />
                    <List text="Developer friendly" />
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full px-4 lg:w-1/2">
              <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
                <img
                  src={theme === 'dark' ? '/images/about/about-image-dark.svg' : '/images/about/about-image.svg'}
                  alt="about-image"
                  className={`mx-auto max-w-full drop-shadow-three ${theme === 'dark' ? 'dark:hidden' : 'dark:drop-shadow-none'}`}
                />
                <img
                  src={theme === 'dark' ? '/images/about/about-image.svg' : '/images/about/about-image-dark.svg'}
                  alt="about-image"
                  className={`mx-auto hidden max-w-full drop-shadow-three ${theme === 'dark' ? 'dark:block' : 'dark:drop-shadow-none'}`}
                />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
    
  );
};

export default AboutSectionOne;
