import './App.css'
import { Route, Routes, useNavigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import ShowData from './pages/ShowData'
import { useEffect } from 'react'
import { useJwt } from "react-jwt";
import { jwtDecode } from "jwt-decode";

function App() {
  console.log(isExpired)
  const navigate = useNavigate();

  useEffect(() => {
    if(1 === 2){
      navigate('/')
    } else {
      navigate('/login')
    }
  }, [navigate]);

  return (
    <>
      {/* <Routes>
        <Route path='/login' element={<LoginPage />} />
        <Route path='/' element={<ShowData />} />
      </Routes> */}
      <LoginPage/>
    </>
  )
}

export default App
