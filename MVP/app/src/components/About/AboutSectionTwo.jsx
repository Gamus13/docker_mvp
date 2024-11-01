import React, { useContext } from "react";
import { motion } from "framer-motion";
import { ThemeContext } from '../../contexts/ThemeContext';

const AboutSectionTwo = () => {
  const { theme } = useContext(ThemeContext);
  
  return (
    <>
      {/* ===== About Start ===== */}
      <section className={`overflow-hidden pb-20 lg:pb-25 xl:pb-30 ${theme === 'dark' ? 'bg-gray-900' : ''}`}>
        <div className="mx-auto max-w-c-1235 px-4 md:px-8 xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2 mb-20"
            >
              <img
                src={theme === 'dark' ? "/images/about/about-dark-01.png" : "/images/about/about-light-01.png"}
                alt="About"
                className="w-full h-auto"
              />
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right md:w-1/2"
            >
              <span className={`font-medium uppercase text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-xl md:text-2xl`}>
                <span className="mb-4 mr-4 inline-flex items-center justify-center rounded-full bg-sky-700 px-4 py-2 uppercase text-white">
                  Step 1
                </span>
                Authentication and addition of the document
              </span>
              <h2 className={`relative mb-6 text-3xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-4xl md:text-5xl`}>
                A tool powerful and 
                <span className={`relative ml-3 inline-block before:absolute before:bottom-0 before:left-0 before:-z-10 before:h-3 before:w-full  ${theme === 'dark' ? 'text-sky-500' : 'before:bg-titlebg'}`}>
                easy-to-use 
                </span>
              </h2>
              <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-black'} sm:text-lg md:text-xl`}>
                You are busy and do not have much time to read, you have a specific problem or difficulty and you are looking for a solution in a book or a document, you like to read but you do not finish your book or document. Our AI is here for you.
              </p>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-full border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    01
                  </p>
                </div>
                <div className="w-3/4 mt-6">
                  <h3 className={`text-2xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-3xl`}>
                    Authenticate yourself on the platform
                  </h3>
                  <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-black'} sm:text-lg md:text-xl`}>
                    Add your information or register via Google and access your dashboard.
                  </p>
                </div>
              </div>

              <div className="mt-7.5 flex items-center gap-5">
                <div className="flex h-15 w-15 items-center justify-center rounded-full border border-stroke dark:border-strokedark dark:bg-blacksection">
                  <p className={`text-2xl font-semibold ${theme === 'dark' ? 'text-white' : 'text-black'}`}>
                    02
                  </p>
                </div>
                <div className="w-3/4 mt-14">
                  <h3 className={`text-2xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-3xl`}>
                    Add your documents and ask your questions
                  </h3>
                  <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-black'} sm:text-lg md:text-xl`}>
                    Add the document with which you wish to discuss and ask your questions.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ===== About Two Start ===== */}
      <section className={`${theme === 'dark' ? 'bg-gray-900' : ''}`}>
        <div className="mx-auto max-w-c-1235 overflow-hidden px-4 md:px-8 2xl:px-0">
          <div className="flex items-center gap-8 lg:gap-32.5">
            <motion.div
              variants={{
                hidden: { opacity: 0, x: -20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_left md:w-1/2"
            >
              <span className={`font-medium uppercase text-lg ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-xl md:text-2xl`}>
                <span className="mb-4 mr-4 inline-flex items-center justify-center rounded-full bg-sky-700 px-4 py-2 uppercase text-white">
                  Step 2
                </span>
                Research and Resolution on specific themes
              </span>
              <h2 className={`relative mb-6 text-3xl font-bold leading-tight ${theme === 'dark' ? 'text-white' : 'text-black'} sm:text-4xl md:text-5xl`}>
                Get solutions to implement to achieve{" "}
                <span className={`relative inline-block before:absolute before:bottom-0 before:left-0 before:-z-10 before:h-3 before:w-full ${theme === 'dark' ? 'text-yellow-700' : 'before:bg-titlebg2'}`}>
                  your goals.
                </span>
              </h2>
              <p className={`text-base leading-relaxed ${theme === 'dark' ? 'text-gray-300' : 'text-black'} sm:text-lg md:text-xl`}>
                You are looking for methods, you are encountering difficulties to achieve your professional, commercial, personal objectives. 
                Do you have a document that addresses your difficulty? But you lack availability to read it, and you seek to get the solution to your problem. 
                Our tool gives you the answers tailored to your needs.
              </p>
              <div>
                <a
                  href="#"
                  className={`group mt-7.5 inline-flex items-center gap-2.5 ${theme === 'dark' ? 'text-white dark:hover:text-primary' : 'text-black hover:text-primary'}`}
                >
                  <span className="duration-300 group-hover:pr-2">
                    Take action
                  </span>
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 14 14"
                    fill="currentColor"
                  >
                    <path d="M10.4767 6.16701L6.00668 1.69701L7.18501 0.518677L13.6667 7.00034L7.18501 13.482L6.00668 12.3037L10.4767 7.83368H0.333344V6.16701H10.4767Z" />
                  </svg>
                </a>
              </div>
            </motion.div>
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
              }}
              initial="hidden"
              whileInView="visible"
              transition={{ duration: 1, delay: 0.1 }}
              viewport={{ once: true }}
              className="animate_right relative mx-auto hidden aspect-[588/526.5] md:block md:w-1/2"
            >
              <img
                src={theme === 'dark' ? "/images/about/about-dark-02.svg" : "/images/about/about-light-02.svg"}
                alt="About"
                className="w-full h-auto"
              />
              
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AboutSectionTwo;
