import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const LoginPage = ({}) => {
    const [email, setEmail] = useState('tanda@gmail.com')
    const [password, setPassword] = useState('ljochev123')
    const navigate = useNavigate()

    const handleLogin = async (e) => {
        e.preventDefault()
    console.log("I.m hereeee");

        const data = await fetch('https://property-mng.vercel.app/api/user/login', { // ova e prasahanje za interview
            method: 'POST',
            headers:{
                // 'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email,
                password
                // podatok1,
                // podatok2
            })
        })
        const jwt_token = await data.json()
        console.log(jwt_token.token);
        if(jwt_token) {
            localStorage.setItem('jwt_token', jwt_token.token)
            navigate('/')
        }
    }

  return (
    <div>
        <form onSubmit={handleLogin}>
            <input value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" placeholder='email'/>

            <input value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="text" placeholder='password'/>


            <button>Login</button>
        </form>
    </div>
  )
}

export default LoginPage