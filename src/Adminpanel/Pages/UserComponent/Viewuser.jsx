import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Flag from 'react-world-flags';
import Pagination from '../../../utils/Pagination';
import { handleExportCSV, handleExportJSON } from '../../../utils/ExportCsv/exportUtils';
import { AllRecordofUser, updateUserStatus } from '../../../store/adminSlice/actionallRecords';

function Viewuser() {
  const dispatch = useDispatch();
  const { userAllList, loading, error, pagination } = useSelector((state) => state.admin.allrecorduser);

  const [filters, setFilters] = useState({
    name: '',
    email: '',
    status: '',
  });

  const [sort, setSort] = useState({
    sortBy: 'name',
    sortOrder: 'asc',
  });

  useEffect(() => {
    dispatch(AllRecordofUser({
      page: pagination?.currentPage || 1,
      filters: { ...filters },
      sort: sort,
    }));
  }, [dispatch, pagination?.currentPage, filters, sort]);

  const handlePageChange = (page) => {
    dispatch(AllRecordofUser({
      page: page,
      filters: { ...filters },
      sort: sort,
    }));
  };

  const handleExportChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'csv') {
      handleExportCSV(userAllList);
    } else if (selectedOption === 'json') {
      handleExportJSON(userAllList);
    }
  };

  const handleStatusChange = async (userId, currentStatus) => {
    
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    await dispatch(updateUserStatus({userId, newStatus})); // Dispatching the action to update the status
    await  dispatch(AllRecordofUser({
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
              <h5 className="card-title text-primary mb-4">Users List</h5>

              <div className="col-lg-2 mb-4 position-absolute top-0 end-0 mt-4 me-4">
                <select
                  className="form-select"
                  aria-label="Export Users"
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
                  
                </div>
              </div>

              {userAllList?.length ? (
                <div className="table-responsive">
                  <table className="table table-bordered table-striped">
                    <thead>
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Country</th>
                        <th>Status</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {userAllList.map((user,index) => (
                        <tr key={user._id}>
                         <td>{index + 1 + (pagination.currentPage - 1) * pagination.totalUsers}</td>
                         <td>{user.name || 'N/A'}</td>
                          <td>{user.email || 'N/A'}</td>
                          <td>
                            <Flag code={user.country_code || 'US'} style={{ width: 24, height: 24, marginRight: '8px' }} />
                            {user.country_name || 'N/A'}
                          </td>
                          <td>
                            <span
                              className={`badge ${user.status === 'Active' ? 'bg-success' : 'bg-danger'}`}
                            >
                              {user.status || 'N/A'}
                            </span>
                          </td>
                          <td>
                            <div className="d-flex justify-content-around float-start">
                              {/* Add a button to toggle between Active/Inactive */}
                              <button
                                className={`btn btn-sm ${user.status === 'Active' ? 'btn-warning' : 'btn-success'}`}
                                onClick={() => handleStatusChange(user._id, user.status)}
                                title={user.status === 'Active' ? 'Deactivate User' : 'Activate User'}
                              >
                                {user.status === 'Active' ? 'Deactivate' : 'Activate'}
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                !loading && <p className="text-center mt-3">No users available.</p>
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

      {/* Modal for Edit User */}
      {/* You can create a modal component to edit user details here */}
    </div>
  );
}

export default Viewuser;
