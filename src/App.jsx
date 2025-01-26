import React from 'react'
import './App.css'
import Signup from './Signup.jsx'
import { BrowserRouter,Routes, Route } from 'react-router-dom'
import Login from './Login.jsx'
import StudentPage from './Studentpage.jsx'

function App() {
  

  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Signup />} />
      <Route path='/login' element={<Login />} />
      <Route path='/student' element={<StudentPage />} />
     </Routes>
     </BrowserRouter>
    
  )
}

export default App
