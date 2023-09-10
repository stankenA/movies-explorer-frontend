import React, { FC } from 'react';
import { Navigate } from "react-router-dom";
import { TProtectedRouteProps } from '../../utils/types/types';

const ProtectedRoute: FC<TProtectedRouteProps> = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Component {...props} /> : <Navigate to="/" replace />
  )
};

export default ProtectedRoute;
