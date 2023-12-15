import React from "react";
import { Navigate, useLocation } from "react-router-dom";
function PrivateAdminRoute({ children }) {
  let isAdmin = JSON.parse(sessionStorage.getItem("loggedInUser"));
  let location = useLocation();
  return isAdmin?.role === "ADMIN" ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
export default PrivateAdminRoute;
