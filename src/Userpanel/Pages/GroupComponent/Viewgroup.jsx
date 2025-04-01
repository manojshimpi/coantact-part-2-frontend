import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleExportCSV, handleExportJSON } from '../../../utils/ExportCsv/exportUtils'; // Export logic
import Pagination from '../../../utils/Pagination';
import SearchFilterComponent from '../SortingComponent/SearchFilterComponent';
import { deleteGroup, fetchGroups, updateGroupStatus } from '../../../store/userSlice/actionGroup';
import EditGroupModal from '../EditComponent/EditGroupModal';

function Viewgroup() {
  const dispatch = useDispatch();

  const { groups, loading, error, pagination } = useSelector((state) => state.user.group);

  const [selectedGroupId, setSelectedGroupId] = useState(null);

  const [filters, setFilters] = useState({
    name: '',
    status: '',
  });

  const [sort, setSort] = useState({
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const pageContext = 'viewgroups'; // Context name for the page

  // Fetch groups when page changes or filters/sort are updated
  useEffect(() => {
    dispatch(fetchGroups({
      page: Pagination?.currentPage || 1,
      filters: filters, // Pass filters (e.g., name, status)
      sort: sort,
    }));
  }, [dispatch, pagination?.currentPage, filters, sort]);

  const handlePageChange = (page) => {
    dispatch(fetchGroups({
      page: page,
      filters: filters,
      sort: sort,
    }));
  };

  const handleOpen = (id) => {
    setSelectedGroupId(id); // Set the group id for editing
  };

  const handleClose = () => {
    setSelectedGroupId(null); // Reset the selected group id when closing the modal
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this group?')) {
      dispatch(deleteGroup(id));
    }
    dispatch(fetchGroups({
      page: pagination?.currentPage || 1,
      filters: filters,
      sort: sort,
    }));
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    await dispatch(updateGroupStatus({ groupId: id, newStatus }));
    dispatch(fetchGroups({
      page: pagination?.currentPage || 1,
      filters: filters,
      sort: sort,
    }));
  };

  const handleExportChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'csv') {
      handleExportCSV(groups);
    } else if (selectedOption === 'json') {
      handleExportJSON(groups);
    }
  };

  return (
    <div className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow-lg rounded-3">
            <div className="card-body p-4">
              <h5 className="card-title text-primary mb-4">View Groups</h5>

              {/* Export Dropdown */}
              <div className="col-lg-2 mb-4 position-absolute top-0 end-0 mt-4 me-4">
                <select
                  className="form-select"
                  aria-label="Export Groups"
                  onChange={handleExportChange}
                >
                  <option value="">Select Export Type</option>
                  <option value="csv">Export to CSV</option>
                  <option value="json">Export to JSON</option>
                </select>
              </div>

              {/* Search and Filter Component */}
              <SearchFilterComponent
                filters={filters}
                setFilters={setFilters}
                pageContext={pageContext}
                sort={sort}
                setSort={setSort}
              />

              {/* Display Groups */}
              {groups?.length ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
                  {groups.map((group) => (
                    <div className="col" key={group._id}>
                      <div
                        className="card border-light shadow-sm rounded-3"
                        style={{
                          borderLeft: '5px solid #007bff',
                          borderRadius: '10px',
                          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                          borderBottom: '2px solid rgba(0, 0, 0, 0.1)',
                        }}
                      >
                        <div className="card-body">
                          <h5 className="card-title">{group.name || 'N/A'}</h5>
                          <p className="card-text">
                            <i className="fas fa-tags me-2"></i>
                            <strong>Status:</strong> {group.status || 'N/A'}
                          </p>

                          {/* Toggle Active/Inactive Status */}
                          <div className="d-flex justify-content-between mt-3">
                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`flexSwitchCheck${group._id}`}
                                checked={group.status === 'Active'}
                                onChange={() => handleStatusToggle(group._id, group.status)}
                              />
                            </div>

                            {/* Edit Group Modal */}
                            <button
                              className="btn btn-outline-warning btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                              onClick={() => handleOpen(group._id)}
                              title="Edit Group"
                            >
                              <i className="fas fa-edit"></i>
                            </button>

                            {/* Delete Group */}
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(group._id)}
                              title="Delete Group"
                            >
                              <i className="fas fa-trash"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && <p className="text-center mt-3">No groups available.</p>
              )}

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <strong>Total Records:</strong> {pagination.totalGroups || '0'}
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

      {/* Edit Group Modal */}
      <EditGroupModal
        groupId={selectedGroupId}
        handleClose={handleClose}
        pagination={pagination}
        filters={filters}
        sort={sort}
      />
    </div>
  );
}

export default Viewgroup;
