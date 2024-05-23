import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import HomePage from './pages/HomePage'
import Properties from './pages/Properties'
import SignUpPage from './pages/SignUpPage'
import CreateListing from './pages/CreateListing'
import ProtectedRoute from './pages/ProtectedRoute'
import { useEffect } from 'react'
import { useJwt } from "react-jwt";
import { jwtDecode } from "jwt-decode";
import Header from './components/Header'



function App() {
  const { isExpired } = useJwt(localStorage.getItem('jwt_token'));
  console.log(isExpired)
  const navigate = useNavigate()
  useEffect(() => {

    const jwt_token = localStorage.getItem('jwt_token')
    if(jwt_token && !isExpired){
      navigate('/properties')
    } else {
      navigate('/')
      localStorage.removeItem('jwt_token')
    }
  }, [isExpired])

  return (
    <>
    <Header/>
      <Routes>
      <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignUpPage />} />
        <Route path='/properties' element={
        <ProtectedRoute>
          <Properties/>
        </ProtectedRoute>
        } />
      <Route path='/createlisting' element={
        <ProtectedRoute>
          <CreateListing/>
        </ProtectedRoute>
        } />
      </Routes>
    </>
  )
}

export default App
