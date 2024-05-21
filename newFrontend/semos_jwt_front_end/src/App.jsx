import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import { useEffect } from 'react'
import { useJwt } from "react-jwt";
import { jwtDecode } from "jwt-decode";
import ProtectedRoute from './pages/ProtectedRoute'


function App() {
  const { isExpired } = useJwt(localStorage.getItem('jwt_token'));
  console.log(isExpired)
  const navigate = useNavigate()
  useEffect(() => {
    // let token = localStorage.getItem('jwt_token');
    // let decodedToken = jwtDecode(token);
    // console.log("Decoded Token", decodedToken);
    // let currentDate = new Date();
  
    // JWT exp is in seconds
    // if (decodedToken.exp * 1000 < currentDate.getTime()) {
    //   console.log("Token expired.");
    // } else {
    //   console.log("Valid token");   
    //   result = true;
    // }

    const jwt_token = localStorage.getItem('jwt_token')
    if(jwt_token && !isExpired){
      navigate('/')
    } else {
      navigate('/login')
      localStorage.removeItem('jwt_token')
    }
  }, [isExpired])

  return (
    <>
      <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>
        } />
{/* 
<Route path='/about' element={
        <ProtectedRoute>
          <AboutPage />
        </ProtectedRoute>
        } /> */}
      </Routes>
    </>
  )
}

export default App
