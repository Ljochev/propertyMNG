import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import { useJwt } from 'react-jwt';

const ProtectedRoute = ({children}) => {
    const { isExpired } = useJwt(localStorage.getItem('jwt_token'));
    const navigate = useNavigate()
useEffect(() => {
    const jwt_token = localStorage.getItem('jwt_token')
    if(!jwt_token || isExpired){
        navigate('/login')
        localStorage.removeItem('jwt_token')
    } 
  }, [isExpired])

  return (
    <>{children}</>
  )
}

export default ProtectedRoute