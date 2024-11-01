import React from 'react'
import { Outlet, Link } from 'react-router-dom'
import Sidebar from './Sidebar'
import Header from './Headers'
import Dashboard from '../../pages/Dashboard'

export default function Layout() {
	return (
		<div className="bg-neutral-100 h-screen w-screen overflow-hidden flex flex-row">
			<Sidebar />
			<div className="flex flex-col flex-1">
				<Header />
				<div className="flex-1 p-4 min-h-0 overflow-auto">
					{/* <Dashboard /> */}
					<Outlet/>
				</div>
			</div>
		</div>
	)
}
