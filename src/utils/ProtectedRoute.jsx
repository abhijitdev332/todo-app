import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("session");
  return session == "active" ? children : <Navigate to={"/"} />;
};

const UserProtected = ({ children }) => {
  const session = localStorage.getItem("session");
  return session == "active" ? <Navigate to={"/home"} /> : children;
};
export { ProtectedRoute, UserProtected };
