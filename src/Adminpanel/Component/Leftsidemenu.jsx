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
            <NavLink className="nav-link " to="/admin/dashboard">
                <i className="bi bi-grid" />
                <span>Dashboard</span>
            </NavLink>
            </li>{/* End Dashboard Nav */}

            <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
                <i className="bi bi-menu-button-wide" /><span>User Management</span><i className="bi bi-chevron-down ms-auto" />
            </NavLink>
            
            <ul  id="components-nav"
                className={`nav-content collapse${location.pathname === "/admin/viewallusers"  ? " show" : ""}`}
                data-bs-parent="#sidebar-nav"
                >
                <li>
               
                <NavLink to="/admin/viewallusers">
                    <i className="bi bi-circle" /><span>View All Users</span>
                </NavLink>
                </li>
            </ul>
            </li>{/* End Components Nav */}

            <li className="nav-item">
            <NavLink className="nav-link collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" to="#">
                <i className="bi bi-menu-button-wide" /><span>Contact Management</span><i className="bi bi-chevron-down ms-auto" />
            </NavLink>
            
            <ul  id="components-nav"
                className={`nav-content collapse${location.pathname === "/admin/viewallcontacts"  ? " show" : ""}`}
                data-bs-parent="#sidebar-nav"
                >
                <li>
                <NavLink to="/admin/viewallcontacts">
                    <i className="bi bi-circle" /><span>View All Contacts</span>
                </NavLink>
                </li>
                
            </ul>
            </li>{/* End Components Nav */}
            <li className="nav-heading">Pages</li>
            <li className="nav-item">
            <NavLink className="nav-link collapsed" to="/admin/changepassword">
                <i className="bi bi-person" />
                <span>Change Password</span>
            </NavLink>
            </li>{/* End Profile Page Nav */}
            
        </ul>
        </aside>{/* End Sidebar*/}

    </>
  )
}

export default Leftsidemenu