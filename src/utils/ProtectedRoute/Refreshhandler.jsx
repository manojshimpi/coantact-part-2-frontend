import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Refreshhandler({ setIsAuthenticated }) {
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        //console.log(location.pathname)
        const token = localStorage.getItem('token'); // ✅ Directly retrieve token as a string

        if (token) {
            setIsAuthenticated(true);
            if (location.pathname === '/' || location.pathname === '/login') {
                navigate('/user', { replace: false });
            }
        }
    }, [navigate, location, setIsAuthenticated]);

    return null;
}

export default Refreshhandler;
