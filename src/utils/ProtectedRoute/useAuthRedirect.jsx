import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'; // Import navigate hook

const useAuthRedirect = () => {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.user.user.userData); // Get user data from redux
  const token = useSelector((state) => state.user.user.token); // Get token from redux
  const userRole = useSelector((state) => state.user.user.userRole); // Get user role from redux
  // Check if the token is loaded, and if not, wait for it to be set
  if (token === null) {
    return null; // Return null if the token is not yet loaded
  }

  // Redirect to login if token is missing or if userData is not available
  if (!token || !userData) {
    console.log("Redirecting to login because token or user data is missing");
    navigate("/login");
    return null; // Don't render anything while redirecting
  }

  // Handle redirection based on the user role
  if (userData.type === 'ADMIN') {
    // If the user is an admin, ensure they're on the admin page
    
    //navigate("/admin");
    return null; // Don't render anything while redirecting
  }
  
  if (userData.type === 'USER') {
    // If the user is a regular user, ensure they're on the user page
    //console.log("Redirecting to user page");
    //navigate("/user");
    return null; // Don't render anything while redirecting
  }

  // If no valid role is found, redirect to login
  if(!userRole){
    console.log("Invalid user role or not authenticated");
    navigate("/login");
    return null; // Don't render anything while redirecting
  }
  
};

export default useAuthRedirect;
