import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import { logout } from '../../store/userSlice/userActions';
import logo from '../../assets/logo5.png'

function Header({userdataglobal}) {
   const navigate = useNavigate();
   const {name,image,email,type} = userdataglobal
  
   /*useEffect(() => {
    // Check if name is null or empty and redirect to login after a delay
    if (!name && type !=='USER') {
      setTimeout(() => {
        navigate('/login');
      }, 2000); // Delay for 2 seconds (2000 milliseconds)
    }
  }, [name, navigate]); // Add name as a dependency to trigger effect only when `name` changes*/
  
    useEffect(() => {
       
        // ✅ Add event listener to toggle sidebar
        const toggleBtn = document.querySelector(".toggle-sidebar-btn");
        const body = document.body;
    
        const toggleSidebar = () => {
          body.classList.toggle("toggle-sidebar"); // Toggle class
        };
    
        if (toggleBtn) {
          toggleBtn.addEventListener("click", toggleSidebar);
        }
        
        return () => {
          // ✅ Cleanup event listener to avoid memory leaks
          if (toggleBtn) {
            toggleBtn.removeEventListener("click", toggleSidebar);
          }
        };
      });
      
  return (
    <>
     
     <header id="header" className="header fixed-top d-flex align-items-center">
        <div className="d-flex align-items-center justify-content-between">
          <NavLink to="/user/dashboard" className=" d-flex align-items-center">
          <img className="" src={logo} style={{ width: '270px', height: 'auto' }} />
          </NavLink>
          <i className="bi bi-list toggle-sidebar-btn" />
        </div>{/* End Logo */}
        <div className="search-bar">
          <form className="search-form d-flex align-items-center" method="POST" action="#">
            <input type="text" name="query" placeholder="Search" title="Enter search keyword" />
            <button type="submit" title="Search"><i className="bi bi-search" /></button>
          </form>
        </div>{/* End Search Bar */}
        <nav className="header-nav ms-auto">
          <ul className="d-flex align-items-center">
            <li className="nav-item d-block d-lg-none">
              <a className="nav-link nav-icon search-bar-toggle " href="#">
                <i className="bi bi-search" />
              </a>
            </li>{/* End Search Icon*/}
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-bell" />
                <span className="badge bg-primary badge-number">4</span>
              </a>{/* End Notification Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow notifications">
                <li className="dropdown-header">
                  You have 4 new notifications
                  <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-exclamation-circle text-warning" />
                  <div>
                    <h4>Lorem Ipsum</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>30 min. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-x-circle text-danger" />
                  <div>
                    <h4>Atque rerum nesciunt</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>1 hr. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-check-circle text-success" />
                  <div>
                    <h4>Sit rerum fuga</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>2 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="notification-item">
                  <i className="bi bi-info-circle text-primary" />
                  <div>
                    <h4>Dicta reprehenderit</h4>
                    <p>Quae dolorem earum veritatis oditseno</p>
                    <p>4 hrs. ago</p>
                  </div>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <NavLink to="/allnotification">Show all notifications</NavLink>
                </li>
              </ul>{/* End Notification Dropdown Items */}
            </li>{/* End Notification Nav */}
            <li className="nav-item dropdown">
              <a className="nav-link nav-icon" href="#" data-bs-toggle="dropdown">
                <i className="bi bi-chat-left-text" />
                <span className="badge bg-success badge-number">3</span>
              </a>{/* End Messages Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow messages">
                <li className="dropdown-header">
                  You have 3 new messages
                  <a href="#"><span className="badge rounded-pill bg-primary p-2 ms-2">View all</span></a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href="#">
                    <img src="assets/img/messages-1.jpg" alt className="rounded-circle" />
                    <div>
                      <h4>Maria Hudson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>4 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href="#">
                    <img src="assets/img/messages-2.jpg" alt className="rounded-circle" />
                    <div>
                      <h4>Anna Nelson</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>6 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="message-item">
                  <a href="#">
                    <img src="assets/img/messages-3.jpg" alt className="rounded-circle" />
                    <div>
                      <h4>David Muldon</h4>
                      <p>Velit asperiores et ducimus soluta repudiandae labore officia est ut...</p>
                      <p>8 hrs. ago</p>
                    </div>
                  </a>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li className="dropdown-footer">
                  <NavLink to="/showallmessage">Show all messages</NavLink>
                </li>
              </ul>{/* End Messages Dropdown Items */}
            </li>{/* End Messages Nav */}
            <li className="nav-item dropdown pe-3">
              <a className="nav-link nav-profile d-flex align-items-center pe-0" href="#" data-bs-toggle="dropdown">
               {
                !image? ( <img src="/assets/img/profile-img.jpg" alt="Profile" className="rounded-circle"  loading="lazy" />):''
               
               }
               

               <span className="d-none d-md-block dropdown-toggle ps-2">
               {name ? name.charAt(0).toUpperCase() + name.slice(1) : 'User'}
              </span>

              </a>{/* End Profile Iamge Icon */}
              <ul className="dropdown-menu dropdown-menu-end dropdown-menu-arrow profile">
                <li className="dropdown-header">
                  <h6>{name ? name.charAt(0).toUpperCase() + name.slice(1) : 'User'}</h6>
                  <span></span>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item d-flex align-items-center" to="/user/profile">
                    <i className="bi bi-person" />
                    <span>My Profile</span>
                  </NavLink>
                </li>
                <li>
                  <hr className="dropdown-divider" />
                </li>
                
                <li>
                  <hr className="dropdown-divider" />
                </li>
                
                <li>
                  <hr className="dropdown-divider" />
                </li>
                <li>
                  <NavLink className="dropdown-item d-flex align-items-center"  onClick={()=>{logout()}}>
                    <i className="bi bi-box-arrow-right" />
                    <span>Sign Out</span>
                  </NavLink>
                </li>
              </ul>{/* End Profile Dropdown Items */}
            </li>{/* End Profile Nav */}
          </ul>
        </nav>{/* End Icons Navigation */}
      </header>{/* End Header */}
    </>
  )
}

export default Header