import React from 'react'
import House from './../assets/House.svg'
import { useNavigate } from 'react-router-dom'


const Home = () => {
    const navigate = useNavigate();
    const handleHome = (e) => {
        e.preventDefault()
navigate('/');
    }
  return (
    <div className='home' onClick={handleHome}><img src={House}/></div>
  )
}

export default Home