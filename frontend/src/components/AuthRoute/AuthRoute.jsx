import React from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatusAPI } from "../../APIServices/users/usersAPI";
import { Navigate } from "react-router-dom";
import AuthCheckingComponent from "../Templates/AuthCheckingComponent";

const AuthRoute = ({ children, allowedRoles }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
    refetchOnWindowFocus: true, 
  });

  if (isLoading) return <AuthCheckingComponent />;

  // If the user is not authenticated, redirect to login
  if (!data) return <Navigate to="/login" />;

  // Check if the user's role is allowed
  const userRole = data?.role;
  // if (!allowedRoles.includes(userRole)) {
  //   return <Navigate to="/unauthorize" />;
  // }

  return children;
};

export default AuthRoute;