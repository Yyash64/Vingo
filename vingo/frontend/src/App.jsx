import React from 'react'
import { Routes, Route } from 'react-router-dom'   // ✅ ADD THIS
import SignUp from './pages/SignUp'                      
import SignIn from './pages/SignIn'  
import ForgotPassword from './pages/ForgotPassword'
export const serverUrl="http://localhost:8000"     
import useGetCurrentUser from '../hooks/useGetCurrentUser'               // ✅ ADD THI
import { useSelector } from 'react-redux'
import{ Navigate } from 'react-router-dom'
import Home from './pages/Home'
import useGetCity from '../hooks/useGetCity'
function App() {
useGetCurrentUser();
useGetCity();
const {userData}=useSelector((state)=>state.user);
  return (
    <Routes>
      <Route path='/signup' element={!userData ? <SignUp /> : <Navigate to='/' />} />
      <Route path='/signin' element={!userData ? <SignIn /> : <Navigate to='/' />} />
      <Route path='/forgot-password' element={!userData ? <ForgotPassword /> : <Navigate to='/' />} />
      <Route path='/' element={userData ?<Home />:<Navigate to='/signin' />} />
    </Routes>
  );
}
export default App;