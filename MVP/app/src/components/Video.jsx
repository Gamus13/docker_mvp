
import React, { useState, useContext } from "react";
import { Helmet } from "react-helmet";
import SectionTitle from "./SectionTitle";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { ThemeContext } from '../contexts/ThemeContext';
import "../index.css";

const LandingPage = () => {
  const [isOpen, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // État pour gérer le chargement
  const { theme } = useContext(ThemeContext);
  const navigate = useNavigate(); // Hook pour rediriger

  const handleButtonClick = () => {
    setIsLoading(true);
    // Simule une action asynchrone
    setTimeout(() => {
      setIsLoading(false);
      navigate('/app/auth/signup'); // Redirige vers /tchat après le chargement
    }, 2000);
  };

  return (
    <>
      <Helmet>
        <title>Docxtalk - Generate any PDF document in one click</title>
        <meta
          name="description"
          content="Docxtalk allows you to Generate any PDF document in one click. Upload your file and start asking questions right away."
        />
      </Helmet>

    
      <section className={`relative z-10 py-16 md:py-20 mb-16 lg:mb-24 lg:py-28 ${theme === 'dark' ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <SectionTitle
          title="Say goodbye to administrative hassle! Create any document in one click."
          paragraph="Copy and paste the sender and recipient links, without writing anything → Choose the document type (invoice, quote, cover letter, etc.) → Let our AI generate the PDF in seconds. → Personalize, sign, and Send your document by mail in less than 3 minutes with 95% less effort!"
          center
          mb="60px"
        />
        <div className="flex flex-col items-center justify-center mb-9 mt-6 space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0">
          <button
            onClick={handleButtonClick}
            className="inline-block rounded-sm bg-black px-8 py-4 text-base font-semibold text-white duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5 glow-button"
            disabled={isLoading} // Désactiver le bouton pendant le chargement
          >
            {isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white inline-block"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                ></path>
              </svg>
            ) : (
              <>
                Try for Free
                <FontAwesomeIcon icon={faArrowRight} className="text-white ml-2" />
              </>
            )}
          </button>
        </div>

        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4 mt-8">
              <div className="mx-auto max-w-[770px] overflow-hidden rounded-md">
                <div className="relative aspect-[77/40] items-center justify-center">
                  <img
                    src="./images/video/video.jpg"
                    alt="video image"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute right-0 top-0 flex h-full w-full items-center justify-center">
                    <button
                      aria-label="video play button"
                      onClick={() => setOpen(true)}
                      className="flex h-[70px] w-[70px] items-center justify-center rounded-full bg-white bg-opacity-75 text-primary transition hover:bg-opacity-100"
                    >
                      <svg
                        width="16"
                        height="18"
                        viewBox="0 0 16 18"
                        className="fill-current"
                      >
                        <path d="M15.5 8.13397C16.1667 8.51888 16.1667 9.48112 15.5 9.86602L2 17.6603C1.33333 18.0452 0.499999 17.564 0.499999 16.7942L0.5 1.20577C0.5 0.43597 1.33333 -0.0451549 2 0.339745L15.5 8.13397Z" />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Afficher la vidéo dans la même div en utilisant un iframe */}
                  {isOpen && (
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src="./Docxtalk presentation.mp4"
                      title="Video"
                      frameBorder="0"
                      allow="autoplay; encrypted-media"
                      allowFullScreen
                    ></iframe>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 z-[-1] h-full w-full bg-[url(/images/video/shape.svg)] bg-cover bg-center bg-no-repeat"></div>
      </section>
    </>
  );
};

export default LandingPage;
