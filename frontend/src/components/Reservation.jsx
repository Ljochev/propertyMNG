import React, { useState } from 'react';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';
import Button from './Button';
import { useNavigate } from 'react-router-dom'

const Reservation = ({ reservation, handleRemove }) => {
  const { name, timedate, email, phoneNumber, country, price, bookingSource, partyOf, _id} = reservation;
  const navigate = useNavigate();
  
  const handleEdit = (e) => {
    e.preventDefault();
    console.log(_id);
    navigate(`/createlisting?q=${_id}`)
  }

  const formattedDate = new Date(timedate).toLocaleDateString(); // Format date to a readable string
  return (
    <tr>
      <td>{name}</td>
      <td>{formattedDate}</td>
      <td>{email}</td>
      <td>{phoneNumber}</td>
      <td>{country}</td>
      <td>{price}</td>
      <td>{bookingSource}</td>
      <td>{partyOf}</td>
      <td><Button handleFn={handleEdit} btnName={"edit"}/></td>
      <td><DeleteButton reservation={_id} removeReservation={handleRemove}/></td>
    </tr>
  );
};
export default Reservation;