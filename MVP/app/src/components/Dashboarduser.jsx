// import React from 'react'
// import HomeUser from '../app/HomeUser'
// import Library from './Library'
// import Sidebar from './Sidebar'

// function Dashboarduser() {
//     return (
//         <>
//         <HomeUser/>
//         <Sidebar/>
//         <Library/>
//         </>
//     )
// }

// export default Dashboarduser
import React from 'react';
import HomeUser from '../app/HomeUser';
import Library from './Library';
import Sidebar from './Sidebar';

function DashboardUser() {
    return (
        <div className="flex h-screen">
            {/* Sidebar et Library */}
            <div className="hidden md:flex flex-col w-1/4 bg-gray-800">
                <Sidebar />
                <Library />
            </div>

            {/* HomeUser */}
            <div className="flex-1 overflow-y-auto">
                <HomeUser />
            </div>

        </div>
    );
}

export default DashboardUser;
