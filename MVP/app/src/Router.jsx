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
import TopicPage from './components/TopicPage';
import WebsiteSeo from './pages/WebsiteSeo';
import Contact from './components/Contact'; 
import Contact2 from './components/Contact/index2';
import SubscriptionPage from './components/CheckoutForm';
import Pricing from './components/CheckoutForm';
import ProfilePage from './components/ProfilePage';
import Privacy from './components/Privacy';
import TOS from './components/TOS';
import PricingFooter from './components/PricingFooter';
import ContactLink from './components/ContactLink';
import BlogList from './components/BlogList';
import AboutPageList from './components/AboutPageList';
import BlogDetailsList from './components/BlogDetailsList';
import Card from './components/Card';
import HowItWorks from './components/HowItWorks';
import Faqnav from './components/Faqnav';
import Template from './components/Template';
import UserGreeting from './components/UserGreeting';
import GoogleCallback from './components/GoogleCallback';

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
        path: '/app/TOS',
        element: <TOS />, 
      },
      {
        path: '/app/Privacy Policy',
        element: <Privacy />, 
      },
      {
        path: '/app/contact',
        element: <ContactLink />, 
      },
      {
        path: '/app/pricing',
        element: <PricingFooter />, 
      },
      {
        path: '/app/faq',
        element: <Faqnav />, 
      },
      {
        path: '/app/howItWorks',
        element: <HowItWorks />, 
      },
      {
        path: '/app/beautifulWorks',
        element: <Template />, 
      },
      {
        path: '/app/auth/signin',
        element: <RegisteList/>,
      },
      {
        path: '/app/auth/signup',
        element: <AuthentificationList />,
      },
      {
        path: '/app/auth/google',
        element: <GoogleCallback />,
      },

      {
				path: '/app/blog',
				element: <BlogList/>,
			},
      {
				path: '/app/blog-details',
				element: <BlogDetailsList/>,
			},
      {
				path: '/app/about',
				element: <AboutPageList/>,
			},
      // Nouvelle route dynamique
      {
        path: '/app/topic/:keyword',  // Inclure "topic" dans le chemin
        element: <WebsiteSeo />,
      }

      
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
        children: [
          // route pour le dashboard user
          {
            path: '/app/profile/',    
            element: <UserGreeting/>,
          },
          {
            path: '/app/profile/home',    
            element: <HomeUser/>,
          },
          {
            path: '/app/profile/subscriptions',    
            element: <Card/>,
          },
          {
            path: '/app/profile/customer-service',    
            element: <Contact2/>,
            
          },
          {
            path: '/app/profile/status_pricing',    
            element: <Card/>,
            
          },
          
        ],
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
