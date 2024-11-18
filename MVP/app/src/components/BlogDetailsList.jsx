import React from 'react'
// import Blog from './Blog';
import Header from './Header/Nav';
import Footer from './Footer';
import BlogDetailsPage from '../app/blog-details/page';



function BlogDetailsList() {
    return (
        <>
            <Header/>
            <BlogDetailsPage/>
            <Footer/>
        </>
    );
};

export default BlogDetailsList
