import React from 'react'

const Reservation = ({reservation}) => {
  return (
    <tr>
        <td>{reservation.name}</td>
        <td>{reservation.timedate}</td>
        <td>{reservation.email}</td>
        <td>{reservation.phoneNumber}</td>
        <td>{reservation.country}</td>
        <td>{reservation.price}</td>
        <td>{reservation.bookingSource}</td>
        <td>{reservation.partyOf}</td>
    </tr>
  )
}

export default Reservation