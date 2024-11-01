import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { ThemeProvider } from './contexts/ThemeContext';
import { AuthProvider } from './contexts/AuthContext.jsx';
import AppContext from './utils/Context.jsx';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { UploadProvider } from './UploadContext.jsx';
import { PdfProvider } from './contexts/PdfContext.jsx';

const clientId = '1069436410892-pknlg3609jhvb823j3m8rbbu9eltre81.apps.googleusercontent.com';

createRoot(document.getElementById('root')).render(
  
  <AuthProvider>
    <ThemeProvider>
      <GoogleOAuthProvider clientId={clientId}>
        <PdfProvider>
          <AppContext>
            <UploadProvider>
              <StrictMode>
                <App />
              </StrictMode>
            </UploadProvider>
          </AppContext>
        </PdfProvider>
      </GoogleOAuthProvider>
    </ThemeProvider>
  </AuthProvider>
  
  
)
