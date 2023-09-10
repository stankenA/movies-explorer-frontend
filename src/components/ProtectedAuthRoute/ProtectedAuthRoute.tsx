import React, { FC } from 'react';
import { Navigate } from "react-router-dom";
import { TProtectedRouteProps } from '../../utils/types/types';

const ProtectedAuthRoute: FC<TProtectedRouteProps> = ({ element: Component, ...props }) => {
  return (
    props.loggedIn ? <Navigate to="/" replace /> : <Component {...props} />
  )
};

export default ProtectedAuthRoute;
