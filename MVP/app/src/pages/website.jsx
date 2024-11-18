// import React from 'react'
// import Header from '../components/Header/Nav'
// import LandingPage from '../components/Video'
// import HowItWorks from '../components/FeaturesProcess'
// import BeautifulWorks from '../section/BeautifulWorks'
// import Footer from '../components/Footer'
// import Faq from '../components/FAQ'
// import ScrollToTop from '../components/ScrollToTop'
// import CTA from '../components/About/CTA'
// import Contact from '../components/Contact'
// import Pricing from '../components/Pricing/Price'

// function Website() {
//     return (
//         <>
        
//         <Header/>
//         <LandingPage/>
//         <HowItWorks/>
//         <BeautifulWorks/>
//         <Pricing/>
//         <Faq/>
//         <ScrollToTop/>
//         <Contact/>
//         <CTA/>
//         <Footer/>
//         </>
//     )
// }

// export default Website
import React from 'react';
import Header from '../components/Header/Nav';
import LandingPage from '../components/Video';
import HowItWorks from '../components/FeaturesProcess';
import BeautifulWorks from '../section/BeautifulWorks';
import Footer from '../components/Footer';
import Faq from '../components/FAQ';
import ScrollToTop from '../components/ScrollToTop';
import CTA from '../components/About/CTA';
import Contact from '../components/Contact';
import Pricing from '../components/Pricing/Price';

// function Website() {
//     return (
//         <>
//             <Header />
//             <div id="landing-page"><LandingPage /></div>
//             <div id="how-it-works"><HowItWorks /></div>
//             <div id="beautiful-works"><BeautifulWorks /></div>
//             <div id="pricing"><Pricing /></div>
//             <div id="faq"><Faq /></div>
//             <ScrollToTop />
//             <div id="contact"><Contact /></div>
//             <CTA />
//             <Footer />
//         </>
//     );
// }

// export default Website;

function Website() {
    return (
      <>
        <Header />
        <LandingPage id="landingPage" />
        <HowItWorks id="howItWorks" />
        <BeautifulWorks id="beautifulWorks" />
        <Pricing id="pricing" />
        <Faq id="faq" />
        <Contact id="contact" />
        <CTA />
        <Footer />
      </>
    );
  }
  
  export default Website;
  