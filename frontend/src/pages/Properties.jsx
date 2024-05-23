import React, { useEffect, useState } from 'react'
import getUrl from '../../config'
import { useNavigate } from 'react-router-dom'
import Reservation from '../components/Reservation'
import Logout from '../components/Logout'
import PropTypes from 'prop-types';



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
        console.log(reservations);
    }
    fetchData()
    }, [])
    const handleCreateListing = () => {
      navigate('/createlisting')
    }
    const handleRemove = (id) => {
      setReservations(reservations.filter(reservation => reservation._id !== id));
    }
    
  return (
    <>
    <Logout/>
    <button onClick={handleCreateListing}>Create new booking</button>
    <table className='tableClass'>
        <thead>
          <tr>
            <th>Name</th>
            <th>Date</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Country</th>
            <th>Price</th>
            <th>Booking Source</th>
            <th>People</th>
            <th></th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {reservations.map(res => (
            <Reservation reservation={res} handleRemove={handleRemove} key={res._id} />
          ))}
        </tbody>
      </table>
    </>
  )
}
Reservation.propTypes = {
  reservation: PropTypes.shape({
    name: PropTypes.string.isRequired,
    timedate: PropTypes.string.isRequired,
    email: PropTypes.string,
    phoneNumber: PropTypes.string,
    country: PropTypes.string,
    price: PropTypes.number,
    bookingSource: PropTypes.string,
    partyOf: PropTypes.number,
  }).isRequired,
};
export default Properties