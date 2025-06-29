import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { token, loading } = useAuth();
  const location = useLocation();

  if (loading) return <div className="text-center p-4">Loading...</div>;

  if (!token) {
    const encodedRedirect = encodeURIComponent(location.pathname);
    return <Navigate to={`/login?returnurl=${encodedRedirect}`} />;
  }

  return children;
};

export default ProtectedRoute;
