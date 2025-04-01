import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import PhoneInput from 'react-phone-number-input';
import 'react-phone-number-input/style.css';
import { parsePhoneNumber } from 'libphonenumber-js';
import countries from 'i18n-iso-countries';
import en from 'i18n-iso-countries/langs/en.json';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { fetchContacts, getContactByuserId, updateConatcts } from '../../../store/userSlice/actionContact';
import { useLocation, useNavigate } from 'react-router-dom';


countries.registerLocale(en);

const EditContactModal = ({ contactId, handleClose, pagination, filters, sort }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);

  const { contactsingleRecord, loading, error } = useSelector((state) => state.user.contact);
  const navigate = useNavigate();
  const location = useLocation();

  const [countryInfo, setCountryInfo] = useState({
    countryName: contactsingleRecord?.countryName || '',
    countryCode: contactsingleRecord?.countryCode || '',
    dialCode: contactsingleRecord?.dialCode || '',
  });

  // Fetch contact info on mount
  useEffect(() => {
    if (contactId) {
      dispatch(getContactByuserId(contactId));
    }
  }, [dispatch, contactId]);

  // Wait until contactsingleRecord is available
  const initialValues = {
    id: contactsingleRecord?._id || '',
    name: contactsingleRecord?.name || '',
    email: contactsingleRecord?.email || '',
    category: contactsingleRecord?.category || '',
    country: contactsingleRecord.country_name || '',
    phone: contactsingleRecord?.mobile || '',
    countryName: contactsingleRecord?.countryName,
    countryCode: contactsingleRecord?.countryCode,
    dialCode: contactsingleRecord?.dialCode,
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter full name!'),
    email: Yup.string().email('Please enter a valid Email address!').required('Please enter email ID!'),
    category: Yup.string().required('Please select a category!'),
    phone: Yup.string()
      .matches(/^\+?[1-9]\d{1,14}$/, 'Phone number must be in E.164 format (e.g., +14155552671)')
      .test('is-valid-phone', 'Phone number is not valid', (value) => {
        try {
          const cleanedValue = value.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
          if (cleanedValue) {
            const phoneNumber = parsePhoneNumber(cleanedValue);
            return phoneNumber && phoneNumber.isValid() && phoneNumber.nationalNumber.length >= 7;
          }
          return false;
        } catch (error) {
          return false;
        }
      })
      .required('Phone number is required'),
  });

  const handlePhoneChange = (value, setFieldValue, setFieldError, setFieldTouched) => {
      const phoneValue = value || ''; 
      const cleanedValue = phoneValue.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
      if (!cleanedValue || cleanedValue.length < 7 || cleanedValue.length > 15) {
        setCountryInfo({
          countryName: '',
          countryCode: '',
          dialCode: '',
        });
        setFieldValue('phone', value);
        setFieldError('phone', 'Phone number must be in E.164 format (e.g., +14155552671)');
        setFieldTouched('phone', true); 
        return;
      }
  
      try {
        const phoneNumber = parsePhoneNumber(cleanedValue);
        if (phoneNumber && phoneNumber.isValid()) {
          const countryCode = phoneNumber.country;
          const dialCode = phoneNumber.countryCallingCode;
          const countryName = countries.getName(countryCode, 'en', { select: 'official' }) || '';
  
          setCountryInfo({
            countryName: countryName,
            countryCode: countryCode,
            dialCode: `+${dialCode}`,
          });
  
          setFieldValue('phone', cleanedValue); 
          setFieldValue('countryName', countryName); 
          setFieldError('phone', ''); 
          setFieldTouched('phone', true); 
        } else {
          setCountryInfo({
            countryName: '',
            countryCode: '',
            dialCode: '',
          });
          setFieldValue('phone', cleanedValue); 
          setFieldError('phone', 'Invalid phone number');
          setFieldTouched('phone', true); 
          setFieldValue('countryName', '');  
        }
      } catch (error) {
        console.error('Error parsing phone number:', error);
        setCountryInfo({
          countryName: '',
          countryCode: '',
          dialCode: '',
        });
        setFieldError('phone', 'Error parsing phone number'); 
        setFieldTouched('phone', true); 
        setFieldValue('countryName', '');  
      }
    };
  
  
    const handlePhoneBlur = (setFieldTouched, setFieldError, setFieldValue, value) => {
      setFieldTouched('phone', true); // Mark the field as touched
      
      // Ensure value is a valid string before processing
      const phoneValue = value || ''; // If value is undefined or null, set it to an empty string
      
      // Short-circuit: If value is empty, show "required" error
      if (!phoneValue) return setFieldError('phone', 'Phone number is required');
    
      const cleanedValue = phoneValue.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
    
      // Short-circuit: If the cleaned value exceeds 15 characters, show "too long" error
      if (cleanedValue.length > 15) return setFieldError('phone', 'Phone number is too long');
    
      try {
        const phoneNumber = parsePhoneNumber(cleanedValue);
        if (phoneNumber?.isValid()) {
          setFieldError('phone', ''); // Clear error if valid
          setFieldValue('phone', cleanedValue); // Set valid phone number
        } else {
          setFieldError('phone', 'Invalid phone number'); // Invalid phone
        }
      } catch (error) {
        console.error('Error parsing phone number on blur:', error);
        setFieldError('phone', 'Error parsing phone number');
      }
    };
  
    
  
  
    const handlePhoneFocus = (setFieldTouched, setFieldError, setFieldValue, value) => {
      setFieldTouched('phone', true); // Mark the field as touched when focus occurs
    
      // Ensure value is a valid string before processing
      const phoneValue = value || ''; // If value is undefined or null, set it to an empty string
    
      // Clean the phone number by removing spaces and non-numeric characters
      const cleanedValue = phoneValue.replace(/\s+/g, '').replace(/[^0-9+]/g, '');
    
      // Short-circuit: If cleaned value exceeds 15 characters, show "too long" error
      if (cleanedValue.length > 15) return setFieldError('phone', 'Phone number is too long');
    
      try {
        const phoneNumber = parsePhoneNumber(cleanedValue);
        if (phoneNumber?.isValid()) {
          setFieldError('phone', ''); // Clear error if valid
          setFieldValue('phone', cleanedValue); // Set valid phone number
        } else {
          setFieldError('phone', 'Invalid phone number'); // Invalid phone number
        }
      } catch (error) {
        console.error('Error parsing phone number on focus:', error);
        setFieldError('phone', 'Error parsing phone number');
      }
    };

  const handleSubmit = async (values) => {
   
    if (initialValues.id) {
      try {

        const formData = {
          id: contactsingleRecord._id,
          name: values.name,
          email:values.email,
          mobile:values.phone,
          category: values.category,
          countryName: countryInfo.countryName?  countryInfo.countryName: values.countryName,
          countryCode: countryInfo.countryCode?countryInfo.countryCode:values.countryCode,
          dialCode: countryInfo.dialCode? countryInfo.dialCode : values.dialCode,
         
        };
        console.log("Submit Handler  " + JSON.stringify(formData,null,2))
        await dispatch(updateConatcts(formData)).then((action) => {
          if (action.payload && action.payload.status === '200') {
            setCountryInfo({
              countryName: '',
              countryCode: '',
              dialCode: '',
            });
            if (modalRef.current) {
              modalRef.current.style.display = 'none';
              const backdrop = document.querySelector('.modal-backdrop');
              if (backdrop) {
                backdrop.style.display = 'none';
              }
            }

            dispatch({
              type: 'contact/updateSingleContact',
              payload: values, 
            });

            

            dispatch(fetchContacts({ page: pagination?.currentPage || 1, filters, sort }));

            handleClose();

            if (location.pathname === '/user/viewcontact') {
              navigate('/user/viewcontact');
            } else {
              navigate('/user/favoritecontact');
            }
          }
        });
      } catch (err) {
        console.error("Error updating contact:", err);
      }
    }
  };

  return (
    <div
      className="modal fade"
      id="basicModal"
      tabIndex="-1"
      aria-labelledby="basicModalLabel"
      aria-hidden="true"
      ref={modalRef}
      onClick={handleClose}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="basicModalLabel">
              Edit Contact
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={handleClose}
            ></button>
          </div>
          <div className="modal-body p-4">
            <Formik
              initialValues={initialValues}
              validationSchema={validationSchema}
              onSubmit={handleSubmit}
              enableReinitialize={true}
            >
              {({ setFieldValue, setFieldError, setFieldTouched, values, touched, errors , isSubmitting }) => (
                <Form className="row g-3">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <Field
                        type="hidden"
                        name="id"
                        className="form-control"
                      />
                      <label htmlFor="inputName" className="form-label">
                        Full Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                        placeholder="Enter your full name"
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="inputEmail" className="form-label">
                        Email ID
                      </label>
                      <Field
                        type="email"
                        name="email"
                        className={`form-control ${touched.email && errors.email ? 'is-invalid' : ''}`}
                        placeholder="Enter your email ID"
                      />
                      <ErrorMessage name="email" component="div" className="invalid-feedback" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Country" className="form-label">Country</label>
                      <Field
                        name="country"
                        type="text"
                        className="form-control"
                        value={values.countryName}
                        readOnly
                      />
                      <ErrorMessage name="countryName" component="div" className="text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="Phone" className="form-label">Phone</label>
                      <PhoneInput
                        international
                        defaultCountry={contactsingleRecord.countryCode || 'US'}
                        value={values.phone}
                        onFocus={(e) => handlePhoneFocus(setFieldTouched, setFieldError, setFieldValue, e.target.value)}
                        onChange={(value) => handlePhoneChange(value, setFieldValue, setFieldError, setFieldTouched)}
                        onBlur={() => handlePhoneBlur(setFieldTouched, setFieldError, setFieldValue, values.phone)}  // Trigger blur event handler
                        
                        className="form-control"
                        placeholder="Enter phone number"
                      />
                      <ErrorMessage name="phone" component="div" className="error-message text-danger" />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="inputCategory" className="form-label">
                        Category
                      </label>
                      <Field
                        as="select"
                        name="category"
                        className={`form-select ${touched.category && errors.category ? 'is-invalid' : ''}`}
                      >
                        <option value="">Select Category</option>
                        <option value="Family">Family</option>
                        <option value="Personal">Personal</option>
                        <option value="Friends">Friends</option>
                        <option value="Colleagues">Colleagues</option>
                      </Field>
                      <ErrorMessage name="category" component="div" className="invalid-feedback" />
                    </div>

                    <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3 mb-3"
                     
                      disabled={isSubmitting}  // Disable the button during submission
                    >
                      {isSubmitting ? 'Updating...' : 'Update'}
                    </button>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditContactModal;
