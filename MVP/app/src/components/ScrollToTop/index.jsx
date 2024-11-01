
import React, { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const toggleVisibility = () => {
      // console.log("PageYOffset:", window.pageYOffset); // Ajout de logs
      if (window.pageYOffset > 50) {  // Réduire le seuil pour les tests
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    <div className="fixed bottom-8 right-8 z-[99]">
      {isVisible && (
        <div
          onClick={scrollToTop}
          aria-label="scroll to top"
          className="flex items-center justify-center w-10 h-10 bg-sky-400 text-white cursor-pointer "
        >
          ↑
        </div>
      )}
    </div>
  );
}
