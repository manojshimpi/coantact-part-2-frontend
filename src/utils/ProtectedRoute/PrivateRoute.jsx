import { Navigate } from 'react-router-dom';  // Import Navigate for redirection
import useAuthRedirect from './useAuthRedirect';

const PrivateRoute = ({ children }) => {
  const redirectResult = useAuthRedirect(); // This handles redirection

  // If the hook returns Navigate, it will handle the redirect
  if (redirectResult) {
    return redirectResult;
  }

  // If the user is authenticated and valid, render the protected content
  return children;
};

export default PrivateRoute;
