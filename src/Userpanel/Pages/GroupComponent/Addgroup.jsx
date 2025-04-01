import React from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { addGroup } from '../../../store/userSlice/actionGroup';
import { useDispatch } from 'react-redux';

function Addgroup() {
    const dispatch = useDispatch();
  // Initialize form values
  const initialValues = {
    groupName: '',
  };

  // Validation schema using Yup
  const validationSchema = Yup.object({
    groupName: Yup.string().required('Please enter a group name!'),
  });

  const handleSubmit = (values, { resetForm }) => {
    // Dispatch the action to add a group (This should be implemented in your store)
    dispatch(addGroup(values));
    console.log('Group added:', values);

    resetForm(); // Reset the form after submission
  };

  return (
    <div className="card shadow-lg my-5 mx-auto" style={{ maxWidth: '600px' }}>
      <div className="card-body">
        <h5 className="card-title text-center mb-4 text-uppercase font-weight-bold">Add Group</h5>

        {/* Formik Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {({ touched, errors }) => (
            <Form className="row g-3">
              {/* Left Gap (2 columns) */}
              <div className="col-md-2"></div>

              {/* Form Fields (Center) */}
              <div className="col-md-8">
                <div className="mb-3">
                  <label htmlFor="inputGroupName" className="form-label form-label-custom">Group Name</label>
                  <Field
                    type="text"
                    name="groupName"
                    className={`form-control ${touched.groupName && errors.groupName ? 'is-invalid' : ''}`}
                    id="inputGroupName"
                    placeholder="Enter the group name"
                  />
                  <ErrorMessage name="groupName" component="div" className="invalid-feedback" />
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

export default Addgroup;
