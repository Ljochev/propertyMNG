import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation} from 'react-router-dom'
import getUrl from '../../config'
import './properties.css'

const useQuery = () => {
    const {state} = useLocation();
    const { reservation } = state; // Read values passed on state
    console.log(reservation);
    return new URLSearchParams(useLocation().search);
}

const CreateListing = () => {

    const query = useQuery();
    const searchTerm = useState(query.get('q'));
    const [name, setName] = useState('');
    const [timedate, setTimedate] = useState(new Date().toISOString().slice(0, 10));
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [country, setCountry] = useState('');
    const [price, setPrice] = useState();
    const [bookingSource, setBookingSource] = useState('Booking.com');
    const [partyOf, setPartyOf] = useState();
    const [reservation, setReservation] = useState({});
    const navigate = useNavigate(); 

    useEffect(() => {
        if (searchTerm !== null) {
          const fetchData = async () => {
            const data = await fetch(getUrl(`/api/reservations?_id=${searchTerm[0]}`), {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
              }
            });
            const result = await data.json();
            console.log("This is the result",result[0]);
            setReservation(result[0]);
            setName(result[0].name);
            setTimedate(new Date(result[0].timedate).toISOString().slice(0, 10));
            setEmail(result[0].email);
            setPhoneNumber(result[0].phoneNumber);
            setCountry(result[0].country);
            setPrice(result[0].price);
            setBookingSource(result[0].bookingSource);
            setPartyOf(result[0].partyOf);
          };
          fetchData();
        }
      }, []);

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

        const handleEdit = async (e) => {
            e.preventDefault();
            const data = await fetch(getUrl(`/api/reservations/${reservation._id}`), {
              method: 'PUT',
              headers: {
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
            });
            navigate('/properties');
          };



  return (
    <div className='create-reservation'>
    <form className="createListing" 
    onSubmit={
        searchTerm[0]? handleEdit : handleCreate
        }>
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
    <button type="submit" className="submit-btn">{searchTerm[0]? 'Finish edit' : 'Create'}</button>
</form>
</div>
  )
}

export default CreateListing