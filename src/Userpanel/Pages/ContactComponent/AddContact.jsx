import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addContact, fetchContacts } from '../../../store/userSlice/actionContact';
import './addContact.css';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { isValidPhoneNumber } from 'react-phone-number-input';
import { parsePhoneNumber } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';

function Addcontact() {
  const dispatch = useDispatch();
  const statusCheck = useSelector((state) => state.user.contact.error);

  useEffect(() => {  
    dispatch(fetchContacts());
  }, [dispatch]);

  // Initialize form values
  const initialValues = {
    name: '',
    email: '',
    category: '',
    phoneNumber: '',
    countryName: '',
    countryCode: '',
    dialCode: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter full name!'),
    email: Yup.string().email('Please enter a valid Email address!').required('Please enter email ID!'),
    category: Yup.string().required('Please select a category!'),
    phoneNumber: Yup.string()
      .required('Mobile number is required')
      .test('is-valid-phone', 'Please enter a valid mobile number with country code', (value) => {
        return value ? isValidPhoneNumber(value) : false;
      }),
  });

  const handleSubmit = (values, { resetForm }) => {

    console.log("🎉 Form Submitted", JSON.stringify(values,null,2));

    dispatch(addContact(values))
      .then((action) => {
        if (action.payload && action.payload.status === '201') {
          resetForm(); // Reset the form if the status is 201
        }
      })
      .catch((error) => {
        console.error("Error during form submission:", error);
      });
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
    <div className="card shadow-lg my-5 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <h5 className="card-title text-center mb-4 text-uppercase font-weight-bold">Add Contact</h5>

        {/* Vertical Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors, values, setFieldValue }) => (
            <Form className="row g-3">
              {/* Left Gap (2 columns) */}
              <div className="col-md-2"></div>

              {/* Form Fields (Center) */}
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="inputName" className="form-label form-label-custom">Full Name</label>
                  <Field
                    type="text"
                    name="name"
                    className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                    id="inputName"
                    placeholder="Enter your full name"
                  />
                  <ErrorMessage name="name" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="inputEmail" className="form-label form-label-custom">Email ID</label>
                  <Field
                    type="text"
                    name="email"
                    className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                    id="inputEmail"
                    placeholder="Enter your email ID"
                  />
                  <ErrorMessage name="email" component="div" className="invalid-feedback" />
                </div>

                <div className="mb-3">
                  <label htmlFor="phoneNumber" className="form-label form-label-custom">Mobile</label>
                  <Field name="phoneNumber">
                    {({ field, form, touched, errors }) => (
                      <div>
                        <PhoneInput
                          {...field}
                          international
                          defaultCountry="IN"
                          value={values.phoneNumber}
                          // className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'is-invalid' : ''}`}
                          onChange={(value) => {
                            setFieldValue('phoneNumber', value);
                            handlePhoneChange(value, setFieldValue);
                          }}
                          placeholder="Enter Mobile Number"
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

                <div className="mb-3">
                  <label htmlFor="inputCategory" className="form-label form-label-custom">Category</label>
                  <Field
                    as="select"
                    name="category"
                    className={`form-control ${touched.category && errors.category ? 'is-invalid' : ''}`}
                    id="inputCategory"
                  >
                    <option value="">Select Category</option>
                    <option value="Family">Family</option>
                    <option value="Friends">Friends</option>
                    <option value="Colleagues">Colleagues</option>
                  </Field>
                  <ErrorMessage name="category" component="div" className="invalid-feedback" />
                </div>

                {/* Submit Button */}
                <div className="d-flex justify-content-center">
                  <button
                    type="submit"
                    className="btn btn-primary mt-3 mb-3 gradient-custom shadow-sm"
                    style={{ width: '50%' }}
                  >
                    Submit
                  </button>
                </div>
              </div>

              {/* Right Gap (2 columns) */}
              <div className="col-md-2"></div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Addcontact;
