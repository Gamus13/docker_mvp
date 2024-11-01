import React, { useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from '../axios';
import { useAuth } from '../contexts/AuthContext';
import DashboardUser from './Dashboarduser';

export default function DefaultLayout() {
	const { user, setUser } = useAuth();	
	
	// check if user is logged in or not from server
	// useEffect(() => {
	// 	(async () => {
	// 		try {
	// 			const resp = await axios.get('/user');
	// 			if (resp.status === 200) {
	// 				setUser(resp.data.data);
	// 				console.log('User logged in:', resp.data.data);
	// 			}
	// 		} catch (error) {
	// 			if (error.response.status === 401) {
	// 				localStorage.removeItem('user');
	// 				// window.location.href = '/app/';
	// 			}
	// 		}
	// 	})();
	// }, []);
	useEffect(() => {
		(async () => {
			try {
				const resp = await axios.get('/user');
				if (resp.status === 200) {
					// Ici, resp.data est l'objet utilisateur directement
					setUser(resp.data);  // Mettez à jour l'état de l'utilisateur avec l'objet reçu
					console.log('User logged in:', resp.data);
				}
			} catch (error) {
				if (error.response && error.response.status === 401) {
					localStorage.removeItem('user');
					// Optionnel : Vous pouvez aussi gérer la redirection ici si nécessaire
					window.location.href = '/app/';
				}
			}
		})();
	}, []);
	
	// if user is not logged in, redirect to login page
	if (!user) {
		return <Navigate to="/app/" />;
	}

	
	return (
		<>
			<Outlet/>
		</>
	);
}
