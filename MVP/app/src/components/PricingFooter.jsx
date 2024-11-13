import React from 'react';
import Header from './Header/Nav';
import Footer from './Footer';
import Pricing from './Pricing/Price';

function PricingFooter() {
    return (
        <>
            <Header />
            <div className="relative flex items-center justify-center min-h-screen" style={{ top: '100px' }}>
                <Pricing />
            </div>
            <Footer />
        </>
    );
}

export default PricingFooter;
