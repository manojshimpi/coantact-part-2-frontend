import React, { use, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserData } from '../../store/userSlice/userActions';

import { NavLink } from 'react-router-dom';
import { fetchTotalContacts, fetchTotalFavoriteContacts, fetchTotalGroupsCount } from '../../store/adminSlice/actionallRecords';


function Dashboard() {
  const dispatch = useDispatch();
  const TotalConatcts = useSelector((state) => state.admin.allrecorduser.TotalConatcts);
  const TotalFavoriteConatcts = useSelector((state) => state.admin.allrecorduser.TotalFavoriteConatcts);
  const TotalCountGroups = useSelector((state) => state.admin.allrecorduser.TotalCountGroups);
  const { pagination} = useSelector((state) => state.admin.allrecorduser); // Assuming the contacts state

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
      <div className="col-lg-12">
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

     </div>
      </div>{/* End Left side columns */}
      {/* Right side columns */}
      <div className="col-lg-3">
      {/* Recent Activity */}
      <div className="card">
     
        
      </div>{/* End Recent Activity */}
    </div>
    </div>
  </section>
    </>
  )
}

export default Dashboard