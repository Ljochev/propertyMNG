import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUrl from '../../config';
import './properties.css'


const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(getUrl('/api/user/login'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      if (!response.ok) {
        throw new Error('Login failed');
      }

      const jwt_token = await response.json();

      if (jwt_token && jwt_token.token) {
        localStorage.setItem('jwt_token', jwt_token.token);
        navigate('/properties');
      }
    } catch (error) {
      setError('Failed to login. Please check your email and password.');
    }
  };

  return (
  
      <form className='signupClass' onSubmit={handleLogin} >
        <div className='form-group'>
        {/* <label htmlFor="email">Email: </label> */}
        <input
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="someone@somewhere.com"
          required
        />
        </div>
        <div className='form-group'>
        {/* <label htmlFor="password">Password: </label> */}
        <input
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="password"
          required
        />
        </div>
        <button type="submit">Login</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    
  );
};

export default LoginPage;