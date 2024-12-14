import React from 'react'
import Footer from './Footer';

import SigninPage from '../app/signin/page';
import Footer2 from './Footer2';
import Header from './Header';
import SignIn from './SignIn';
import GoogleCallback from './GoogleCallback';



function AuthentificationList() {
    return (
        <>
            <Header/>
            <SigninPage/>
            {/* <SignIn/> */}
            <Footer2/>
        </>
    );
};

export default AuthentificationList
