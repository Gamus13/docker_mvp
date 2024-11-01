import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Features from './pages/Features';
import Editpdf from './components/editpdf';
import Website from './pages/website';
import RegisteList from './components/RegisteList';
import AuthentificationList from './components/AuthentificationList';
import Notfound from './components/Notfound';
import Home from './pages/Home';
import Profile from './components/Profile';
import DefaultLayout from './components/ProtectedLayout';
import PrivateRoute from './components/PrivateRoute';
import GuestLayout from './components/GuestLayout';
import HeaderUser from './components/Headeruser';
// import Sidebar from './components/Sidebar';
import HomeUser from './app/HomeUser';
import Dashboarduser from './components/Dashboarduser';
import Layout from './components/Shared/Layout';
import Dashboard from './pages/Dashboard';
import AdminBlog from './components/Admin/AdminBlog';
import DashboardUser from './components/Dashboarduser';

const router = createBrowserRouter([

  {
		path: '/',
		element: <GuestLayout />,
		children: [
			{
        path: '/app',
        element: <Website />, 
      },
      {
        path: '/app/edit',
        element: <Editpdf />, 
      },
      {
        path: '/app/auth/signin',
        element: <RegisteList/>,
      },
      {
        path: '/app/auth/signup',
        element: <AuthentificationList />,
      },
      
    ],
  },

  // {
  //   path: '/app/dashboard',
  //   element: <Dashboarduser/>,
  // },

  {
		path: '/app/admin',
		element: <Layout/>,
		children: [
		{
			path: '/app/admin/dashboard',
			element: <Dashboard />,
		},
		{
			path: '/app/admin/blog',
			element: <AdminBlog/>
		},
		
		],
	},

  // {
  //   path: '/app/profile',
  //   element: <Profile />, 
  // },
  {
		path: '/',  
		element: <DefaultLayout />,
		children: [
			{
        path: '/app/profile',
        element: <DashboardUser />, 
      },
      {
        path: '/app/generate',    
        element: <Home/>,
      },
    ],
  },
  
  {
		path: '*',
		element: <Notfound/>,
    },
  
]);

const Router = () => (
  <RouterProvider router={router} />
);

export default Router;
