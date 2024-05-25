import { useNavigate } from 'react-router-dom';
import React, { useEffect, useState } from 'react'
import { useJwt } from 'react-jwt';


const ProtectedRoute = ({children}) => {
    const { decodedToken, isExpired } = useJwt(localStorage.getItem('jwt_token'));
    const navigate = useNavigate();
useEffect(() => {
    const jwt_token = localStorage.getItem('jwt_token')
    if(!jwt_token || isExpired){
      localStorage.removeItem('jwt_token')
        navigate('/login')
    } else {

    }
  }, [isExpired])

  return (
    <>{children}</>
  )
}

export default ProtectedRoute