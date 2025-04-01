import React from 'react';
import { useSelector } from 'react-redux';  // Import useSelector to get user data from Redux store
import { Spinner } from 'react-bootstrap';  // For loading spinner
import Flag from 'react-world-flags';

function Overview() {
  const userData = useSelector((state) => state.user.user.userData);  // Fetch user data from the store

  // If userData is undefined or not available, you can show a loading spinner.
  if (!userData) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-4">About</h5>
          <p className="small fst-italic">{userData.about || 'No information available'}</p>

          <h5 className="card-title mt-4 mb-3">Profile Details</h5>
          <div className="row mb-2">
            <div className="col-lg-3 col-md-4 text-muted">Full Name</div>
            <div className="col-lg-9 col-md-8">{userData.name || 'N/A'}</div>
          </div>

          <div className="row mb-2">
            <div className="col-lg-3 col-md-4 text-muted">Country</div>
            <div className="col-lg-9 col-md-8">
              <Flag code={userData.country_code || 'US'} style={{ width: 24, height: 24, marginRight: '8px' }} />{userData.country_name || 'N/A'}
            </div>
          </div>

          <div className="row mb-2">
            <div className="col-lg-3 col-md-4 text-muted">Mobile</div>
            <div className="col-lg-9 col-md-8">{userData.phone_number || 'N/A'}</div>
          </div>

          <div className="row mb-2">
            <div className="col-lg-3 col-md-4 text-muted">Email</div>
            <div className="col-lg-9 col-md-8">{userData.email || 'N/A'}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Overview;
