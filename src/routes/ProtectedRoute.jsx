import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, role }) => {
  const token = localStorage.getItem('pgUserToken');
  const userRole = localStorage.getItem('pgUserRole');

  if (!token) return <Navigate to="/login" replace />;
  if (role && userRole !== role) return <Navigate to="/login" replace />;

  return children;
};

export default ProtectedRoute;
