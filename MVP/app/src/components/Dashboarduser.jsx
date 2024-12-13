// src/components/DashboardUser.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Library from './Library';
import HeaderUser from './Headeruser';

function DashboardUser() {
    return (
        <div className="flex h-screen">
            {/* Sidebar et Library */}
            <div className="hidden md:flex flex-col w-1/5 bg-gray-800">
                <Sidebar />
                <Library />
            </div>
        
            {/* Contenu dynamique */}
            <div className="flex-1 overflow-y-auto">
                <HeaderUser/>
                
                <Outlet /> {/* Affiche le composant en fonction de la route */}
            </div>
        </div>
    );
}

export default DashboardUser;
