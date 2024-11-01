// import { motion } from "framer-motion";
// import FadeOnScroll from "../components/animations/FadeOnScroll";
// import TitleLight from "../components/ui/TitleLight";
// import { worksImages } from "../data.json";

// export default function BeautifulWorks() {
//   return (
//     <div id="portfolio">
//       <FadeOnScroll>
//         <TitleLight
//           title="Our Beautiful Works"
//           description={`We help our clients grow their bottom-line with clear and \n professional websites.`}
//         />
//       </FadeOnScroll>
//       <div className="w-full pt-20">
//         <div className="grid h-[1000px] grid-cols-2 gap-5 overflow-hidden md:grid-cols-4">
//           {worksImages.concat(worksImages).map((image, index) => (
//             <motion.div
//               key={index}
//               initial={{ translateY: index % 2 === 0 ? "0%" : "-200%" }}
//               animate={{ translateY: index % 2 === 0 ? "-200%" : "0%" }}
//               transition={{
//                 duration: 20,
//                 repeat: Infinity,
//                 ease: "linear",
//               }}
//             >
//               <div className={`${index % 2 === 0 ? "-mb-20 mt-20" : ""}`}>
//                 <img
//                   src={image.src}
//                   alt={image.alt}
//                   className="w-full object-cover shadow-lg"
//                 />
//               </div>
//             </motion.div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }
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
    <div id="portfolio" className="px-8 md:px-16 lg:px-24">
      <DescriptionTitle
        description="generate any document in one click"
        center
      />
      <FadeOnScroll>
        <TitleLight
          
          title="Templates that Live Up to Your Ambitions!"
          description={`Discover our library of customizable templates: cover letters, contracts, certificates, quotes, and much more. With DOCXTALK, create your documents quickly and easily`}
        />
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
