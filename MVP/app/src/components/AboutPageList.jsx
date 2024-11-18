import React from 'react'
// import Blog from './Blog';
import Header from './Header/Nav';
import Footer from './Footer';
import BlogDetailsPage from '../app/blog-details/page';
import AboutPage from '../app/about/page';



function AboutPageList() {
    return (
        <>
            <Header/>
            <AboutPage/>
            <Footer/>
        </>
    );
};

export default AboutPageList
