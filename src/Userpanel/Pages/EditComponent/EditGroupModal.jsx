import React, { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useLocation, useNavigate } from 'react-router-dom';
import {fetchGroups, getGrouptByuserId, updateGroup } from '../../../store/userSlice/actionGroup';

const EditGroupModal = ({ groupId, handleClose, pagination, filters, sort }) => {
  const dispatch = useDispatch();
  const modalRef = useRef(null);
  
  const { groupsingleRecord, loading, error } = useSelector((state) => state.user.group);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (groupId) {
      dispatch(getGrouptByuserId(groupId));
    }
  }, [dispatch, groupId]);

  const initialValues = {
    id: groupsingleRecord?._id || '',
    name: groupsingleRecord?.name || '',
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Please enter Group name!'),
    
  });

  const handleSubmit = async (values, { resetForm }) => {
    if (initialValues.id) {
      try {
        await dispatch(updateGroup(values)).then((action) => {
          if (action.payload && action.payload.status === '200') {
            if (modalRef.current) {
              modalRef.current.style.display = 'none';
              const backdrop = document.querySelector('.modal-backdrop');
              if (backdrop) {
                backdrop.style.display = 'none';
              }
            }

            dispatch({
              type: 'group/updateGroup',
              payload: values, 
            });

            dispatch(fetchGroups({ page: pagination?.currentPage || 1, filters, sort }));

            handleClose();
            
            navigate('/user/viewgroups');
          }
        });
      } catch (err) {
        console.error("Error updating contact:", err);
      }
    }
  };

  const modalStyle = {
    backdrop: {
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    modalContent: {
      borderRadius: '15px',
      backgroundColor: '#f9f9f9',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
    },
    modalHeader: {
      borderBottom: '2px solid #ddd',
      paddingBottom: '20px',
    },
    modalTitle: {
      color: '#333',
      fontSize: '1.25rem',
      fontWeight: 'bold',
    },
    formField: {
      borderRadius: '10px',
      padding: '12px 15px',
      transition: 'border-color 0.3s ease-in-out',
    },
    inputFocus: {
      borderColor: '#007bff',
    },
    button: {
      backgroundColor: '#007bff',
      borderColor: '#007bff',
      borderRadius: '30px',
      padding: '10px 20px',
      fontSize: '16px',
      width: '50%',
      transition: 'background-color 0.3s ease-in-out',
    },
    buttonHover: {
      backgroundColor: '#0056b3',
      borderColor: '#0056b3',
    },
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
      style={modalStyle.backdrop}
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content" style={modalStyle.modalContent}>
          <div className="modal-header" style={modalStyle.modalHeader}>
            <h5 className="modal-title" id="basicModalLabel" style={modalStyle.modalTitle}>
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
              enableReinitialize
            >
              {({ touched, errors }) => (
                <Form className="row g-3">
                  <div className="col-md-12">
                    <div className="mb-3">
                      <Field
                        type="hidden"
                        name="id"
                        className="form-control"
                        id="inputName"
                      />
                      <label htmlFor="inputName" className="form-label">
                        Group Name
                      </label>
                      <Field
                        type="text"
                        name="name"
                        className={`form-control ${touched.name && errors.name ? 'is-invalid' : ''}`}
                        id="inputName"
                        placeholder="Enter your full name"
                        style={modalStyle.formField}
                      />
                      <ErrorMessage name="name" component="div" className="invalid-feedback" />
                    </div>

                    <div className="d-flex justify-content-center">
                      <button
                        type="submit"
                        className="btn btn-primary mt-3 mb-3"
                        style={modalStyle.button}
                        onMouseEnter={(e) => e.target.style.backgroundColor = modalStyle.buttonHover.backgroundColor}
                        onMouseLeave={(e) => e.target.style.backgroundColor = modalStyle.button.backgroundColor}
                      >
                        Update
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

export default EditGroupModal;

