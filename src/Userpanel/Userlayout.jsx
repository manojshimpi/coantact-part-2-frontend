import React, { Suspense, useEffect } from 'react'
import Header from './Component/Header'
import Leftsidemenu from './Component/Leftsidemenu'
import Pagetitle from './Component/Pagetitle'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUserData } from '../store/userSlice/userActions'
import ContactListPage from './Pages/ContactComponent/ContactListPage'
import Addgroup from './Pages/GroupComponent/Addgroup'
import Viewgroup from './Pages/GroupComponent/Viewgroup'
import PrivateRoute from '../utils/ProtectedRoute/PrivateRoute'
import ContactDeatails from './Pages/GroupComponent/ContactDeatails'

// Lazy load pages
const Dashboard = React.lazy(() => import('./Pages/Dashboard'))
const GroupsList  = React.lazy(() => import('./Pages/GroupComponent/GroupsList'))
const Addcontact = React.lazy(() => import('./Pages/ContactComponent/AddContact'))
const Profile = React.lazy(() => import('./ProfileComponent/Profile'))
const FavoriteContactsPage = React.lazy(() => import('./Pages/ContactComponent/FavoriteContactsPage'))
const AssignContactstoGroups = React.lazy(() => import('./Pages/AssignedContactComponent/AssignContactstoGroups'))
const ChangePasswordPage = React.lazy(() => import('./ProfileComponent/ChangePasswordPage'))
const Faq = React.lazy(() => import('./ProfileComponent/Faq'))
const ContactSupportPage = React.lazy(() => import('./ProfileComponent/ContactSupportPage'))
const Showallmessage = React.lazy(() => import('./Pages/NotificationComponent/Showallmessage'))
const Notificationall = React.lazy(() => import('./Pages/NotificationComponent/Notificationall'))
const ErrorFound = React.lazy(() => import('./ErrorFound'))

function Userlayout() {
    const navigate = useNavigate(); // useNavigate hook to navigate to routes
    const dispatch = useDispatch();
    const usertype = useSelector((state)=> state.user.user)
    const {userData } = usertype;
    
    useEffect(()=>{
     dispatch(fetchUserData())
    },[dispatch])

    // if user is admin redirect to admin panel
    useEffect(()=>{
        if(userData.type==='ADMIN'){
        navigate('/admin')
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
                        <Route path="/addcontact" element={<PrivateRoute><Addcontact /></PrivateRoute>} />
                        <Route path="/viewcontact" element={<PrivateRoute><ContactListPage /></PrivateRoute>} />
                        <Route path='/favoritecontact' element={<PrivateRoute><FavoriteContactsPage /></PrivateRoute>} />
                        <Route path='/addgroup' element={<PrivateRoute><Addgroup /></PrivateRoute>} />
                        <Route path='/viewgroups' element={<PrivateRoute><Viewgroup /></PrivateRoute>} />
                        <Route path='/CreatedGroup' element={<PrivateRoute><GroupsList /></PrivateRoute>} />
                        <Route path='/assigngroup' element={<PrivateRoute><AssignContactstoGroups /></PrivateRoute>} />
                        <Route path='/GroupwiseConatcts/:id' element={<PrivateRoute><ContactDeatails /></PrivateRoute>} />
                        <Route path='/changepassword' element={<PrivateRoute><ChangePasswordPage /></PrivateRoute>} />
                        <Route path='/faq' element={<Faq />} /> {/* No authentication required */}
                        <Route path='/contact' element={<ContactSupportPage />} /> {/* No authentication required */}
                        <Route path='/profile' element={<PrivateRoute><Profile /></PrivateRoute>} />
                        <Route path='/showallmessage' element={<PrivateRoute><Showallmessage /></PrivateRoute>} />
                        <Route path='/allnotification' element={<PrivateRoute><Notificationall /></PrivateRoute>} />
                        <Route path='*' element={<ErrorFound />} />
                    </Routes>

                </Suspense>
            </main>{/* End #main */}
            
        </>
    )
}

export default Userlayout;
