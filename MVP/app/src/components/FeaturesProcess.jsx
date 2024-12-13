
// import React, { useContext } from 'react';
// import { FaArrowRight } from "react-icons/fa";
// import FadeLeft from "../components/animations/FadeLeft";
// import FadeOnScroll from "../components/animations/FadeOnScroll";
// import FadeRight from "../components/animations/FadeRight";
// import Button from "../components/ui/Button";
// import { designData } from "../data.json";
// import "../index.css";
// import DescriptionTitle from "./Common/descriptionTitle";
// import { ThemeContext } from '../contexts/ThemeContext';
// import Carousel from './HostingComponent';

// export default function HowItWorks() {
//   const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

//   const AnimationComponentLeft = screenWidth < 768 ? FadeOnScroll : FadeLeft;
//   const AnimationComponentRight = screenWidth < 768 ? FadeOnScroll : FadeRight;
//   const { theme } = useContext(ThemeContext);

//   return (
//     <div className="pb-28 pt-32 text-white" id="process overflow-hidden">
//       <DescriptionTitle
//         description="How does it work?"
//         center
//       />
//       <div className="mx-12 flex flex-col mt-8 items-center justify-evenly lg:flex-row lg:gap-20">
//         <AnimationComponentLeft>
//           <div className="flex flex-col lg:w-[606px]">
//             <span className="text-sm font-bold text-blue-700">HOW WE WORK</span>
//             <h1 className={`${theme === 'dark' ? 'text-white mt-4 text-3xl font-bold md:text-5xl' : 'text-black mt-4 text-3xl font-bold md:text-5xl'}`}>
//               Get a dedicated design team at a fraction of the cost.
//             </h1>
//           </div>
//         </AnimationComponentLeft>
//         <AnimationComponentRight>
//           <div className="flex translate-y-8 flex-col lg:max-w-[500px]">
//             <p className={`${theme === 'dark' ? 'text-white mt-4 text-lg font-extralight opacity-80 md:text-xl' : 'text-black mt-4 text-lg   md:text-xl'}`}>
//               Grow your brand with high-quality design for a flat monthly fee.
//               Work with senior designers. Subscribe and make as many requests as
//               you need - no limits.
//             </p>
//             <a href="#pricing">
//               <Button text="See Pricing" className="mt-10 h-[56px] w-36 px-2 bg-blue-700 text-white" />
//             </a>
//           </div>
//         </AnimationComponentRight>
        
//       </div>
//       <Carousel/>
//       <div className="mx-auto mt-36 max-w-screen-xl px-12 flex flex-col items-start justify-center md:mt-52 md:flex-row">
//         {designData.map((item, index) => (
//           <FadeOnScroll key={index} delay={index * 0.2}>
//             <div className="flex-1 px-4"> {/* Padding interne maintenu */}
//               <div className="flex items-center justify-start">
//                 <div className="flex size-12 items-center justify-center rounded-full text-white bg-blue-700 md:mb-4 lg:size-20">
//                   <img
//                     src={item.src}
//                     alt={item.name}
//                     className="block transform p-1 transition-transform duration-300 hover:rotate-[360deg] lg:size-12"
//                   />
//                 </div>
//                 {index < 2 && (
//                   <div className="relative mb-4 mr-2 flex w-[75%] items-center">
//                     <hr className="hidden h-0.5 flex-1 border-0 bg-blue-700 md:flex" />
//                     <FaArrowRight className="absolute -right-2 hidden text-blue-700 md:flex" />
//                   </div>
//                 )}
//               </div>
//               <h3 className={`${theme === 'dark' ? 'text-white mt-6 text-xl font-semibold' : 'text-gray-800 mt-6 text-xl font-semibold'}`}>{item.title}</h3>
//               <p className={`${theme === 'dark' ? 'text-white mb-8 w-2/3 font-extralight opacity-80 md:my-6' : 'text-black mb-8 w-2/3  md:my-6'}`}>
//                 {item.caption}
//               </p>
//             </div>
//           </FadeOnScroll>
//         ))}
//       </div>
      
//     </div>
//   );
// }
import React, { useContext } from 'react';
import { FaArrowRight } from "react-icons/fa";
import FadeLeft from "../components/animations/FadeLeft";
import FadeOnScroll from "../components/animations/FadeOnScroll";
import FadeRight from "../components/animations/FadeRight";
import Button from "../components/ui/Button";
import { designData } from "../data.json";
import "../index.css";
import DescriptionTitle from "./Common/descriptionTitle";
import { ThemeContext } from '../contexts/ThemeContext';
import Carousel from './HostingComponent';
import FeaturesSection from './FeaturesSection';
import DemarquezVous from './DemarquezVous';
import DemarquezVousDroite from './DemarquezVousDroite';
import DocxtalkComparison from './Comparison';
import Hero from './Hero';
import Collabration from './Collabration';
import Services from './Services';
import Details from './Details';

export default function HowItWorks() {
  const screenWidth = typeof window !== "undefined" ? window.innerWidth : 1024;

  const AnimationComponentLeft = screenWidth < 768 ? FadeOnScroll : FadeLeft;
  const AnimationComponentRight = screenWidth < 768 ? FadeOnScroll : FadeRight;
  const { theme } = useContext(ThemeContext);

  return (
    <div className="pb-28 pt-32 text-white" id="howItWorks">
      <DescriptionTitle
        description="HowItWorks"
        center
      />
      {/* <FeaturesSection/> */}
      {/* <DemarquezVous/>
      <DemarquezVousDroite/> */}
      <Hero/>
      <Collabration />
      {/* <Services/> */}
      <Details/>
      {/* <div className="mx-auto mt-6 max-w-screen-xl px-12 flex flex-col items-start justify-center md:mt-52 md:flex-row">
        {designData.map((item, index) => (
          <FadeOnScroll key={index} delay={index * 0.2}>
            <div className="flex-1 px-4"> 
              <div className="flex items-center justify-start">
                <div className="flex size-12 items-center justify-center rounded-full text-white bg-sky-400 md:mb-4 lg:size-20">
                  <img
                    src={item.src}
                    alt={item.name}
                    className="block transform p-1 transition-transform duration-300 hover:rotate-[360deg] lg:size-12"
                  />
                </div>
                {index < 2 && (
                  <div className="relative mb-4 mr-2 flex w-[75%] items-center">
                    <hr className="hidden h-0.5 flex-1 border-0 bg-sky-400 md:flex" />
                    <FaArrowRight className="absolute -right-2 hidden text-sky-400 md:flex" />
                  </div>
                )}
              </div>
              <h3 className={`${theme === 'dark' ? 'text-white mt-6 text-xl font-semibold' : 'text-gray-800 mt-6 text-xl font-semibold'}`}>{item.title}</h3>
              <p className={`${theme === 'dark' ? 'text-white mb-8 w-2/3 font-extralight opacity-80 md:my-6' : 'text-black mb-8 w-2/3  md:my-6'}`}>
                {item.caption}
              </p>
            </div>
          </FadeOnScroll>
        ))}
      </div> */}
    </div>
  );
}
