import React from "react";
import { Navigate } from "react-router-dom";
// protect from home route
const ProtectedRoute = ({ children }) => {
  const session = sessionStorage.getItem("session");
  // if session active then access to children or navigate to auth
  return session == "active" ? children : <Navigate to={"/"} />;
};
// protect from auth route
const UserProtected = ({ children }) => {
  const session = sessionStorage.getItem("session");
  // if session is active navigate to home
  return session == "active" ? <Navigate to={"/home"} /> : children;
};
export { ProtectedRoute, UserProtected };
