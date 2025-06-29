import React from 'react';
import "@fontsource/inter";
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Courses from './pages/Courses';
import Testimonials from './pages/Testimonials';
import Course from './pages/Course';
import OAuthCallback from './pages/OAuthCallback'; // ✅ Graphy SSO Callback
import ProtectedRoute from './components/ProtectedRoute'; // ✅ Route Guard
import LoginPage from './pages/LoginPage'; // ✅ Full-page modal wrapper

// Nested components
import Videos from './components/CourseComponents/Videos';
import StudRev from './components/CourseComponents/StudRev';

const App = () => {
  return (
    <div className=''>
      {/* 🔝 Fixed Header */}
      <div className='fixed top-0 left-0 w-full z-50 bg-black sm:bg-none'>
        <Header />
      </div>

      {/* 📄 Page Body */}
      <div className='mt-20 sm:h-[90vh] overflow-auto scrollbar-hidden'>
        <Routes>
          <Route path='/' element={<Home />} />

          {/* 🔐 Protected Courses Page */}
          <Route
            path='/courses'
            element={
              <ProtectedRoute>
                <Courses />
              </ProtectedRoute>
            }
          />

          <Route path='/testimonials' element={<Testimonials />} />

          {/* 📚 Course Page with Nested Routes */}
          <Route path='/course/:id' element={<Course />}>
            <Route index element={<Videos />} />
            <Route path='review' element={<StudRev />} />
          </Route>

          {/* 🔁 Graphy OAuth Callback Route */}
          <Route path='/oauth-callback' element={<OAuthCallback />} />

          {/* 🔐 Login & Signup Routes for Graphy SSO */}
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<LoginPage />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
