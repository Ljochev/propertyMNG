import React from 'react';
import PropTypes from 'prop-types';
import DeleteButton from './DeleteButton';

const Reservation = ({ reservation, handleRemove }) => {
  const { name, timedate, email, phoneNumber, country, price, bookingSource, partyOf, _id} = reservation;

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
      <td>ediit</td>
      <td><DeleteButton reservation={_id} removeReservation={handleRemove}/></td>
    </tr>
  );
};
export default Reservation;