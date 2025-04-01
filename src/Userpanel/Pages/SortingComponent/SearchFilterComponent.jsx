import React, { useState } from 'react';

const SearchFilterComponent = ({ filters, setFilters, pageContext, sort, setSort }) => {
  const [activeAccordion, setActiveAccordion] = useState('');

  const handleAccordionToggle = (sectionId) => {
    setActiveAccordion(activeAccordion === sectionId ? '' : sectionId);
  };

  return (
    <div className="container my-4 p-4 bg-muted rounded shadow-sm">
      <div className="row d-flex flex-wrap align-items-center">
        {(pageContext === 'ContactsListpage' || pageContext === 'favoritecontact') && (
          <div className="col-12 col-md-12 col-lg-12">
            <div className="accordion" id="filtersAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingName">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseName"
                    aria-expanded={activeAccordion === '0'}
                    aria-controls="collapseName"
                    onClick={() => handleAccordionToggle('0')}
                  >
                    Search Filters
                  </button>
                </h2>
                <div
                  id="collapseName"
                  className={`accordion-collapse collapse ${activeAccordion === '0' ? 'show' : ''}`}
                  aria-labelledby="headingName"
                  data-bs-parent="#filtersAccordion"
                >
                  <div className="accordion-body">
                    <div className="row d-flex flex-wrap align-items-center">
                      <div className="col-md-3 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search by Name"
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="position-relative">
                          <input
                            type="email"
                            className="form-control ps-5"
                            placeholder="Search by Email"
                            value={filters.email}
                            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-envelope position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search by Mobile"
                            value={filters.mobile}
                            onChange={(e) => setFilters({ ...filters, mobile: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-phone-alt position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <select
                          className="form-select"
                          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                          value={filters.category}
                          style={{ height: '38px' }}
                        >
                          <option value="">Select Category</option>
                          <option value="Family">Family</option>
                          <option value="Personal">Personal</option>
                          <option value="Friends">Friends</option>
                          <option value="Colleagues">Colleagues</option>
                        </select>
                      </div>

                      <div className="col-md-3 mb-3">
                        <select
                          className="form-select"
                          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                          value={filters.status}
                          style={{ height: '38px' }}
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>

                      <div className="col-md-3 mb-3">
                        <select
                          className="form-select"
                          onChange={(e) => setSort({ ...sort, sortBy: e.target.value })}
                          value={sort.sortBy}
                          style={{ height: '38px' }}
                        >
                          <option value="name">Sort by Name</option>
                          <option value="email">Sort by Email</option>
                          <option value="mobile">Sort by Mobile</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
     
      {/* Group View Page for search filter */}

        {(pageContext === 'viewgroups') && (
          <div className="col-12 col-md-12 col-lg-12">
            <div className="accordion" id="filtersAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingName">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseName"
                    aria-expanded={activeAccordion === '0'}
                    aria-controls="collapseName"
                    onClick={() => handleAccordionToggle('0')}
                  >
                    Search Filters
                  </button>
                </h2>
                <div
                  id="collapseName"
                  className={`accordion-collapse collapse ${activeAccordion === '0' ? 'show' : ''}`}
                  aria-labelledby="headingName"
                  data-bs-parent="#filtersAccordion"
                >
                  <div className="accordion-body">
                    <div className="row d-flex flex-wrap align-items-center">
                      <div className="col-md-5 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search by Group Name"
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>


                      <div className="col-md-5 mb-3">
                        <select
                          className="form-select"
                          onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                          value={filters.status}
                          style={{ height: '38px' }}
                        >
                          <option value="">Select Status</option>
                          <option value="Active">Active</option>
                          <option value="Inactive">Inactive</option>
                        </select>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      

      {/* Group List */}

      {(pageContext === 'ListGroup') && (
          <div className="col-12 col-md-12 col-lg-12">
            <div className="accordion" id="filtersAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingName">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseName"
                    aria-expanded={activeAccordion === '0'}
                    aria-controls="collapseName"
                    onClick={() => handleAccordionToggle('0')}
                  >
                    Search Filters
                  </button>
                </h2>
                <div
                  id="collapseName"
                  className={`accordion-collapse collapse ${activeAccordion === '0' ? 'show' : ''}`}
                  aria-labelledby="headingName"
                  data-bs-parent="#filtersAccordion"
                >
                  <div className="accordion-body">
                    <div className="row d-flex flex-wrap align-items-center">
                      <div className="col-md-5 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search by Group Name"
                            value={filters.group_name}
                            onChange={(e) => setFilters({ ...filters, group_name: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}


        {/* Assign group for page */}
        {(pageContext === 'Assigngroup') && (
          <div className="col-12 col-md-12 col-lg-12">
            <div className="accordion" id="filtersAccordion">
              <div className="accordion-item">
                <h2 className="accordion-header" id="headingName">
                  <button
                    className="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseName"
                    aria-expanded={activeAccordion === '0'}
                    aria-controls="collapseName"
                    onClick={() => handleAccordionToggle('0')}
                  >
                    Search Filters
                  </button>
                </h2>
                <div
                  id="collapseName"
                  className={`accordion-collapse collapse ${activeAccordion === '0' ? 'show' : ''}`}
                  aria-labelledby="headingName"
                  data-bs-parent="#filtersAccordion"
                >
                  <div className="accordion-body">
                    <div className="row d-flex flex-wrap align-items-center">
                      <div className="col-md-5 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search by Group Name"
                            value={filters.name}
                            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-search position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="position-relative">
                          <input
                            type="email"
                            className="form-control ps-5"
                            placeholder="Search by Email"
                            value={filters.email}
                            onChange={(e) => setFilters({ ...filters, email: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-envelope position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <div className="position-relative">
                          <input
                            type="text"
                            className="form-control ps-5"
                            placeholder="Search by Mobile"
                            value={filters.mobile}
                            onChange={(e) => setFilters({ ...filters, mobile: e.target.value })}
                            style={{ height: '38px' }}
                          />
                          <i className="fas fa-phone-alt position-absolute" style={{ left: '10px', top: '50%', transform: 'translateY(-50%)' }}></i>
                        </div>
                      </div>

                      <div className="col-md-3 mb-3">
                        <select
                          className="form-select"
                          onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                          value={filters.category}
                          style={{ height: '38px' }}
                        >
                          <option value="">Select Category</option>
                          <option value="Family">Family</option>
                          <option value="Personal">Personal</option>
                          <option value="Friends">Friends</option>
                          <option value="Colleagues">Colleagues</option>
                        </select>
                      </div>

                     

                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default SearchFilterComponent;
