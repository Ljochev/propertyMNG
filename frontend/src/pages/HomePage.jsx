import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const HomePage = ({}) => {
  const navigate = useNavigate()

const handleLogin = (e) => {
e.preventDefault();
navigate('/login');
}
const handleSignUp = (e) => {
  e.preventDefault();
  navigate('/signup');
  }

  return (
    <div>
      <button onClick={handleLogin}>Login</button>
      <br/>
      <br/>
      <button onClick={handleSignUp}>SignUp</button>
      </div>
  )
}

export default HomePage