import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { postRegisterData } from '../store/userSlice/userActions';
import { toast } from 'react-toastify';
import { useGoogleAuth } from '../utils/GoogleAuth/googleAuth';
import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { parsePhoneNumber } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import logo from '../assets/logo5.png'

countries.registerLocale(en);

function Register() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userdata = useSelector((state) => state.user.user);

  const { status, NormalRegisterdata, error } = userdata;

  const googleLogin = useGoogleAuth(
    (user, token) => {
      console.log("🎉 User Logged In:", user);
      navigate("/user");
    },
    (error) => {
      console.error("❌ Login Failed:", error);
    }
  );

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter full name!'),
    email: Yup.string().email('Please enter a valid Email address!').required('Please enter email ID!'),
    password: Yup.string().min(6, 'Password must be at least 6 characters!').required('Please enter your password!'),
    phoneNumber: Yup.string()
      .required('Mobile number is required')
      .test('is-valid-phone', 'Please enter a valid mobile number with country code', (value) => {
        return value ? isValidPhoneNumber(value) : false;
      }),
  });

  const handleSubmit = async (values, { resetForm }) => {
    console.log("🎉 Form Submitted", values);

    try {
      const response = await dispatch(postRegisterData(values));

      if (response.payload && response.payload.status === '201') {
        resetForm();
        toast.success("Registration successful!");
      }
    } catch (error) {
      console.error('❌ Registration Error:', error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const [countryInfo, setCountryInfo] = useState({
    countryName: '',
    countryCode: '',
    dialCode: '',
  });

  const handlePhoneChange = (value, setFieldValue) => {
    if (!value || value.length < 7 || value.length > 15) {
      setCountryInfo({
        countryName: '',
        countryCode: '',
        dialCode: '',
      });
      return;
    }

    try {
      const phoneNumber = parsePhoneNumber(value);

      if (phoneNumber) {
        const countryCode = phoneNumber.country;
        const dialCode = phoneNumber.countryCallingCode;

        const countryName = countries.getName(countryCode, 'en', { select: 'official' }) || '';

        setCountryInfo({
          countryName: countryName,
          countryCode: countryCode,
          dialCode: `+${dialCode}`,
        });

        setFieldValue('countryName', countryName);
        setFieldValue('countryCode', countryCode);
        setFieldValue('dialCode', dialCode);
      }
    } catch (error) {
      console.error('Error parsing phone number:', error);
      setCountryInfo({
        countryName: '',
        countryCode: '',
        dialCode: '',
      });
    }
  };

  return (
    <div className="register-background">
      <main>
        <div className="container">
          <section className="section register min-vh-100 d-flex flex-column align-items-center justify-content-center py-4">
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-lg-5 col-md-6 d-flex flex-column align-items-center justify-content-center">
                  <div className="d-flex justify-content-center py-4">
                   <img className="" src={logo}  style={{height:'auto', width:"400px"}}/>
                  </div>
                  <div className="card mb-0">
                    <div className="card-body">
                      <div className="pt-4 pb-2">
                        <h5 className="card-title text-center pb-0 fs-4">Create an Account</h5>
                        <p className="text-center small">Enter your personal details to create an account</p>
                      </div>
                      <Formik
                        initialValues={{
                          name: '',
                          email: '',
                          password: '',
                          phoneNumber: '',
                          countryName: '',
                          countryCode: '',
                          dialCode: '',
                        }}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                      >
                        {({ touched, errors, setFieldValue, values }) => (
                          <Form className="row g-3 needs-validation" noValidate>
                            <div className="col-12">
                              <label htmlFor="yourName" className="form-label">Full Name</label>
                              <Field
                                type="text"
                                name="name"
                                className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                                id="yourName"
                              />
                              <ErrorMessage name="name" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="yourEmail" className="form-label">Email ID</label>
                              <Field
                                type="email"
                                name="email"
                                className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                                id="yourEmail"
                              />
                              <ErrorMessage name="email" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="yourPassword" className="form-label">Password</label>
                              <Field
                                type="password"
                                name="password"
                                className={`form-control ${touched.password && errors.password ? 'is-invalid' : ''}`}
                                id="yourPassword"
                              />
                              <ErrorMessage name="password" component="div" className="invalid-feedback" />
                            </div>
                            <div className="col-12">
                              <label htmlFor="phoneNumber" className="form-label">Mobile</label>
                              <Field name="phoneNumber">
                                {({ field, form }) => (
                                  <div>
                                    <PhoneInput
                                      {...field}
                                      international
                                      defaultCountry="IN"
                                      value={values.phoneNumber}
                                      className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                                      onChange={(value) => {
                                        setFieldValue('phoneNumber', value);
                                        handlePhoneChange(value, setFieldValue);
                                      }}
                                      placeholder="Enter phone number"
                                      style={{
                                        padding: '10px',
                                        width: '100%',
                                        border: '1px solid #ccc',
                                        borderRadius: '4px',
                                        fontSize: '16px',
                                        backgroundColor: '#f9f9f9',
                                      }}
                                    />
                                    <ErrorMessage name="phoneNumber" component="div" className="error-message" />
                                  </div>
                                )}
                              </Field>
                            </div>
                            <div className="col-12">
                              <button className="btn btn-primary w-100" type="submit">
                                Create Account
                              </button>
                            </div>
                            <div className="col-12">
                              <p className="small mb-0">
                                Already have an account? <NavLink to="/login">Log in</NavLink>
                              </p>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                  <div className="col-12 mt-2">
                    <button
                      onClick={googleLogin}
                      className="btn btn-google w-100 d-flex justify-content-center align-items-center p-3 border rounded-4 shadow-lg"
                    >
                      <i className="fab fa-google me-3" style={{ fontSize: "24px" }}></i>
                      <span className="text-white fs-5 fw-semibold">Login with Google</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <a href="#" className="back-to-top d-flex align-items-center justify-content-center">
        <i className="bi bi-arrow-up-short" />
      </a>
    </div>
  );
}

export default Register;
