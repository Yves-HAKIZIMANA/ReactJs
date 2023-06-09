import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const PrivateRoutes = () => {
  const { auth } = useAuth();
  if (auth === undefined) return 'loading..........';
  return auth === true ? <Outlet /> : <Navigate to="/auth" />;
};

export default PrivateRoutes;
