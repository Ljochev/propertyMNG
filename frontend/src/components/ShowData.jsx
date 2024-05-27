import React from 'react'
const ShowData = ({name, lastName, phoneNumber, birthday, email, myPicture}) => {
  return (
    <div className='infoCard'>
        <img src={myPicture} className='infoPicture'/>
        <div className='nameCard'><h2>{name} {lastName}</h2></div>

    <table>
    <tr>
            <td className='dobCard'>Phone Number:</td>
            <td className='dobCard1'>{phoneNumber}</td>

        </tr>
        <tr>
            <td className='dobCard'>Birthday:</td>
            <td className='dobCard1'>{birthday}</td>

        </tr>
        <tr>
            <td className='dobCard'>email:</td>
            <td className='dobCard1'>{email}</td>
        </tr>
    </table>

    <div className='socialSection'>
        <button className='socialButton'><a href="https://github.com/Ljochev">GitHub</a></button>
        <button className='socialButton'><a href="https://www.linkedin.com/in/kostadin-ljochev-6b067092/">Linkedin</a></button>
    </div>
    </div>
  )
}

export default ShowData