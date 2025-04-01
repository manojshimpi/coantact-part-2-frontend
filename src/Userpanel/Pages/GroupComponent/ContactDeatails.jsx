import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { deleteContactDetailsRecord, fetchContactDetails } from '../../../store/userSlice/actionGroup';

function ContactDetails() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { contactDetailsArrayObject, loading, error } = useSelector((state) => state.user.group);
  const { id } = useParams();

  const [localContactDetails, setLocalContactDetails] = useState(contactDetailsArrayObject);

  useEffect(() => {
    dispatch(fetchContactDetails(id));
  }, [dispatch, id]);

  useEffect(() => {
    setLocalContactDetails(contactDetailsArrayObject);
  }, [contactDetailsArrayObject]);

  const handleDelete = async (collectionID) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await dispatch(deleteContactDetailsRecord(collectionID));
        setLocalContactDetails(localContactDetails.filter(contact => contact._id !== collectionID));

        if (localContactDetails.length === 1) {
          navigate('/user/CreatedGroup');
        }
      } catch (error) {
        console.error('Error during delete operation:', error);
      }
    }
  };

  const handleBackClick = () => {
    navigate('/user/CreatedGroup');
  };

  return (
    <div className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow-lg rounded-3">
            <div className="card-body p-4">
              <h5 className="card-title text-primary mb-4">Contact Details</h5>
              <div className="contact-details-container container position-relative">
                <div className="d-flex justify-content-end position-absolute top-0 mt-0 end-0">
                  <button
                    className="btn btn-outline-primary btn-md mt-0 mb-4 shadow-sm rounded btn-md"
                    onClick={handleBackClick}
                  >
                    Back to Created Group
                  </button>
                </div>

                {localContactDetails?.length > 0 ? (
                  <div className="row row-cols-1 row-cols-md-1 row-cols-lg-3 g-4">
                    {localContactDetails.map((contact) => (
                      <div key={contact._id} className="col">
                        <div className="card custom-card shadow-sm rounded-3">
                          <div className="card-body">
                            <h4 className="card-title text-primary">{contact.contact.name || 'N/A'}</h4>
                            <hr />
                            <div className="contact-details">
                              <p className="card-text">
                                <i className="fas fa-envelope me-2"></i>
                                <strong>Email:</strong> {contact.contact.email || 'N/A'}
                              </p>
                              <p className="card-text">
                                <i className="fas fa-phone-alt me-2"></i>
                                <strong>Mobile:</strong> {contact.contact.mobile || 'N/A'}
                              </p>
                            </div>
                            <div className="d-flex justify-content-end">
                              <button
                                className="btn btn-outline-danger btn-sm mt-2 mb-0"
                                onClick={() => handleDelete(contact._id)} 
                                title="Delete Contact"
                              >
                                <i className="fas fa-trash-alt"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-center">No contacts available for this group.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactDetails;
