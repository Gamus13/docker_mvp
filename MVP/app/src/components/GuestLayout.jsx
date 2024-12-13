// import React from 'react';
// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuth } from '../contexts/AuthContext';

// export default function GuestLayout() {
// 	const { user } = useAuth();

// 	// if user is logged in, redirect to profile page
// 	if (user) {
// 		return <Navigate to="/admin" />;
// 	}
// 	return (
// 		<>
// 			<Outlet />
// 		</>
// 	);
// }


import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function GuestLayout() {
  const { user, role } = useAuth();

  // Rediriger en fonction du rôle de l'utilisateur
  if (user) {
    if (role === 'admin') {
      return <Navigate to="/admin" />;
    } else {
      return <Navigate to="/app/profile" />;
    }
  }
  
  return (
    <>
      <Outlet />
    </>
  );
}
