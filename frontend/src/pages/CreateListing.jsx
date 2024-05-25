import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getUrl from '../../config'
import './properties.css'
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
    <div className='create-reservation'>
    <form className="createListing" onSubmit={handleCreate}>
    <div className="form-group">
        {/* <label htmlFor="name">Full Name</label> */}
        <input
            value={name}
            id="name"
            onChange={(e) => setName(e.target.value)}
            type="text"
            placeholder="Full Name"
        />
    </div>
    <div className="form-group">
        {/* <label htmlFor="timedate">Date</label> */}
        <input
            value={timedate}
            id="timedate"
            onChange={(e) => setTimedate(e.target.value)}
            type="date"
        />
    </div>
    <div className="form-group">
        {/* <label htmlFor="email">Email</label> */}
        <input
            value={email}
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="someone@something.com"
        />
    </div>
    <div className="form-group">
        {/* <label htmlFor="phoneNumber">Phone Number</label> */}
        <input
            value={phoneNumber}
            id="phoneNumber"
            onChange={(e) => setPhoneNumber(e.target.value)}
            type="tel"
            placeholder="Phone Number"
        />
    </div>
    <div className="form-group">
        {/* <label htmlFor="country">Country</label> */}
        <input
            value={country}
            id="country"
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            placeholder="Country"
        />
    </div>
    <div className="form-group">
        {/* <label htmlFor="price">Price</label> */}
        <input
            value={price}
            id="price"
            onChange={(e) => setPrice(e.target.value)}
            type="number"
            placeholder="Price"
        />
    </div>
    <div className="form-group">
        {/* <label htmlFor="bookingSource">Booking Source</label> */}
        <input
            value={bookingSource}
            id="bookingSource"
            onChange={(e) => setBookingSource(e.target.value)}
            type="text"
            placeholder="Booking Source"
        />
    </div>
    <div className="form-group">
        {/* <label htmlFor="partyOf">Number of People</label> */}
        <input
            value={partyOf}
            id="partyOf"
            onChange={(e) => setPartyOf(e.target.value)}
            type="number"
            placeholder="Number of People"
        />
    </div>
    <button type="submit" className="submit-btn">Create</button>
</form>
</div>
  )
}

export default CreateListing