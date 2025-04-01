import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from 'react-router-dom';  // <-- Add Navigate here
import Userlayout from './Userpanel/Userlayout';
import Login from './auth/Login';
import Register from './auth/Register';
import GoogleAuthWrapper from './auth/GoogleAuthWrapper';
import Refreshhandler from './utils/ProtectedRoute/Refreshhandler';
import GoogleAuthWrapperRegister from './auth/GoogleAuthWrapperRegister';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from './store/userSlice/userActions';
import { clearUserData } from './store/userSlice/userSlice';
import Adminlayout from './Adminpanel/Adminlayout';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state) => state.user.user.token); // Get the token from Redux state
  const userData = useSelector((state) => state.user.user.userData); // Get user data from Redux state
  
   // Fetch user data when the component mounts
   useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token'); // Get token from localStorage
    const currentPath = window.location.pathname;  // Get the current path
  
    if (tokenFromStorage) {
      // If there's a token, set it to Redux state
      dispatch(fetchUserData()); // Fetch user data if token exists
    } else if (currentPath !== '/register') {
      // If token doesn't exist and we are not on /register, clear the user data and navigate to login
      dispatch(clearUserData());
      navigate('/login');
    }
  }, [dispatch, navigate]);
  

 

  return (
    <>
      <Refreshhandler setIsAuthenticated={setIsAuthenticated} />
      {/* ToastContainer is used to render the notifications */}
      <ToastContainer />
      <Routes>
        <Route path="/user/*" element={<Userlayout />} />
        <Route path="/admin/*" element={<Adminlayout />} />
        <Route path="/*" element={<GoogleAuthWrapper />} />
        <Route path="/register" element={<GoogleAuthWrapperRegister />} />
      </Routes>
    </>
  );
}

export default App;
