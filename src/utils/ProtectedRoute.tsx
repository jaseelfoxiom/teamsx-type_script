import React from 'react';
import { Navigate, useLocation, RouteProps } from 'react-router-dom';

// Define the prop types
interface ProtectedRouteProps extends Omit<RouteProps, 'component'> {
  component: React.ComponentType<any>; // The component to render when the route is accessible
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ component: Component, ...rest }) => {
  const isAuthenticated = localStorage.getItem('token');
  const location = useLocation();

  return isAuthenticated ? <Component {...rest} /> : <Navigate to="/login" state={{ from: location }} />;
};

export default ProtectedRoute;
