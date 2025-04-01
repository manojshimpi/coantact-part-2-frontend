import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/userSlice/userActions';
import { fetchContacts, fetchTotalContacts, fetchTotalFavoriteContacts } from '../../store/userSlice/actionContact';
import { fetchTotalGroupsCount } from '../../store/userSlice/actionGroup';
import { NavLink } from 'react-router-dom';


function Dashboard() {
  const dispatch = useDispatch();
  const TotalConatcts = useSelector((state) => state.user.contact.TotalConatcts);
  const TotalFavoriteConatcts = useSelector((state) => state.user.contact.TotalFavoriteConatcts);
  const TotalCountGroups = useSelector((state) => state.user.group.TotalCountGroups);
  const { contacts , pagination} = useSelector((state) => state.user.contact); // Assuming the contacts state
  const recentContacts = contacts?.slice(0, 5);
  const [filter, setFilter] = useState('');

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

    const filterContacts = (filter) => {
      const now = new Date();
  
      return contacts.filter((contact) => {
        const contactDate = new Date(contact.createdAt);
        
        switch (filter) {
          case 'Today':
            return contactDate.toDateString() === now.toDateString();
          case 'This Month':
            return contactDate.getMonth() === now.getMonth() && contactDate.getFullYear() === now.getFullYear();
          case 'This Year':
            return contactDate.getFullYear() === now.getFullYear();
          default:
            return true;
        }
      });
    };
    const filteredContacts = filterContacts(filter);




 useEffect(() => {
     dispatch(fetchContacts({
       page: pagination?.currentPage || 1,
       filters: { ...filters, isFavorite: 'NO' }, // Ensure only favorites are fetched
       sort: sort,
     }));
   }, [dispatch, pagination?.currentPage, filters, sort]);

    useEffect(()=>{
      dispatch(fetchUserData())
    },[dispatch])
  useEffect(()=>{
    dispatch(fetchTotalContacts())
  },[dispatch])

  useEffect(()=>{
    dispatch(fetchTotalFavoriteContacts())
 },[dispatch])

 useEffect(()=>{
  dispatch(fetchTotalGroupsCount())
},[dispatch])

  return (
    <>
  <section className="section dashboard">
    <div className="row">
      {/* Left side columns */}
      <div className="col-lg-9">
        <div className="row">
          {/* Sales Card */}
          <div className="col-xxl-4 col-md-6">
            <div className="card info-card sales-card">
              <div className="card-body">
                <h5 className="card-title">Total Contact <span>|This Year</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    {/* Change icon here */}
                    <i className="bi bi-person" />
                  </div>
                  <div className="ps-3">
                    <h6>{TotalConatcts}</h6>
                    {/* <span className="text-success small pt-1 fw-bold">20</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Customers Card */}
          <div className="col-xxl-4 col-xl-12">
            <div className="card info-card group-card">
              <div className="card-body">
                <h5 className="card-title">Total Group <span>| This Year</span></h5>
                <div className="d-flex align-items-center">
                  <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                    <i className="bi bi-person-lines-fill" />
                  </div>
                  <div className="ps-3">
                   
                    <h6>{TotalCountGroups}</h6>
                    {/* <span className="text-danger small pt-1 fw-bold">12%</span> <span className="text-muted small pt-2 ps-1">decrease</span> */}
                  </div>
                </div>
              </div>
            </div>
          </div>


          <div className="col-xxl-4 col-xl-12">
              <div className="card info-card favorite-card">
                <div className="card-body">
                  <h1 className="card-title">Favorite Total <span>| This Year</span></h1>
                  <div className="d-flex align-items-center">
                    <div className="card-icon rounded-circle d-flex align-items-center justify-content-center">
                      {/* Change the icon to one that fits "Favorite" like bi-heart */}
                      <i className="bi bi-heart-fill" /> {/* You can choose bi-heart or another favorite-related icon */}
                    </div>
                    <div className="ps-3">
                    <h6>{TotalFavoriteConatcts}</h6>
                      {/* <span className="text-success small pt-1 fw-bold">8%</span> <span className="text-muted small pt-2 ps-1">increase</span> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>


          
          <div className="col-12">
      <div className="card recent-sales overflow-auto">
        <div className="card-body">
        <h5 className="card-title d-flex justify-content-between align-items-center">
          Recent Contacts
          <span>
            <NavLink to="/user/viewcontact" className="text-primary" style={{ textDecoration: 'none' }}>
              More Contact...
            </NavLink>
          </span>
        </h5>
          <h2>{console.log(recentContacts)}</h2>
          <table className="table table-borderless datatable">
            <thead>
              <tr>
               
                <th scope="col">Name</th>
                <th scope="col">Email</th>
                <th scope="col">Mobile</th>
                <th scope="col">Status</th>
              </tr>
            </thead>
            <tbody>
              
              {recentContacts && recentContacts.length > 0 ? (
                recentContacts.map((contact) => (
                  <tr key={contact._id}>
                  <td>{contact.name || 'N/A'}</td>
                  <td><a href="#" className="text-primary">{contact.email || 'N/A'}</a></td>
                  <td>{contact.mobile || 'N/A'}</td>
                  <td>
                    <span
                      className={`badge ${
                        contact.status === 'Active' ? 'bg-success' : 'bg-danger'
                      }`}
                    >
                      {contact.status || 'N/A'}
                    </span>
                  </td>
                </tr>
                
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No recent contacts available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
         
        </div>
      </div>{/* End Left side columns */}
      {/* Right side columns */}
      <div className="col-lg-3">
      {/* Recent Activity */}
      <div className="card">
     
        <div className="card-body">
          <h5 className="card-title">Contact Activity <span></span></h5>
          <div className="activity">
            {filteredContacts.length ? (
              filteredContacts.slice(0, 5).map((contact, index) => (
                <div className="activity-item d-flex" key={index}>
                  <div className="activite-label">{new Date(contact.createdAt).toLocaleTimeString()}</div>
                  <i className={`bi bi-circle-fill activity-badge text-${contact.status === 'Active' ? 'success' : 'danger'} align-self-start`} />
                  <div className="activity-content">
                    {contact.name} 
                  </div>
                </div>
              ))
            ) : (
              <p>No activities for this period.</p>
            )}
          </div>
        </div>
      </div>{/* End Recent Activity */}
    </div>
    </div>
  </section>
    </>
  )
}

export default Dashboard