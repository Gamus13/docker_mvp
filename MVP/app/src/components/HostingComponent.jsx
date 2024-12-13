// import React, { useState } from "react";
// import { cardStyle } from "../components/cardGradient";

// const Carousel = () => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const slides = [
//     {
//       id: 1,
//       title: "The Document Generator",
//       subtitle:
//         "In 3 clicks generate your document and customize it directly as you wish",
//       imageUrl: "./images/logo/feature1.PNG",
//     },
//     {
//       id: 2,
//       title: "User space",
//       subtitle:
//         "A smooth interface to view all your created documents as well as access to several other features.",
//       imageUrl: "./images/logo/Capture dashborduser.PNG",
//     },
//     {
//       id: 3,
//       title: "Send in one click",
//       subtitle:
//         "You have finished the modifications on your document, send it directly to the recipient.",
//       imageUrl: "./images/logo/feature1.PNG",
//     },
//   ];

//   const handleDotClick = (index) => {
//     setCurrentIndex(index);
//   };

//   return (
//     <div className="relative w-full max-w-6xl mx-auto mt-10 overflow-hidden">
//       {/* Conteneur pour le carrousel */}
//       <div
//         className="flex transition-transform duration-700 ease-in-out"
//         style={{ transform: `translateX(-${currentIndex * 100}%)` }}
//       >
//         {slides.map((slide) => (
//           <div
//             key={slide.id}
//             className="min-w-full flex-shrink-0 relative overflow-hidden"
//           >
//             {/* Application des styles de la carte */}
//             <div style={cardStyle} className="w-full h-full">
//               <img
//                 src={slide.imageUrl}
//                 alt={slide.title}
//                 className="w-full h-full object-cover aspect-[16/9]"
//               />
//             </div>
//             {/* Informations sur l'image */}
//             <div className="absolute bottom-10 left-10 bg-opacity-50 bg-black p-4 rounded-lg text-white">
//               <h2 className="text-lg md:text-2xl lg:text-3xl font-bold">
//                 {slide.title}
//               </h2>
//               <p className="text-sm md:text-lg">{slide.subtitle}</p>
//             </div>
//           </div>
//         ))}
//       </div>

//       {/* Dots pour naviguer entre les slides */}
//       <div className="flex justify-center mt-4 space-x-2">
//         {slides.map((_, index) => (
//           <button
//             key={index}
//             onClick={() => handleDotClick(index)}
//             className={`w-3 h-3 rounded-full ${
//               currentIndex === index ? "bg-sky-500" : "bg-gray-400"
//             }`}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// export default Carousel;


import React from "react";
import { TECarousel, TECarouselItem } from "tw-elements-react";

export default function CarouselDarkVariant() {
  const slides = [
    {
      id: 1,
      imageUrl: "https://cdn.pixabay.com/photo/2020/04/23/12/44/lighthouse-5082316_1280.jpg",
      title: "First slide label",
      description: "Some representative placeholder content for the first slide.",
    },
    {
      id: 2,
      imageUrl: "https://via.placeholder.com/600x400", // Image fixe pour tester
      title: "Second slide label",
      description: "Some representative placeholder content for the second slide.",
    },
    {
      id: 3,
      imageUrl: "./images/logo/feature1.PNG", // Chemin relatif à votre projet
      title: "Third slide label",
      description: "Some representative placeholder content for the third slide.",
    },
  ];

  return (
    <TECarousel
      showControls
      showIndicators
      crossfade
      ride="carousel"
      prevBtnIcon={
        <span className="inline-block text-black h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </span>
      }
      nextBtnIcon={
        <span className="inline-block text-black h-8 w-8">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </span>
      }
      theme={{
        indicator:
          "mx-[3px] box-content h-[3px] w-[30px] flex-initial cursor-pointer bg-black bg-clip-padding p-0 -indent-[999px] opacity-50 transition-opacity duration-[600ms] ease-in-out",
      }}
    >
      <div className="relative w-full overflow-hidden after:clear-both after:block after:content-['']">
        {slides.map((slide) => (
          <TECarouselItem
            key={slide.id}
            itemID={slide.id}
            className="relative float-left -mr-[100%] hidden w-full !transform-none opacity-0 transition-opacity duration-[600ms] ease-in-out"
          >
            <img
              src={slide.imageUrl}
              className="block w-full object-cover"
              alt={slide.title}
            />
            <div className="absolute inset-x-[15%] bottom-5 py-5 text-center text-black md:block">
              <h5 className="text-xl font-bold">{slide.title}</h5>
              <p>{slide.description}</p>
            </div>
          </TECarouselItem>
        ))}
      </div>
    </TECarousel>
  );
}
