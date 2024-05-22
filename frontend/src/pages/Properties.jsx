import React, { useEffect, useState } from 'react'
import getUrl from '../../config'
import { useNavigate } from 'react-router-dom'
import Reservation from '../components/Reservation'

const Properties = () => {
    const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async() => {

        const data = await fetch(getUrl('/api/reservations'), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            },

        })
        setReservations(await data.json());
    }

    fetchData()

    }, [])
    const handleCreateListing = () => {
      navigate('/createlisting')
    }

    
  return (
    <>
    <button onClick={handleCreateListing}>Create new booking</button>
    <table>
    <tr>
        <th>Name</th>
        <th>Date</th>
        <th>Email</th>
        <th>Phone Number</th>
        <th>Country</th>
        <th>Price</th>
        <th>BookingSource</th>
        <th>People</th>
    </tr>
    {reservations.map(res => <Reservation reservation={res} /> )}
    </table>
    </>
  )
}

export default Properties