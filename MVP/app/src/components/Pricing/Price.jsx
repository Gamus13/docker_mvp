
import React, { useState, useContext } from "react";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";
import { ThemeContext } from '../../contexts/ThemeContext';
import SectionTitle from "../Common/SectionTitle";
import DescriptionTitle from "../Common/descriptionTitle";

const Pricing = () => {
  const [isMonthly, setIsMonthly] = useState(true);
  const { theme } = useContext(ThemeContext);

  const togglePricing = () => {
    setIsMonthly(!isMonthly);
  };

  return (
    <section
      id="pricing"
      className={`relative z-1 py-16 md:py-20 lg:py-28 ${theme === 'dark' ? 'bg-gray-900 ' : 'bg-white text-gray-900'}`}
    >
      <div className="container">
        <DescriptionTitle
          description="Pricing"
          center
        />
        <SectionTitle
          title="Simple and Affordable Pricing"
          paragraph="We are delighted to offer you a range of subscription plans to suit all your needs. Whether you are an occasional user or a growing business, we have an offer that suits you."
          center
          width="665px"
        />

        <div className="w-full">
          <h1 className="text-2xl text-center mb-8 text-sky-600">-50% during the launch period</h1>
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsMonthly(true)}
              className={`${
                theme
                  ? "pointer-events-none text-sky-500"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Monthly
            </span>
            <div
              onClick={togglePricing}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div
                  className={`h-5 w-14 rounded-full ${theme === 'dark' ? 'bg-gray-700' : 'bg-gray-300'} shadow-inner`}
                ></div>
                <div
                  className={`${
                    theme ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full ${theme === 'dark' ? 'bg-sky-500' : 'bg-sky-400'} transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>
            <span
              onClick={() => setIsMonthly(false)}
              className={`${
                theme === 'dark' 
                  ? "text-dark dark:text-sky-500"
                  : "pointer-events-none text-sky-500"
              } ml-4 cursor-pointer text-sky-400 font-semibold`}
            >
              Yearly
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          <PricingBox
            packageName="Individuals"
            originalPrice={isMonthly ? "38,50" : "0"} // Prix barré
            price={isMonthly ? "20,63" : "0"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For individuals and entrepreneurs with basic document generation and editing needs"
          >
            <OfferList text="5 pages per PDF" status="active" />
            <OfferList text="4MB file size limit" status="desactive" />
            <OfferList text="Mobile-friendly interface" status="active" />
            <OfferList text="20 questions / day" status="active" />
            <OfferList text="24 hour chat history" status="active" />
          </PricingBox>

          <PricingBox
            packageName="Standard"
            originalPrice={isMonthly ? "15" : "120"} // Prix barré
            price={isMonthly ? "55,37" : "789"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For small to medium teams who want to generate, edit, send, sign and collaborate on agreements"
            className="border-2 border-blue-500 rounded-lg shadow-lg relative"
          >
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">More Popular</span>
            <OfferList text="25 pages per PDF" status="active" />
            <OfferList text="16MB file size limit" status="active" />
            <OfferList text="Mobile-friendly interface" status="active" />
            <OfferList text="Email Support" status="active" />
            <OfferList text="Higher-quality responses" status="active" />
            <OfferList text="Priority support" status="active" />
            <OfferList text="Downloading the summary of the discussion with the file" status="active" />
          </PricingBox>

          <PricingBox
            packageName="Premium"
            originalPrice={isMonthly ? "30" : "240"} // Prix barré
            price={isMonthly ? "20,15" : "96,72"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Lorem ipsum dolor sit amet adiscing elit Mauris egestas enim."
          >
            <OfferList text="Unlimited files" status="active" />
            <OfferList text="Use with Unlimited Projects" status="active" />
            <OfferList text="Mobile-friendly interface" status="active" />
            <OfferList text="Unlimited Questions" status="active" />
            <OfferList text="Email Support" status="active" />
            <OfferList text="Downloading the summary of the discussion with the file" status="active" />
            <OfferList text="Lifetime storage of chat history" status="active" />
            <OfferList text="Access to the discussion with videos and audio" status="active" />
            <OfferList text="Access to file modification tools" status="active" />
          </PricingBox>
          
        </div>
      </div>

      <div className="absolute bottom-0 left-0 ">
        <svg
          width="239"
          height="601"
          viewBox="0 0 239 601"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect
            opacity="0.3"
            x="-184.451"
            y="600.973"
            width="196"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -184.451 600.973)"
            fill="url(#paint0_linear_93:235)"
          />
          <rect
            opacity="0.3"
            x="-188.201"
            y="385.272"
            width="59.7544"
            height="541.607"
            rx="2"
            transform="rotate(-128.7 -188.201 385.272)"
            fill="url(#paint1_linear_93:235)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_93:235"
              x1="-90.1184"
              y1="420.414"
              x2="-90.1184"
              y2="1131.65"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
            <linearGradient
              id="paint1_linear_93:235"
              x1="-159.441"
              y1="204.714"
              x2="-159.441"
              y2="915.952"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#4A6CF7" />
              <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  );
};

export default Pricing;
