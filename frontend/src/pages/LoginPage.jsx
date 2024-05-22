import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getUrl from '../../config';
const LoginPage = ({}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault()
        const data = await fetch(getUrl('/api/user/login'), {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email,
                password
            })
        })
        const jwt_token = await data.json()
        if(jwt_token) {
            localStorage.setItem('jwt_token', jwt_token.token)
            navigate('/properties')
        }
    }

  return (
    <div>
        <form onSubmit={handleLogin}>
            <input value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" placeholder='email'/>
            <br/>
            <input value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="text" placeholder='password'/>
            <br/>
            <button>Login</button>
        </form>
    </div>
  )
}

export default LoginPage