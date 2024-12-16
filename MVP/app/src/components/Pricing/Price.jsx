
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

        <div className="w-full mt-8">
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
            originalPrice={isMonthly ? "20,63" : "123,78"} // Prix barré
            price={isMonthly ? "10,32" : "247,56"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For individuals and entrepreneurs with basic document generation and editing needs"
          >
            <OfferList text="Generating, editing, without electronic signature" status="active" />
            <OfferList text="Limited to 1 user" status="active" />
            <OfferList text="Document tracking (confirmation of sending and opening)" status="active" />
            <OfferList text="50 documents/month" status="active" /> 
            <OfferList text="Access to support by email only (response within 48 hours)" status="active" />
            <OfferList text="Backing up documents with standard encryption" status="active" />
          </PricingBox>

          <PricingBox
            packageName="Standard"
            originalPrice={isMonthly ? "27,68" : "332,22"} // Prix barré
            price={isMonthly ? "55,37" : "664,44"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="For small to medium teams who want to generate, edit, send, sign and collaborate on agreements via an advanced REST API"
            className="border-2 border-blue-500 rounded-lg shadow-lg relative"
          >
            <span className="absolute top-2 left-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">More Popular</span>
            <OfferList text="Full access to the REST API(generation, sending, tracking and electronic signature)" status="active" />
            <OfferList text="5,000/month API calls" status="active" />
            <OfferList text="Up to 10 users" status="active" />
            <OfferList text="Email and chat support, response within 24 hours." status="active" />
            <OfferList text="Branding on sent documents (logo and colors)." status="active" />
            <OfferList text="Exportable reports and GDPR/SOC2 compliance." status="active" />
            <OfferList text="Follow-up by email and automatic reminders." status="active" /> 
            <OfferList text="Detailed usage statistics to improve your processes." status="active" />
          </PricingBox>

          <PricingBox
            packageName="Premium"
            originalPrice={isMonthly ? "64,99" : "779,94"} // Prix barré
            price={isMonthly ? "129,99" : "1 559,88"}
            duration={isMonthly ? "mo" : "yr"}
            subtitle="Designed for large companies or structures requiring a complete and highly automated solution to manage massive document flows via an advanced REST API and professional management tools."
          >
            
            <OfferList text="Full access to the REST API(generation, sending, tracking and electronic signature)" status="active" />
            <OfferList text="20,000/month API calls" status="active" />
            <OfferList text="Unlimited users" status="active" />
            <OfferList text="customer support (email, chat, phone, 24/7)" status="active" />
            <OfferList text="Complete branding and custom feeds" status="active" />
            <OfferList text="Rapports exportables et conformité RGPD/SOC2" status="active" />
            <OfferList text="Automatisation avancée avec Webhooks et audits" status="active" />
            <OfferList text="Follow-up by email and automatic reminders." status="active" /> 
            <OfferList text="Granular access management: Roles and permissions (multi-user)." status="active" /> 
            <OfferList text="Exportable data (CSV, Excel) and personalized dashboards." status="active" />
            <OfferList text="Automatic backups and long-term archiving of generated documents (legal and historical requirements)." status="active" /> 
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
