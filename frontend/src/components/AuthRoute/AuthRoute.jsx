// import React from "react";
// import Login from "../User/Login";
// import { useQuery } from "@tanstack/react-query";
// import { checkAuthStatusAPI } from "../../APIServices/users/usersAPI";
// import { Navigate } from "react-router-dom";
// import AuthCheckingComponent from "../Templates/AuthCheckingComponent";

// const AuthRoute = ({ children }) => {
//   const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
//     queryKey: ["user-auth"],
//     queryFn: checkAuthStatusAPI,
//   });

//   //for loading
//   if (isLoading) return <AuthCheckingComponent />;
//   //in case a user is not login
//   if (!data) {
//     return <Navigate to="/login" />;
//   }
//   //render
//   return children;
// };

// export default AuthRoute;



import React from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatusAPI } from "../../APIServices/users/usersAPI";
import { Navigate } from "react-router-dom";
import AuthCheckingComponent from "../Templates/AuthCheckingComponent";

const AuthRoute = ({ children, allowedRoles }) => {
  const { isLoading, data } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });

  if (isLoading) return <AuthCheckingComponent />;
  if (!data) return <Navigate to="/login" />;

  const userRole = data?.role; 
  console.log(userRole)
  console.log(allowedRoles.includes(userRole))
  if (!allowedRoles.includes(userRole)) {
    return <Navigate to="/unauthorize" />; 
  }

  return children;
};

export default AuthRoute;

