import React from 'react'
import { Routes, Route } from 'react-router-dom'   // ✅ ADD THIS
import SignUp from './pages/SignUp'                      
import SignIn from './pages/SignIn'  
export const serverUrl="http://localhost:8000"                    // ✅ ADD THI
function App() {
  return (
    <Routes>
      <Route path='/signup' element={<SignUp />} />
      <Route path='/signin' element={<SignIn />} />
    </Routes>
  );
}
export default App;