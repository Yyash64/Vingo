import React from 'react'
import { Routes, Route } from 'react-router-dom'   // ✅ ADD THIS
import SignUp from './pages/SignUp'                      
import SignIn from './pages/SignIn'  
import ForgotPassword from './pages/ForgotPassword'
export const serverUrl="http://localhost:8000"     
import useGetCurrentUser from '../hooks/useGetCurrentUser'               // ✅ ADD THI
function App() {
useGetCurrentUser();
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
      <Route path='/forgot-password' element={<ForgotPassword />} />
    </Routes>
  );
}
export default App;