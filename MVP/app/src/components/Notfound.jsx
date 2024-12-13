import React from 'react'
// import Blog from './Blog';
import Header from './Header/Nav';
import Footer from './Footer';
import ErrorPage from '../app/error/page';



function Notfound() {
    return (
        <>
            <Header/>
            <ErrorPage/>
            <Footer/>
        </>
    );
};

export default Notfound;
