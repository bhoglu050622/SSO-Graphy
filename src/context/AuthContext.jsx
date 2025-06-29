import React, { createContext, useContext, useEffect, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem('graphyToken'));
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const decodeToken = (token) => {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      console.warn('Invalid token');
      return null;
    }
  };

  useEffect(() => {
    if (token) {
      const userData = decodeToken(token);
      if (userData) {
        const email = userData.email || "";

        // ✅ Custom roles and plan parsing
        const isAdmin = email.includes("admin") || email.endsWith("@shikshanam.in");
        const role = userData.role || "learner";
        const plan = userData.plan || "free";

        userData.isAdmin = isAdmin;
        userData.role = role;
        userData.plan = plan;

        setUser(userData);
      } else {
        setUser(null);
      }
    } else {
      setUser(null);
    }
    setLoading(false);
  }, [token]);

  const login = (newToken) => {
    localStorage.setItem('graphyToken', newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem('graphyToken');
    setToken(null);
    setUser(null);

    const redirectUrl = `${import.meta.env.VITE_FRONTEND_BASE_URL || window.location.origin}`;
    const logoutUrl = `https://sso.graphy.com/v2/logout?redirect_uri=${encodeURIComponent(redirectUrl)}`;
    window.location.href = logoutUrl;
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
