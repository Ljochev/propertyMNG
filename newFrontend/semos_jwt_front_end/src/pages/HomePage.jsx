import React, { useEffect } from 'react'

const HomePage = () => {

    useEffect(() => {
        const fetchData = async() => {

        const data = await fetch('http://localhost:3000/api/recepie/name', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt_token')}`,
                'Content-Type': 'application/json'
            },

        })
        console.log(await data.json())
    }

    fetchData()

    }, [])

  return (
    <div>HomePage</div>
  )
}

export default HomePage