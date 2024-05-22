import React, { useEffect } from 'react'
import CreateListing from './CreateListing'

const Properties = () => {

    useEffect(() => {
        const fetchData = async() => {

        const data = await fetch('https://property-mng.vercel.app/api/reservations', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            },

        })
        console.log(await data.json())
    }

    fetchData()

    }, [])

    
  return (
    <button onClick={<CreateListing/>}>Create new booking</button>
  )
}

export default Properties