import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../utils/Pagination';
import { deleteContact } from '../../../store/userSlice/actionContact';
import { handleExportCSV, handleExportJSON } from '../../../utils/ExportCsv/exportUtils';
import SearchFilterComponent from '../SortingComponent/SearchFilterComponent';
import { contactAssignToGroup, fetchContactsToGroup, fetchGroups } from '../../../store/userSlice/actionGroup';

function AssignContactstoGroups() {
  const dispatch = useDispatch();

  const { groups , contactToGroup , loading, error, pagination ,paginations } = useSelector((state) => state.user.group);
  
  const [selectedContacts, setSelectedContacts] = useState([]);
  const [filters, setFilters] = useState({
    name: '',
    email: '',
    mobile: '',
    category: '',
    status: '', // Default to active contacts only
  });

  const [sort, setSort] = useState({
    sortBy: 'name',
    sortOrder: 'asc',
  });

  const [selectedGroup, setSelectedGroup] = useState('');

  const pageContext = 'Assigngroup';

  useEffect(() => {
    dispatch(fetchContactsToGroup({
      page: pagination?.currentPage || 1,
      filters: { ...filters, isFavorite: 'NO' },
      sort: sort,
    }));
  }, [dispatch, pagination?.currentPage, filters, sort]);

  useEffect(() => {
    dispatch(fetchGroups({
      page: pagination?.currentPage || 1,
      filters: filters, // Pass filters (e.g., name, status)
      sort: sort,
    }));
  }, [dispatch, pagination?.currentPage, filters, sort]);

  const handlePageChange = (page) => {
    dispatch(fetchContactsToGroup({
      page: page,
      filters: { ...filters, isFavorite: 'NO' },
      sort: sort,
    }));
  };

 

  const handleExportChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'csv') {
      handleExportCSV(contactToGroup);
    } else if (selectedOption === 'json') {
      handleExportJSON(contactToGroup);
    }
  };

  const handleCheckboxChange = (contactId) => {
    if (selectedContacts.includes(contactId)) {
      setSelectedContacts(selectedContacts.filter((id) => id !== contactId));
    } else {
      setSelectedContacts([...selectedContacts, contactId]);
    }
  };

  const handleGroupChange = (event) => {
    setSelectedGroup(event.target.value);
  };

  const handleGroupSubmit = () => {
    if (selectedContacts.length && selectedGroup) {
      dispatch(contactAssignToGroup({ contactIds: selectedContacts, groupId: selectedGroup }));
      setSelectedContacts([]);
      setSelectedGroup('');
    } else {
      alert('Please select contacts and a group.');
    }
  };

  return (
    <div className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card shadow-lg rounded-3">
            <div className="card-body p-4">
              <h5 className="card-title text-primary mb-4">Assigned Contacts To Groups</h5>

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

              <SearchFilterComponent
                filters={filters}
                setFilters={setFilters}
                pageContext={pageContext}
                sort={sort}
                setSort={setSort}
              />

              {/* Group selection and assign to group buttons side by side */}
              <div className="d-flex align-items-center mt-4">
                <select
                  className="form-select w-auto"
                  value={selectedGroup}
                  onChange={handleGroupChange}
                >
                  <option value="">Select Group</option>
                  {groups?.filter(group => group.status === 'Active').map((group) => (
                    <option key={group._id} value={group._id}>
                      {group.name}
                    </option>
                  ))}
                </select>

                <button
                  className="btn btn-primary btn-sm ms-2"
                  onClick={handleGroupSubmit}
                  disabled={selectedContacts.length === 0 || !selectedGroup}
                >
                  Assign to Group
                </button>
              </div>

              {contactToGroup?.length ? (
                <div className="table-responsive mt-4">
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>
                          <input
                            type="checkbox"
                            onChange={() => {
                              if (selectedContacts.length === contactToGroup.length) {
                                setSelectedContacts([]);
                              } else {
                                setSelectedContacts(contactToGroup.map((contact) => contact._id));
                              }
                            }}
                            checked={selectedContacts.length === contactToGroup.length}
                          />
                        </th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Mobile</th>
                        <th>Email</th>
                        
                       
                      </tr>
                    </thead>
                    <tbody>
                      {contactToGroup.map((contact) => (
                        <tr key={contact._id}>
                          <td>
                            <input
                              type="checkbox"
                              checked={selectedContacts.includes(contact._id)}
                              onChange={() => handleCheckboxChange(contact._id)}
                            />
                          </td>
                          <td>{contact.name || 'N/A'}</td>
                          <td>{contact.category || 'N/A'}</td>
                          <td>{contact.mobile || 'N/A'}</td>
                          <td>{contact.email || 'N/A'}</td>
                          
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                !loading && <p className="text-center mt-3">No active contacts available.</p>
              )}

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
    </div>
  );
}

export default AssignContactstoGroups;
