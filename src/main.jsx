import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import CourseContextProvider from './context/CourseContextProvider.jsx';
import { AuthProvider } from './context/AuthContext.jsx'; // ✅ Import this

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AuthProvider> {/* ✅ Wrap app with AuthProvider */}
      <CourseContextProvider>
        <App />
      </CourseContextProvider>
    </AuthProvider>
  </BrowserRouter>
);
