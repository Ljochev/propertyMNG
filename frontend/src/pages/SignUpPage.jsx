import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUrl from '../../config';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch(getUrl('/api/user/register'), {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          fullName,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

      const jwt_token = await response.json();

      if (jwt_token) {
        console.log(jwt_token);
        navigate('/login');
      }
    } catch (error) {
      setError('Failed to sign up. Please check your details and try again.');
    }
  };

  return (
    <div className='signupClass'>
      <form onSubmit={handleSignup}>
        <label htmlFor="fullName">Full name: </label>
        <input
          value={fullName}
          id="fullName"
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="Your name"
          required
        />
        <br />
        <label htmlFor="email">Email: </label>
        <input
          value={email}
          id="email"
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="someone@somewhere.com"
          required
        />
        <br />
        <label htmlFor="password">Password: </label>
        <input
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        <br />
        <label htmlFor="confirmPassword">Confirm Password: </label>
        <input
          value={confirmPassword}
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          required
        />
        <br />
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
};

export default SignUpPage;