import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { emailNotifications } from '../../store/userSlice/userActions';

function SettingForm() {
  const dispatch = useDispatch(); 
  const userData = useSelector((state) => state.user.user.userData);  // Fetch user data from the store

  // Initialize state for the checkboxes with userData
  const [settings, setSettings] = useState({
    emailNotifications: false,
    birthdayNotifications: false,
    profileUpdateNotifications: false,
  });

  // Effect to update settings state when userData changes
  useEffect(() => {
    if (userData) {
      setSettings({
        emailNotifications: userData.emailNotifications,
        birthdayNotifications: userData.birthdayNotifications,
        profileUpdateNotifications: userData.profileUpdateNotifications,
      });
    }
  }, [userData]);

  // Handle form submit
  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(emailNotifications(settings)); // Dispatch the updated settings
    console.log('Form submitted with settings:', settings);
    // Here you can send the data to an API or perform another action
  };

  // Handle checkbox change
  const handleCheckboxChange = (event) => {
    const { id, checked } = event.target;
    setSettings(prevSettings => ({
      ...prevSettings,
      [id]: checked,
    }));
  };

  return (
    <>
      
        <form onSubmit={handleSubmit}>
          <div className="row mb-3">
            <label htmlFor="fullName" className="col-md-4 col-lg-3 col-form-label">Email Notifications</label>
            <div className="col-md-8 col-lg-9">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="emailNotifications"
                  checked={settings.emailNotifications}  // Now use settings as the source of truth
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="emailNotifications">
                  Email Notifications
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="birthdayNotifications"
                  checked={settings.birthdayNotifications}  // Use settings state here
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="birthdayNotifications">
                  Birthday Notifications
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="profileUpdateNotifications"
                  checked={settings.profileUpdateNotifications}  // Use settings state here
                  onChange={handleCheckboxChange}
                />
                <label className="form-check-label" htmlFor="profileUpdateNotifications">
                  Profile Update Notifications
                </label>
              </div>
            </div>
          </div>
          <div className="text-center">
            <button type="submit" className="btn btn-primary">Save Changes</button>
          </div>
        </form>
     
    </>
  );
}

export default SettingForm;
