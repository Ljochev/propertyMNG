import React from 'react'
import getUrl from '../../config';
import { useNavigate } from 'react-router-dom'


const DeleteButton = ({reservation}) => {

    const navigate = useNavigate();
    const handleDelete = async (e) => {
        console.log("In handleDelete DelteButton");
        e.preventDefault()
        const data = await fetch(getUrl(`/api/reservations/${reservation}`), {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                
            })
        })

            navigate('/properties')
    }


  return (
    <button onClick={handleDelete}>Delete</button>
  )
}

export default DeleteButton