import React from "react";
import { Navigate, useLocation } from "react-router-dom";

function PrivateCourierRoute({ children }) {
  let isCourier = JSON.parse(sessionStorage.getItem("loggedInUser"));
  let location = useLocation();

  return isCourier?.role === "COURIER" ? (
    children
  ) : (
    <Navigate to="/" state={{ from: location }} replace />
  );
}
export default PrivateCourierRoute;
