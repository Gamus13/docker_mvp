import React from 'react';
import Footer from './Footer';
import Pricing from './Pricing/Price';
import Header from './Header';

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
