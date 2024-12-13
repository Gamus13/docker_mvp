import React from 'react'
import LandingPage from '../components/Video'
import HowItWorks from '../components/FeaturesProcess'
import BeautifulWorks from '../section/BeautifulWorks'
import Pricing from '../components/Pricing/Price'
import Faq from '../components/FAQ'
import ScrollToTop from '../components/ScrollToTop'
import Contact from '../components/Contact'
import CTA from '../components/About/CTA'
import Footer from '../components/Footer'
import HowItWorks2 from '../components/FeaturesProcess2'
import Header from '../components/Header'

function WebsiteSeo() {
    return (
        <>
        <Header/>
        <LandingPage/>
        <HowItWorks2/>
        <BeautifulWorks/>
        <Pricing/>
        <Faq/>
        <ScrollToTop/>
        <Contact/>
        <CTA/>
        <Footer/>
        </>
    )
}

export default WebsiteSeo
