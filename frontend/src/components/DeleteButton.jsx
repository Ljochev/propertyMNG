import React from 'react'
import getUrl from '../../config';
import { useNavigate } from 'react-router-dom'


const DeleteButton = ({reservation, removeReservation}) => {

    const navigate = useNavigate();
    const handleDelete = async (e) => {
      e.preventDefault()
      try {
        await fetch(getUrl(`/api/reservations/${reservation}`), {
          method: 'DELETE',
          headers:{
            'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
            'Content-Type': 'application/json'
          }
        })
        removeReservation(reservation);
            navigate('/properties')
    } catch(err) {
      alert(err);
  } 

  }


  return (
    <button type="button" onClick={handleDelete}>Delete</button>
  )
}

export default DeleteButton