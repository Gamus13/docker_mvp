import React from 'react'
import Header from './Header/Nav';
import Footer from './Footer';

import SigninPage from '../app/signin/page';
import Header2 from './Header/Nav2';
import Footer2 from './Footer2';



function AuthentificationList() {
    return (
        <>
            <Header2/>
            <SigninPage/>
            <Footer2/>
        </>
    );
};

export default AuthentificationList
