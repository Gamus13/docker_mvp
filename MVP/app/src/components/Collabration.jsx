import React, { useContext } from "react";
import Section from "./Section";
import StepFlow from "./StepFlow";
import { ThemeContext } from '../contexts/ThemeContext';

export default function Collabration() {
  const { theme } = useContext(ThemeContext);

  return (
    <Section crosses>
      <div className="container mx-auto text-center px-6 md:px-12 space-y-16">
        {/* Titre Principal */}
        <div className="space-y-6 flex flex-col items-center">
          <div className="flex items-center justify-center space-x-2">
            <h2 className={`text-3xl md:text-4xl font-bold ${theme === "dark" ? "text-white" : "text-black"} mr-4`}>
              Imagine what you could do if you <br /> had an administrative assistant working
            </h2>
            <img src="./container_1.svg" alt="icon" className="h-16 w-16" />
          </div>
          <p className={`text-lg md:text-xl ${theme === "dark" ? "text-white" : "text-black"} `}>
            Here's how Docxtalk works:
          </p>
        </div>

        {/* Composant StepFlow au Milieu avec Espacement */}
        <div className="mt-12">
          <StepFlow />
        </div>

        {/* Titre et Paragraphe en Dessous */}
        <div className="space-y-4">
          {/* <p className={`text-lg md:text-xl ${theme === "dark" ? "text-white" : "text-black"} max-w-screen-lg mx-auto`}>
            The best part? Docxtalk is the only business document creator that focuses on making you money, and it's free to get started! So what are you waiting for? Get started, here's what's in store for you
          </p> */}
          <p className={`text-lg md:text-xl ${theme === "dark" ? "text-white" : "text-black"} max-w-screen-lg mx-auto`}>
            The best part? Docxtalk is the only business document creator that focuses on making you money, and it's free to get started! So what are you waiting for? Get started, here's what's in store for you
            <div className="flex justify-center mt-4">
              <span className="text-2xl">👇</span>
              <span className="text-2xl ml-2">👇</span>
            </div>
          </p>

        </div>
      </div>
    </Section>
  );
}
