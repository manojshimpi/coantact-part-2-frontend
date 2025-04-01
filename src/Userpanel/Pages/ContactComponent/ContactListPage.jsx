import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Pagination from '../../../utils/Pagination';
import { deleteContact, fetchContacts, toggleFavoriteStatus, updateContactStatus } from '../../../store/userSlice/actionContact';
import EditContactModal from '../EditComponent/EditContactModal';
import SearchFilterComponent from '../SortingComponent/SearchFilterComponent';
import { handleExportCSV, handleExportJSON } from '../../../utils/ExportCsv/exportUtils';
import Flag from 'react-world-flags';

function ContactListPage() {
  const dispatch = useDispatch();

  const { contacts, loading, error, pagination } = useSelector((state) => state.user.contact);

  const [selectedContactId, setSelectedContactId] = useState(null);

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

  const pageContext = 'ContactsListpage';

  useEffect(() => {
    dispatch(fetchContacts({
      page: pagination?.currentPage || 1,
      filters: { ...filters, isFavorite: 'NO' }, // Ensure only favorites are fetched
      sort: sort,
    }));
  }, [dispatch, pagination?.currentPage, filters, sort]);

  const handlePageChange = (page) => {
    dispatch(fetchContacts({
      page: page,
      filters: { ...filters, isFavorite: 'NO' }, // Ensure only favorites are fetched
      sort: sort,
    }));
  };

  const handleOpen = (id, status) => {
    setSelectedContactId(id);
  };

  const handleClose = () => {
    setSelectedContactId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      dispatch(deleteContact(id));
    }
    dispatch(fetchContacts({
      page: pagination?.currentPage || 1,
      filters: { ...filters, isFavorite: 'NO' }, // Ensure only favorites are fetched
      sort: sort,
    }));
  };

  const handleStatusToggle = async (id, currentStatus) => {
    const newStatus = currentStatus === 'Active' ? 'Inactive' : 'Active';
    await dispatch(updateContactStatus({ contactId: id, newStatus }));
    dispatch(fetchContacts({
      page: pagination?.currentPage || 1,
      filters: { ...filters, isFavorite: 'NO' }, // Ensure only favorites are fetched
      sort: sort,
    }));
  };

  const handleFavoriteToggle = async (id, isFavorite) => {
    const newFavoriteStatus = isFavorite === 'YES' ? 'NO' : 'YES';
    await dispatch(toggleFavoriteStatus({ contactId: id, isFavorite: newFavoriteStatus }));
    dispatch(fetchContacts({
      page: pagination?.currentPage || 1,
      filters: { ...filters, isFavorite: 'NO' }, 
      sort: sort,
    }));
  };

  const handleExportChange = (event) => {
    const selectedOption = event.target.value;
    if (selectedOption === 'csv') {
      handleExportCSV(contacts);
    } else if (selectedOption === 'json') {
      handleExportJSON(contacts);
    }
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

              <SearchFilterComponent
                filters={filters}
                setFilters={setFilters}
                pageContext={pageContext}
                sort={sort}
                setSort={setSort}
              />

              {contacts?.length ? (
                <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 ">
                  {contacts.map((contact) => (
                    <div className="col" key={contact._id}>
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
                          <h5 className="card-title">{contact.name || 'N/A'}</h5>
                          <p className="card-text">
                            <i className="fas fa-tags me-2"></i>
                            <strong>Category:</strong> {contact.category || 'N/A'}
                          </p>


                          <p className="card-text">
                            <i className="fas fa-flag me-2"></i>
                            <strong>Country: </strong>
                              <Flag code={contact.countryCode || 'US'} style={{ width: 24, height: 24, marginRight: '8px' }} />
                              {contact.countryName || 'N/A'}
                           </p>

                          <p className="card-text">
                            <i className="fas fa-phone-alt me-2"></i>
                            <strong>Mobile:</strong> {contact.mobile || 'N/A'}
                          </p>
                          <p className="card-text">
                            <i className="fas fa-envelope me-2"></i>
                            <strong>Email:</strong> {contact.email || 'N/A'}
                          </p>

                          <span
                            className={`badge ${contact.status === 'Active' ? 'bg-success' : 'bg-danger'}`}
                          >
                            {contact.status || 'N/A'}
                          </span>

                          <div className="d-flex justify-content-between mt-3">
                            <button
                              className="btn btn-outline-info btn-sm"
                              title="View Contact"
                            >
                              <i className="fas fa-eye"></i>
                            </button>

                            <div className="form-check form-switch">
                              <input
                                className="form-check-input"
                                type="checkbox"
                                id={`flexSwitchCheck${contact._id}`}
                                checked={contact.status === 'Active'}
                                onChange={() => handleStatusToggle(contact._id, contact.status)}
                              />
                            </div>

                            <button
                              className="btn btn-outline-warning btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#basicModal"
                              onClick={() => handleOpen(contact._id, contact.status)}
                              title="Edit Contact"
                            >
                              <i className="fas fa-edit"></i>
                            </button>

                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() => handleDelete(contact._id)}
                              title="Delete Contact"
                            >
                              <i className="fas fa-trash"></i>
                            </button>

                            <button
                              className={`btn btn-outline-${contact.isFavorite === 'YES' ? 'primary' : 'secondary'} btn-sm`}
                              onClick={() => handleFavoriteToggle(contact._id, contact.isFavorite)}
                              title={contact.isFavorite === 'YES' ? 'Remove from Favorites' : 'Add to Favorites'}
                            >
                              <i className={`fas ${contact.isFavorite === 'YES' ? 'fa-thumbs-up' : 'fa-thumbs-down'}`}></i>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                !loading && <p className="text-center mt-3">No contacts available.</p>
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

      <EditContactModal
        contactId={selectedContactId}
        handleClose={handleClose}
        pagination={pagination}
        filters={{ ...filters, isFavorite: 'NO' }}
        sort={sort}
      />

      
    </div>
  );
}

export default ContactListPage;
