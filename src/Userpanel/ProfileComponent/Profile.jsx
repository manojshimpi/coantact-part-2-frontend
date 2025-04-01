import React, { useEffect, useState } from 'react';
import ProfileForm from './ProfileForm';
import SettingForm from './SettingForm';
import ChangePasswordPage from './ChangePasswordPage';
import Overview from './Overview';
import { fetchUserData } from '../../store/userSlice/userActions';
import { useDispatch, useSelector } from 'react-redux';
import Fileuplaod from './Fileuplaod';

function Profile() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.user.user.userData);
  const { name, profile_image } = userData;

  // Set default tab to "#profile-overview" if no tab is saved in localStorage
  const [activeTab, setActiveTab] = useState(localStorage.getItem("activeTab") || "#profile-overview");

  useEffect(() => {
    dispatch(fetchUserData());
  }, [dispatch]);

  // Handle tab change
  const handleTabChange = (event) => {
    const newActiveTab = event.target.getAttribute("data-bs-target");
    setActiveTab(newActiveTab);
    localStorage.setItem("activeTab", newActiveTab); // Save active tab to localStorage
  };

  return (
    <>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                {
                  userData.profile_image ? <img src={`http://localhost:5000/${profile_image}`} alt="Profile" className="rounded-circle" /> : <img src="../assets/img/profile-img.jpg" alt="Profile" className="rounded-circle" />
                }

                <h2>{name ? name : 'NA'}</h2>
                <div className="social-links mt-2">
                  <a href="#" className="twitter"><i className="bi bi-twitter" /></a>
                  <a href="#" className="facebook"><i className="bi bi-facebook" /></a>
                  <a href="#" className="instagram"><i className="bi bi-instagram" /></a>
                  <a href="#" className="linkedin"><i className="bi bi-linkedin" /></a>
                </div>
              </div>
            </div>
          </div>

          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                {/* Bordered Tabs */}
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "#profile-overview" ? "active" : ""}`}
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                      onClick={handleTabChange}
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "#profile-edit" ? "active" : ""}`}
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                      onClick={handleTabChange}
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "#profile-settings" ? "active" : ""}`}
                      data-bs-toggle="tab"
                      data-bs-target="#profile-settings"
                      onClick={handleTabChange}
                    >
                      Settings
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${activeTab === "#profile-change-password" ? "active" : ""}`}
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                      onClick={handleTabChange}
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <div className={`tab-pane fade ${activeTab === "#profile-overview" ? "show active" : ""} mt-3`} id="profile-overview">
                    <Overview />
                  </div>
                  <div className={`tab-pane fade ${activeTab === "#profile-edit" ? "show active" : ""} mt-3`} id="profile-edit">
                    <ProfileForm />
                  </div>
                  <div className={`tab-pane fade ${activeTab === "#profile-settings" ? "show active" : ""} mt-3`} id="profile-settings">
                    <SettingForm />
                  </div>
                  <div className={`tab-pane fade ${activeTab === "#profile-change-password" ? "show active" : ""} mt-3`} id="profile-change-password">
                    <ChangePasswordPage />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Profile;
