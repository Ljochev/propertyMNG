import React, { useEffect, useState } from 'react'
import getUrl from '../../config'
import { useNavigate } from 'react-router-dom'
import Reservation from '../components/Reservation'
import PropTypes from 'prop-types';
import './properties.css';
import Button from '../components/Button';



const Properties = () => {
  const [name, setName] = useState('');
  const [timedate, setTimedate] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [country, setCountry] = useState('');
  const [price, setPrice] = useState('');
  const [bookingSource, setBookingSource] = useState('');
  const [partyOf, setPartyOf] = useState('');
  const [reservations, setReservations] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(getUrl(`/api/reservations`), {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
          'Content-Type': 'application/json',
        },
      });
      const result = await response.json();
      setReservations(result);
    };
    fetchData();
  }, []);

  const handleSearch = async (key, value) => {
    const response = await fetch(getUrl(`/api/reservations/search?${key}=${value}`), {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
        'Content-Type': 'application/json',
      },
    });
    const result = await response.json();
    console.log(result);
    setReservations(result);
    setName('');
    setTimedate('');
    setEmail('');
    setPhoneNumber('');

}


const handleSearchName = (e) => {
  e.preventDefault();
  handleSearch('name', name);
};

const handleSearchTimedate = (e) => {
  e.preventDefault();
  handleSearch('timedate', timedate);
};

const handleSearchEmail = (e) => {
  e.preventDefault();
  handleSearch('email', email);
};

const handleSearchPhoneNumber = (e) => {
  e.preventDefault();
  handleSearch('phoneNumber', phoneNumber);
};

  const handleCreateListing = (e) => {
    e.preventDefault();
    navigate('/createlisting');
  };

    const handleRemove = (id) => {
      setReservations(reservations.filter(reservation => reservation._id !== id));
    }
    
  return (
    <div className='reservation-list'>
    
    <Button handleFn={handleCreateListing} btnName={'Create new reservation'}/>
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
          <tr>
          <td>
              <form className='signupClass' onSubmit={handleSearchName}>
                <input
                  value={name}
                  id='name'
                  onChange={(e) => setName(e.target.value)}
                  type='text'
                  placeholder='Name'
                />
                <button type='submit'>Search</button>
              </form>
            </td>
            <td>
            <form className='signupClass' onSubmit={handleSearchTimedate}>
                <input
                  value={timedate}
                  id='timedate'
                  onChange={(e) => setTimedate(e.target.value)}
                  type='date'
                  placeholder='Date'
                />
                <button type='submit'>Search</button>
              </form> 
            </td>
            <td><form className='signupClass' onSubmit={handleSearchEmail}>
                <input
                  value={email}
                  id='email'
                  onChange={(e) => setEmail(e.target.value)}
                  type='email'
                  placeholder='Email'
                />
                <button type='submit'>Search</button>
              </form></td>
            <td><form className='signupClass' onSubmit={handleSearchPhoneNumber}>
                <input
                  value={phoneNumber}
                  id='phoneNumber'
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  type='tel'
                  placeholder='Phone'
                />
                <button type='submit'>Search</button>
              </form></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          {reservations.map(res => (
            <Reservation reservation={res} handleRemove={handleRemove} key={res._id} />
          ))}
        </tbody>
      </table>
      </div>
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