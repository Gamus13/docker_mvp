import React from 'react'
// import Blog from './Blog';
import Blog from '../app/blog/page'; 
import Footer from './Footer';
import Header from './Header';



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
