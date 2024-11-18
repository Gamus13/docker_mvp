import React from 'react'
// import Blog from './Blog';
import Blog from '../app/blog/page'; 
import Header from './Header/Nav';
import Footer from './Footer';



function BlogList() {
    return (
        <>
            <Header/>
            <Blog/>
            <Footer/>
        </>
    );
};

export default BlogList
