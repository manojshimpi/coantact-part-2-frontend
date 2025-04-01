import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { logout, updatePassword } from '../../store/userSlice/userActions';
import { toast } from 'react-toastify';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

function ChangePasswordPage() {
  const dispatch = useDispatch();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    newPassword: Yup.string()
      .required('Please enter a new password!')
      .min(6, 'Password must be at least 6 characters'),
    renewPassword: Yup.string()
      .required('Please re-enter your new password!')
      .oneOf([Yup.ref('newPassword'), null], 'Passwords must match'),
  });

  const handleSubmit = async (values, { resetForm }) => {
    // Dispatch the update password action (this could be an API call)
    const result = await dispatch(updatePassword({ newPassword: values.newPassword }));
    
    if (result) {
      toast.success('Password updated successfully!');
      await dispatch(logout());
      resetForm(); // Reset the form after successful password update
    } else {
      toast.error('Error updating password!');
    }
  };

  return (
    <>
      <div className="card shadow-lg my-5 mx-auto" style={{ maxWidth: '600px' }}>
        <div className="card-body">
          <h5 className="card-title text-center mb-4 text-uppercase font-weight-bold">Change Password</h5>

          {/* Formik Form */}
          <Formik
            initialValues={{ newPassword: '', renewPassword: '' }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ touched, errors, values }) => (
              <Form className="row g-3">
                {/* Left Gap (2 columns) */}
                <div className="col-md-2"></div>

                {/* Form Fields (Center) */}
                <div className="col-md-8">
                  <div className="mb-3">
                    <label htmlFor="newPassword" className="form-label form-label-custom">New Password</label>
                    <Field
                      type="password"
                      name="newPassword"
                      className={`form-control ${touched.newPassword && errors.newPassword ? 'is-invalid' : ''}`}
                      id="newPassword"
                      placeholder="Enter your new password"
                    />
                    <ErrorMessage name="newPassword" component="div" className="invalid-feedback" />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="renewPassword" className="form-label form-label-custom">Re-enter New Password</label>
                    <Field
                      type="password"
                      name="renewPassword"
                      className={`form-control ${touched.renewPassword && errors.renewPassword ? 'is-invalid' : ''}`}
                      id="renewPassword"
                      placeholder="Re-enter your new password"
                    />
                    <ErrorMessage name="renewPassword" component="div" className="invalid-feedback" />
                  </div>

                  {/* Submit Button */}
                  <div className="d-flex justify-content-center">
                    <button
                      type="submit"
                      className="btn btn-primary mt-3 mb-3 gradient-custom shadow-sm"
                      style={{ width: '50%' }}
                    >
                      Change Password
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
    </>
  );
}

export default ChangePasswordPage;
