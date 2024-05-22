import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUrl from '../../config';

const Logout = () => {
    const navigate = useNavigate();
    const handleLogout = async (e) => {
        e.preventDefault()
        localStorage.removeItem('jwt_token');
            navigate('/')
        }
    


  return (
    <button type="button" onClick={handleLogout}>Logout</button>
  )
}

export default Logout