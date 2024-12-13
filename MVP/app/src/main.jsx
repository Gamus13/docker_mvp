import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppContext from './utils/Context.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { PdfProvider } from './contexts/PdfContext.jsx';
// import { ToastContainer, toast } from 'react-toastify';
import { ToastProvider } from './contexts/ToastContext';
import 'react-toastify/dist/ReactToastify.css';
import { VisibilityProvider } from './contexts/VisibilityContext.jsx';
import { UploadProvider } from './contexts/UploadContext.jsx';

const clientId = '1069436410892-pknlg3609jhvb823j3m8rbbu9eltre81.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <PdfProvider>
          <AppContext>
            <UploadProvider>
              <VisibilityProvider>
                <ToastProvider>
                  <StrictMode>
                    <App />
                  </StrictMode>
                </ToastProvider>
              </VisibilityProvider>
            </UploadProvider>
          </AppContext>
        </PdfProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </AuthProvider>
  
  
)
