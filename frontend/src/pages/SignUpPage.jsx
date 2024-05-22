import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignUpPage = ({}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault()
        const data = await fetch(getUrl('/api/user/register'), {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                email,
                password,
                confirmPassword,
                fullName
            })
        })
        const jwt_token = await data.json()
        if(jwt_token) {
            console.log(jwt_token);
            navigate('/login')
        }
    }

  return (
    <div>
        <form onSubmit={handleSignup}>
            <input value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            type="text" placeholder='email'/>
            <br/>
            <input value={password} 
            onChange={(e) => setPassword(e.target.value)} 
            type="password" placeholder='password'/>
            <br/>
            <input value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)} 
            type="password" placeholder='Confirm password'/>
            <br/>
            <button>Signup</button>
        </form>
    </div>
  )
}


export default SignUpPage