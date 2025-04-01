import React, { useState } from 'react';
import { useDispatch } from 'react-redux';  // You may want to dispatch an action to update the password
import { logout, updatePassword } from '../../store/userSlice/userActions';
import { toast } from 'react-toastify';


function ChangePasswordPage() {
  const dispatch = useDispatch();

  // State to manage form inputs
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    renewPassword: '',
  });

  // Handle form input changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setPasswordData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submit
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Check if passwords match
    if (passwordData.newPassword !== passwordData.renewPassword) {
     toast.error('Passwords do not match!');
      return;
    }

    // Dispatch the update password action (this could be an API call)
    const result = await dispatch(updatePassword({ newPassword: passwordData.newPassword , renewPassword: passwordData.renewPassword}));
    if (result) {
      toast.success('Password 111updated successfully!');
     await dispatch(logout());
    }
   
  };

  return (
    <>
      
        {/* Change Password Form */}
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="newPassword" className="col-md-4 col-lg-3 col-form-label">New Password</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="newPassword"
                type="password"
                className="form-control"
                id="newPassword"
                value={passwordData.newPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="row mb-3">
            <label htmlFor="renewPassword" className="col-md-4 col-lg-3 col-form-label">Re-enter New Password</label>
            <div className="col-md-8 col-lg-9">
              <input
                name="renewPassword"
                type="password"
                className="form-control"
                id="renewPassword"
                value={passwordData.renewPassword}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Change Password</button>
          </div>
        </form>
        {/* End Change Password Form */}
     
    </>
  );
}

export default ChangePasswordPage;
