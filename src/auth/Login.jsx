import React, { useEffect, useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik'; 
import * as Yup from 'yup'; // Import Yup for validation
import '../App.css';
import { useDispatch, useSelector } from 'react-redux';
import { postLoginData } from '../store/userSlice/userActions';
import { toast } from 'react-toastify';
import { clearUserData } from '../store/userSlice/userSlice';
import { useGoogleAuth } from '../utils/GoogleAuth/googleAuth';
import logo from '../assets/logo5.png'



function Login() {
  const [hasRedirected, setHasRedirected] = useState(false); // Track if redirection has already occurred
  const token = localStorage.getItem('token'); // Get the token from localStorage
  const userRole = localStorage.getItem('userRole'); // Get the user role from localStorage


  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user);
  const { status } = userData;  // Extract token from Redux state

  // Validation schema with Yup
  const validationSchema = Yup.object({
    email: Yup.string().email("Please Enter Valid Email ID").required('Username is required'),
    password: Yup.string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters')
  });

  // Initial values for the form
  const initialValues = {
    email: 'manoj@gmail.com',
    password: '123456'
  };

  // Submit handler for the form
  const onSubmit = (values, { setSubmitting ,resetForm}) => {
    // Dispatch login action
    dispatch(postLoginData(values));
    resetForm();
  };

  // Use global Google authentication function
  const googleLogin = useGoogleAuth(
    (user, token) => {
      console.log('🎉 User Logged In:', user);
      navigate('/user/dashboard'); // Redirect after success
    },
    (error) => {
      console.error('❌ Login Failed:', error);
    }
  );

  useEffect(() => {
    if (token && !hasRedirected) {
      // If the token exists and redirection hasn't occurred yet

      if (userRole === 'ADMIN') {
        // If the user is an ADMIN, redirect to /admin
        navigate('/admin/dashboard');
        toast.success("Logged in as Admin");
      } else {
        // If the user is not an ADMIN (i.e., USER), redirect to /user
        navigate('/user/dashboard');
        toast.success("Login Successfully");
      }
     // After redirection, set hasRedirected to true so it doesn't happen again
      setHasRedirected(true);
    } else if (!token) {
      // Handle when token is missing (this ensures toast doesn't show after logout)
      dispatch(clearUserData());
      navigate('/login'); // Redirect to login if the token is not available
    }
  }, [token, userRole, navigate, dispatch, hasRedirected]);
  // Redirect if the token is already present
 /* useEffect(() => {
    if (token) {
      // token exists, proceed with the login success logic
      navigate('/user'); // Redirect to /user if token exists
      toast.success("Login Successfully");
    } else {
      // Handle when token is missing (this ensures toast doesn't show after logout)
      dispatch(clearUserData());
    }
  }, [token, navigate, dispatch]);*/

  return (
    <>
      <div className="login-background">
        <main>
          <div className="container">
            <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                    <div className="d-flex justify-content-center py-4">
                    <img className="" src={logo}  style={{height:'auto', width:"400px"}}/>
                    </div>
                     
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="pt-4 pb-2">
                          <h5 className="card-title text-center pb-0 fs-4">Login to Your Account</h5>
                          <p className="text-center small">Enter your email Id &amp; password to login</p>
                        </div>

                        {/* Formik Form */}
                        <Formik
                          initialValues={initialValues}
                          validationSchema={validationSchema}
                          onSubmit={onSubmit}
                        >
                          {({ touched, errors }) => (
                            <Form className="row g-3 needs-validation">
                              <div className="col-12">
                                <label htmlFor="email" className="form-label">Email ID</label>
                                <div className="input-group has-validation">
                                  <span className="input-group-text" id="inputGroupPrepend">@</span>
                                  <Field 
                                    type="text" 
                                    name="email" 
                                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                    id="email"
                                  />
                                  <div className="invalid-feedback">
                                    <ErrorMessage name="email" />
                                  </div>
                                </div>
                              </div>
                              <div className="col-12">
                                <label htmlFor="password" className="form-label">Password</label>
                                <Field 
                                  type="password" 
                                  name="password" 
                                  className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                  id="password"
                                />
                                <div className="invalid-feedback">
                                  <ErrorMessage name="password" />
                                </div>
                              </div>
                              <div className="col-12">
                                <div className="form-check">
                                  <Field 
                                    className="form-check-input" 
                                    type="checkbox" 
                                    name="remember" 
                                    id="rememberMe" 
                                  />
                                  <label className="form-check-label" htmlFor="rememberMe">Remember me</label>
                                </div>
                              </div>
                              <div className="col-12">
                                <button className="btn btn-primary w-100" type="submit">Login</button>
                              </div>
                              <div className="col-12">
                                <p className="small mb-0">Don't have an account? <NavLink to="/register">Create an account</NavLink></p>
                              </div>
                            </Form>
                          )}
                        </Formik>

                      </div>
                    </div>

                    {/* Google Login Button */}
                    <div className="col-12 mt-0">
                      <button 
                        onClick={googleLogin} 
                        className="btn btn-google w-100 d-flex justify-content-center align-items-center p-3 border rounded-4 shadow-lg"
                      >
                        <i className="fab fa-google me-3" style={{ fontSize: '24px' }}></i>
                        <span className="text-white fs-5 fw-semibold">Login with Google</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main> {/* End #main */}
        <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
          <i className="bi bi-arrow-up-short" />
        </a>
      </div>
    </>
  );
}

export default Login;
