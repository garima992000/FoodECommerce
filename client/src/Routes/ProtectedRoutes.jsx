import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const ProtectedRoutes = ({allowedRoles,children}) => {
  const { isAuthenticated, role } = useSelector((state) => state.auth);
  if (!isAuthenticated) {
    return <Navigate to='/login' replace/>
  } 
  if(allowedRoles && !allowedRoles.includes(role)){
    return <Navigate to='/' replace/>
  }
  return children;
};

export default ProtectedRoutes;
