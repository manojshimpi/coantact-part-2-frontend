import React from 'react';
import { useLocation } from 'react-router-dom';

function Pagetitle() {
  const location = useLocation();

  // Map routes to their respective page titles
  const pageTitleMap = {
    '/user/dashboard': 'Dashboard',
    '/user/profile': 'Profile',
    '/user/faq': 'F.A.Q',
    '/user/addcontact': 'Add Contact',
    '/user/viewcontact': 'Contact List',
    '/user/favoritecontact': 'Favorite Contacts',
    '/user/addgroup': 'Add Group',
    '/user/viewgroups': 'View Groups',
    '/user/assigngroup': 'Assign Contacts to Groups',
    '/user/CreatedGroup': 'All Created Groups',
  };

  // Get the current page title
  const pageTitle = pageTitleMap[location.pathname] || 'Page Not Found';

  // Set breadcrumbs dynamically based on current route
  const breadcrumbs = [
    { name: 'Home', path: '/home' },
    { name: pageTitle, path: location.pathname }
  ];

  return (
    <div className="pagetitle">
      <h1>{pageTitle}</h1>
      <nav>
        <ol className="breadcrumb">
          {breadcrumbs.map((breadcrumb, index) => (
            <li className="breadcrumb-item" key={index}>
              {index === breadcrumbs.length - 1 ? (
                breadcrumb.name
              ) : (
                <a href={breadcrumb.path}>{breadcrumb.name}</a>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </div>
  );
}

export default Pagetitle;
