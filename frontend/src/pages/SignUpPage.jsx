import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import getUrl from '../../config';
import './signUpPage.css'

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
          confirmPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Signup failed');
      }

        navigate('/login');
    } catch (error) {
      setError('Failed to sign up. Please check your details and try again.');
    }
  };

  return (
      <form className='signupClass' onSubmit={handleSignup}>
      {/* <div className="form-group"> */}
        {/* <label htmlFor="fullName">Full name: </label> */}
        {/* <input
          value={fullName}
          id="fullName"
          onChange={(e) => setFullName(e.target.value)}
          type="text"
          placeholder="Your name"
          required
        />
        </div> */}
        <div className="form-group">
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
        <div className="form-group">
        {/* <label htmlFor="password">Password: </label> */}
        <input
          value={password}
          id="password"
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          required
        />
        </div>
        <div className="form-group">
        {/* <label htmlFor="confirmPassword">Confirm Password: </label> */}
        <input
          value={confirmPassword}
          id="confirmPassword"
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          required
        />
        </div>
        <button type="submit">Signup</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
  );
};

export default SignUpPage;