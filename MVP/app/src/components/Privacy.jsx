import React from 'react'
import Footer from './Footer'
import ConditionUse from './conditionUse'
import Header from './Header'

function Privacy() {
    return (
        <>
            <Header />
            {/* Conteneur principal qui gère le centrage du contenu */}
            <div className="flex items-center justify-center min-h-screen p-4 bg-white">
                <div className="w-full max-w-2xl px-4 py-8 space-y-6">
                    <ConditionUse />
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Privacy
