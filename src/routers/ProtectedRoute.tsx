import React, { FC, useContext } from 'react'
import { Navigate, RouteProps,Route, RouterProps } from 'react-router-dom'


export type ProtectedRouteProps = {
    isAuthenticated: boolean;
    authenticationPath: string;
    outlet: JSX.Element;
  };
  
  const  ProtectedRoute = ({isAuthenticated, authenticationPath, outlet}: ProtectedRouteProps) => {
    if(isAuthenticated) {
      return outlet;
    } else {
      return <Navigate to={{ pathname: authenticationPath }} />;
    }
  };
  
export default ProtectedRoute;
