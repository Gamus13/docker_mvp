import React, { useContext } from "react";
import Section from "./Section";
import { curve, heroBackground, robot } from "../assets";
import Button from "./Button";
import { heroIcons } from "../constant";
import { BackgroundCircles, BottomLine, Gradient } from "./design/Hero";
import { ScrollParallax } from "react-just-parallax";
import GeneratingText from "./GeneratingText";
import Notification from "./Notification";
import ComparisonTable from "./Comparison";
import Services from "./Services";
import { ThemeContext } from '../contexts/ThemeContext';
import CustomComponent from "./CustomComponent";

export default function Hero() {
  const { theme } = useContext(ThemeContext);

  return (
    <
      
    >
      <div className="container relative" >
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[4rem] md:mb-20 lg:mb:[6rem]">
          <h1 className={`h3 mb-6 font-bold ${theme === 'dark' ? ' text-white' : ' text-gray-900'}`}>
            What is Docxtalk used for?
          </h1>
          <p className={`body-1 max-w-3xl mx-auto mb-6  lg:mb-8 ${theme === 'dark' ? ' text-white' : ' text-black'}`}>
          Docxtalk simplifies the creation of essential documents for your business. In just a few clicks, generate perfectly personalized invoices, quotes, contracts, etc. Save time, reduce errors, 
          and track the opening of your shipments with an all-in-one solution designed for your efficiency.
          </p>
        </div>

        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl xl:mb-24">
          <div className="relative z-1 p-0.5 rounded-2xl ">
            <div className="relative  rounded-[1rem]">
              <div className="h-[1.4rem] rounded-t-[0.9rem]" />

              {/* Remplacement de l'élément img */}
              <div className="aspect-[33/40] rounded-b-[0.9rem] overflow-hidden md:aspect-[688/490] lg:aspect-[1024/490]">
                <CustomComponent />

                <GeneratingText
                  className={
                    "absolute left-4 right-4 bottom-[1.2rem] md:left-1/2 md:right-auto md:botom-8  md:w-[31rem] md:-translate-x-1/2 "
                  }
                />

                <ScrollParallax isAbsolutelyPositioned>
                  <ul className="hidden absolute -left-[4.5rem] bottom-[7.5rem] backdrop-blur-border px-1 py-1 bg-n-9/40 border border-n-1/20 rounded-2xl lg:flex ">
                    {heroIcons.map((icon) => (
                      <li className="p-5 " key={icon}>
                        <img src={icon} alt="icon" width={24} height={25} />
                      </li>
                    ))}
                  </ul>
                </ScrollParallax>

                <ScrollParallax isAbsolutelyPositioned>
                  <Notification
                    className={`hidden absolute -right-20 bottom-[11rem] w-[18rem] xl:flex`}
                  />
                </ScrollParallax>
              </div>
            </div>
            <Gradient />
          </div>

          <BackgroundCircles />
        </div>
      </div>
      <BottomLine />
    </>
  );
}
