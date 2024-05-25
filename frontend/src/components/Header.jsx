import React, { useState } from 'react'
import './header.css'
import Home from './Home'
import { useJwt } from 'react-jwt';
import { useNavigate } from 'react-router-dom'
import Button from './Button';


const Header = () => {
  const navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(localStorage.getItem('jwt_token'));
  
  const handleLogout = (e) => {
    e.preventDefault()
    localStorage.removeItem('jwt_token');
        navigate('/')
    }
    const handleLogin = (e) => {
      e.preventDefault();
      navigate('/login');
      }
      const handleSignUp = (e) => {
        e.preventDefault();
        navigate('/signup');
        }

  return (
    <header className="header">
        <Home/>
        <div className='log-bar'>{isExpired ? 
        <div>
        <Button handleFn={handleLogin} btnName={"Login"}/>
        <Button handleFn={handleSignUp} btnName={"SignUp"}/>
        </div> : 
        <div>
          <Button handleFn={handleLogout} btnName={"Logout"}/>
        </div>
          }
        </div>
        </header>
  )
}

export default Header


