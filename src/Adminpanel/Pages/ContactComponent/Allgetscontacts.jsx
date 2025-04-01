import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { allfetchContacts, updateContactStatusFlag } from '../../../store/adminSlice/actionallRecords';
import Flag from 'react-world-flags';  // Make sure this is the correct import
import Pagination from '../../../utils/Pagination';
import { handleExportJSON } from '../../../utils/ExportCsv/exportUtils'; // Assuming export function exists
import { handleExportCSV } from '../../../utils/ExportCsv/exportUtils'; // Assuming export function exists

function Allgetscontacts() {
  const dispatch = useDispatch();
  const { userContacts, loading, error, pagination } = useSelector((state) => state.admin.allrecorduser);

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    mobile: '',
    category: '',
    status: '',
  });

  const [sort, setSort] = useState({
    sortBy: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    dispatch(allfetchContacts({
      page: pagination?.currentPage || 1,
      filters: { ...filters },
      sort: sort,
    }));
  }, [dispatch, pagination?.currentPage, filters, sort]);

  const handlePageChange = (page) => {
    dispatch(allfetchContacts({
      page: page,
      filters: { ...filters },
      sort: sort,
    }));
  };

  const handleExportChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'csv') {
      handleExportCSV(userContacts);
    } else if (selectedOption === 'json') {
      handleExportJSON(userContacts);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    // Assume you have an action for updating contact status
    await dispatch(updateContactStatusFlag({ userId, newStatus })); 
    await dispatch(allfetchContacts({
      page: pagination?.currentPage || 1,
      filters: filters,
      sort: sort,
    }));
  };

  return (
    <div className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow-lg rounded-3">
            <div className="card-body p-4">
              <h5 className="card-title text-primary mb-4">Contacts List</h5>

              <div className="col-lg-2 mb-4 position-absolute top-0 end-0 mt-4 me-4">
                <select
                  className="form-select"
                  aria-label="Export Contacts"
                  onChange={handleExportChange}
                >
                  <option value="">Select Export Type</option>
                  <option value="csv">Export to CSV</option>
                  <option value="json">Export to JSON</option>
                </select>
              </div>

              {/* Add Search and Filter Component here */}
              <div className="mb-4">
                <div className="row">
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Name"
                      value={filters.name}
                      onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Search by Email"
                      value={filters.email}
                      onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Mobile"
                      value={filters.mobile}
                      onChange={(e) => setFilters({ ...filters, mobile: e.target.value })}
                    />
                  </div>
                  <div className="col-md-3">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search by Category"
                      value={filters.category}
                      onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {userContacts?.length ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                  <thead>
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Mobile</th>
                            <th>Category</th>
                            <th>Country</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {userContacts?.map((contact, index) => (
                            <tr key={contact._id}>
                            <td>{index + 1 + (pagination.currentPage - 1) * pagination.totalUsers}</td>
                            <td>{contact.name || 'N/A'}</td>
                            <td>{contact.email || 'N/A'}</td>
                            <td>{contact.mobile || 'N/A'}</td>
                            <td>{contact.category || 'N/A'}</td>
                            <td>
                                <Flag code={contact.countryCode || 'US'} style={{ width: 24, height: 24, marginRight: '8px' }} />
                                {contact.countryName || 'N/A'}
                            </td>
                            
                            <td>
                                <span className={`badge ${contact.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
                                {contact.status || 'N/A'}
                                </span>
                            </td>
                            <td>
                                <div className="d-flex justify-content-around float-start">
                                <button
                                    className={`btn btn-sm ${contact.status === 'Active' ? 'btn-warning' : 'btn-success'}`}
                                    onClick={() => handleStatusChange(contact._id, contact.status)}
                                    title={contact.status === 'Active' ? 'Deactivate' : 'Activate'}
                                >
                                    {contact.status === 'Active' ? 'Deactivate' : 'Activate'}
                                </button>
                                </div>
                            </td>
                            </tr>
                        ))}
                        </tbody>

                  </table>
                </div>
              ) : (
                !loading && <p className="text-center mt-3">No contacts available.</p>
              )}

              <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <strong>Total Records:</strong> {pagination.totalUsers || '0'}
                </div>
                {pagination && (
                  <Pagination
                    currentPage={pagination.currentPage}
                    totalPages={pagination.totalPages}
                    onPageChange={handlePageChange}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Allgetscontacts;
