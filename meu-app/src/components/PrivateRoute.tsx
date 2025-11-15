// Rota Privada
import React from "react";
import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

interface Props {
  children: React.ReactNode;
}

const PrivateRoute: React.FC<Props> = ({ children }) => {
  const user = auth.currentUser || localStorage.getItem("user");

  return user ? <>{children}</> : <Navigate to="/" />;
};

export default PrivateRoute;
