import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleExportCSV, handleExportJSON } from '../../../utils/ExportCsv/exportUtils';
import Pagination from '../../../utils/Pagination';
import SearchFilterComponent from '../SortingComponent/SearchFilterComponent';
import { deleteGroup, fetchAssignedContacts } from '../../../store/userSlice/actionGroup';
import EditGroupModal from '../EditComponent/EditGroupModal';
import { useNavigate } from 'react-router-dom';

function Viewgroup() {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Initialize useNavigate hook

  const { assignedContactToGroup, loading, error, pagination } = useSelector((state) => state.user.group);

  const [selectedGroupId, setSelectedGroupId] = useState(null);
  const [filters, setFilters] = useState({
    group_name: '',
  });

  const [sort, setSort] = useState({
    sortBy: 'groupName',
    sortOrder: 'asc',
  });

  const pageContext = 'ListGroup'; // Context name for the page

  // Fetch assigned contacts on component mount or when filters/sort/pagination change
  useEffect(() => {
    dispatch(fetchAssignedContacts({
      page: pagination?.currentPage || 1,
      filters,
      sort,
    }));
  }, [dispatch, pagination?.currentPage, filters, sort]);

  const handlePageChange = (page) => {
    if (page !== pagination?.currentPage) {
      dispatch(fetchAssignedContacts({
        page,
        filters,
        sort,
      }));
    }
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
      dispatch(fetchAssignedContacts({
        page: pagination?.currentPage || 1,
        filters,
        sort,
      }));
    }
  };

  const handleExportChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'csv') {
      handleExportCSV(assignedContactToGroup);
    } else if (selectedOption === 'json') {
      handleExportJSON(assignedContactToGroup);
    }
  };

  const handleViewContactDetails = (id) => {
    navigate(`/user/GroupwiseConatcts/${id}`); // Navigate to the ContactDeatails page with the id in the URL
  };

  return (
    <div className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow-lg rounded-3">
            <div className="card-body p-4">
              <h5 className="card-title text-primary mb-4">All Created Groups</h5>

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
              {assignedContactToGroup?.length ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
                  {assignedContactToGroup?.map((data) => (
                    <div className="col" key={data._id}>
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
                          <h5 className="card-title">{data.groupDetails.name || 'N/A'}</h5>
                          <p className="card-text">
                            <i className="fas fa-tags me-2"></i>
                            <strong>Total Contacts:</strong> {data.totalContacts || 'N/A'}
                          </p>

                          <div className="d-flex justify-content-between mt-3">
                            {/* Edit Group Modal */}
                            <button
                              className="btn btn-outline-warning btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                              onClick={() => handleOpen(data._id)}
                              title="Edit Group"
                            >
                              <i className="fas fa-edit"></i>
                            </button>

                            {/* Delete Group */}
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(data._id)}
                              title="Delete Group"
                            >
                              <i className="fas fa-trash"></i>
                            </button>

                            {/* View Contact Details Button */}
                            <button
                              className="btn btn-outline-info btn-sm"
                              onClick={() => handleViewContactDetails(data.groupDetails._id)} // Pass the group id to navigate
                              title="View Contact Details"
                            >
                              <i className="fas fa-eye"></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && !error && <p className="text-center mt-3">No groups available.</p>
              )}

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-4">
                <div>
                  <strong>Total Records:</strong> {pagination.totalContacts || '0'}
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
