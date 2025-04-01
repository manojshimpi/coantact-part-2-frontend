import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'

function Leftsidemenu() {
    const location = useLocation();
  return (
    <>
       {/* ======= Sidebar ======= */}

        <aside id="sidebar" className="sidebar">
        <ul className="sidebar-nav" id="sidebar-nav">
            <li className="nav-item">
            <NavLink className="nav-link " to="/user/dashboard">
                <i className="bi bi-grid" />
                <span>Dashboard</span>
            </NavLink>
            </li>{/* End Dashboard Nav */}
            <li className="nav-item">
            <NavLink className="nav-link collapsed show" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
                <i className="bi bi-menu-button-wide" /><span>Contact Management</span><i className="bi bi-chevron-down ms-auto" />
            </NavLink>
            <ul
                id="components-nav"
                className={`nav-content collapse${location.pathname === "/user/addcontact" || location.pathname === "/user/viewcontact" || location.pathname === "/user/favoritecontact" ? " show" : ""}`}
                data-bs-parent="#sidebar-nav"
                >
                
                <li>
                <NavLink to="/user/addcontact">
                    <i className="bi bi-circle" /><span>Add Contact Page</span>
                </NavLink>
                </li>

                <li>
               
                <NavLink to="/user/viewcontact">
                    <i className="bi bi-circle" /><span>Contact List Page</span>
                </NavLink>
                </li>
                
               
                <li>
                <NavLink to="/user/favoritecontact">
                    <i className="bi bi-circle" /><span>Favorite Contacts Page</span>
                </NavLink>
                </li>
                
            </ul>
            </li>{/* End Components Nav */}
            <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#forms-nav" data-bs-toggle="collapse" to="#">
                <i className="bi bi-journal-text" /><span>Group Managment</span><i className="bi bi-chevron-down ms-auto" />
            </NavLink>
            <ul id="forms-nav" className={`nav-content collapse ${location.pathname === "/user/addgroup" || location.pathname === "/user/viewgroups" || location.pathname === "/user/assigngroup" || location.pathname === "/user/CreatedGroup" ? " show" : ""}`} data-bs-parent="#sidebar-nav">
                <li>
                <NavLink to="/user/addgroup">
                    <i className="bi bi-circle" /><span>Add Group</span>
                </NavLink>
                </li>

                <li>
                <NavLink to="/user/viewgroups">
                    <i className="bi bi-circle" /><span>View Groups</span>
                </NavLink>
                </li>

                <li>
                <NavLink to="/user/assigngroup">
                    <i className="bi bi-circle" /><span>Assign Contacts to Groups</span>
                </NavLink>
                </li>

                <li>
                <NavLink to="/user/CreatedGroup">
                    <i className="bi bi-circle" /><span>All Created Groups</span>
                </NavLink>
                </li>
                
            </ul>
            </li>{/* End Forms Nav */}

          
      
            <li className="nav-heading">Pages</li>
            
            <li className="nav-item">
            <NavLink className={`nav-link collapsed ${location.pathname === "/user/profile" ? "active" : ""}`} to="/user/profile">
                <i className="bi bi-person" />
                <span>Profile</span>
            </NavLink>
            </li>{/* End Profile Page Nav */}
            <li className="nav-item">
            <NavLink className={`nav-link collapsed ${location.pathname === "/user/faq" ? "active" : ""}`} to="/user/faq">
                <i className="bi bi-question-circle" />
                <span>F.A.Q</span>
            </NavLink>
            </li>{/* End F.A.Q Page Nav */}
           
           
        </ul>
        </aside>{/* End Sidebar*/}

    </>
  )
}

export default Leftsidemenu