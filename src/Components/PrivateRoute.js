import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
function PrivateRoute({ children }) {
  let isAuth = sessionStorage.getItem('accessToken') != null;
  let location = useLocation();
  return isAuth
    ? children
    : <Navigate to='/login' state={{ from: location }} replace />;
}
export default PrivateRoute;