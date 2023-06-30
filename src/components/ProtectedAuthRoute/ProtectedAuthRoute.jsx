import React from 'react';
import { Navigate } from "react-router-dom";

export default function ProtectedAuthRoute({ element: Component, ...props }) {
  return (
    props.loggedIn ? <Navigate to="/" replace /> : <Component {...props} />
  )
}
