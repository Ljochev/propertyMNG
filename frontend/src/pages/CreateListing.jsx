import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getUrl from '../../config'
const CreateListing = () => {

    const [name, setName] = useState('');
    const [timedate, setTimedate] = useState(new Date());
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState();
    const [bookingSource, setBookingSource] = useState('Booking.com');
    const [partyOf, setPartyOf] = useState();

    const navigate = useNavigate(); 

    const handleCreate = async (e) => {
        e.preventDefault()
        const data = await fetch(getUrl('/api/reservations'), {
            method: 'POST',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            },

            body: JSON.stringify({
                name,
                timedate,
                email,
                phoneNumber,
                country,
                price,
                bookingSource,
                partyOf
            })
        })

            navigate('/properties')
        }
    




  return (
    <div>
        <form onSubmit={handleCreate}>
            <label htmlFor="name">Full Name </label>
            <input value={name} id="name"
            onChange={(e) => setName(e.target.value)} 
            type="text" placeholder='Full Name'/>
            <br/>
            <label htmlFor="timedate">Date </label>
            <input value={timedate} id="timedate"
            onChange={(e) => setTimedate(e.target.value)} 
            type="date"/>
            <br/>
            <label htmlFor="email">email </label>
            <input value={email} id="email"
            onChange={(e) => setEmail(e.target.value)} 
            type="text" placeholder='someone@something.com'/>
            <br/>
            <label htmlFor="phoneNumber">Phone number </label>
            <input value={phoneNumber} id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)} 
            type="tel" placeholder='phoneNumber'/>
            <br/>
            <label htmlFor="country">Country </label>
            <input value={country} id="country"
            onChange={(e) => setCountry(e.target.value)} 
            type="text" placeholder='Country'/>
            <br/>
            <label htmlFor="price">Price </label>
            <input value={price} id="price"
            onChange={(e) => setPrice(e.target.value)} 
            type="number" placeholder='Price'/>
            <br/>
            <label htmlFor="bookingSource">Booking source </label>
            <input value={bookingSource} id="bookingSource"
            onChange={(e) => setBookingSource(e.target.value)} 
            type="text" placeholder='BookingSource'/>
            <br/>
            <label htmlFor="partyOf">Number of people </label>
            <input value={partyOf} id="partyOf"
            onChange={(e) => setPartyOf(e.target.value)} 
            type="number" placeholder='Number of people'/>
            <br/>
            <button>Create</button>
        </form>
    </div>
  )
}

export default CreateListing