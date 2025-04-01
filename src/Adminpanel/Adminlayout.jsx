import React, { Suspense, useEffect } from 'react'
import Header from './Component/Header'
import Leftsidemenu from './Component/Leftsidemenu'
import Pagetitle from './Component/Pagetitle'
import { Route, Routes, useNavigate } from 'react-router-dom'
import Footer from './Component/Footer'
import PrivateRoute from '../utils/ProtectedRoute/PrivateRoute'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../store/userSlice/userActions'
import ChangePasswordPage from './Pages/ChangePasswordPage'

// Lazy load pages
const Dashboard = React.lazy(() => import('./Pages/Dashboard'))
const Profile = React.lazy(() => import('./Pages/Profile'))
const Viewuser = React.lazy(() => import('./Pages/UserComponent/Viewuser'))
const Allgetscontacts = React.lazy(() => import('./Pages/ContactComponent/Allgetscontacts'))

const Notificationall = React.lazy(() => import('./Notificationall'))
const ErrorFound = React.lazy(() => import('./ErrorFound'))

function Adminlayout() {
    const navigate = useNavigate(); // useNavigate hook to navigate to routes
    const dispatch = useDispatch();
    const usertype = useSelector((state)=> state.user.user)
    const {userData } = usertype;
    
    useEffect(()=>{
     dispatch(fetchUserData())
    },[dispatch])

    useEffect(()=>{
       if(userData.type==='USER'){
        navigate('/user')
       }
       },[navigate,userData])

    return (
        <>
            <Header userdataglobal={userData}/>
            <Leftsidemenu />
            <main id="main" className="main">
             {/* <h1>{JSON.stringify(userData,null,2)}</h1>  */}
                <Pagetitle />
                <Suspense fallback={
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '10vh' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                }>
                    <Routes>
                        <Route path='/' element={<Dashboard />} />
                        <Route path='/dashboard' element={<Dashboard />} />
                        <Route path="/viewallusers" element={<PrivateRoute><Viewuser /></PrivateRoute>} />
                        <Route path="/viewallcontacts" element={<PrivateRoute><Allgetscontacts /></PrivateRoute>} />
                        
                        <Route path='/changepassword' element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />
                        <Route path='/allnotification' element={<PrivateRoute><Notificationall /></PrivateRoute>} />
                        <Route path='*' element={<ErrorFound />} />
                    </Routes>

                </Suspense>
            </main>{/* End #main */}
            
        </>
    )
}

export default Adminlayout;
