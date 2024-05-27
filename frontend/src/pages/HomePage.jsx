import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useJwt } from 'react-jwt';
import './homePage.css';
import ShowData from '../components/ShowData';
import myPicture from './../assets/IMG_9483.jpg';
import Button from './../components/Button';

const HomePage = () => {
  const navigate = useNavigate();
  const { decodedToken, isExpired } = useJwt(localStorage.getItem('jwt_token'));

  
  const handleReservation = (e) => {
      e.preventDefault();
        const jwt_token = localStorage.getItem('jwt_token');
        if (!jwt_token || isExpired) 
          localStorage.removeItem('jwt_token');
    if (!jwt_token || isExpired) {
        alert("Please Login to list propertyes")
      navigate('/');
    } else {
      navigate('/Properties');
    }
  };

  return (
    <div className='home-page'>
      <Button handleFn={handleReservation} btnName={'My Properties'} />
      <ShowData
        name={'Kostadin'}
        lastName={'Ljochev'}
        phoneNumber={'078-951-069'}
        birthday={'18-01-1990'}
        email={'ljochev@gmail.com'}
        myPicture={myPicture}
      />
      <h2>Welcome to my first fullstack React - Node project</h2>
      <p>
        This project is designed to support multiple users, each managing multiple properties. The primary features include property management and the ability for users to create and share posts about their properties. These posts will be visible to all visitors of the website, enhancing transparency and interaction between property owners and potential guests.
      </p>
      <h2>Key Features</h2>
      <ul>
        <li><strong>User Management</strong>:
          <ul>
            <li>Robust user authentication and authorization to ensure secure access.</li>
            <li>User profiles for managing personal information and property listings.</li>
          </ul>
        </li>
        <li><strong>Property Management</strong>:
          <ul>
            <li>Comprehensive tools for users to add, edit, and delete property details.</li>
            <li>Categorization and tagging of properties for easy navigation and searchability.</li>
          </ul>
        </li>
        <li><strong>Public Posts</strong>:
          <ul>
            <li>Users can create posts about their properties, including updates, special offers, and news.</li>
            <li>All posts will be publicly visible, providing valuable information to potential guests and visitors.</li>
          </ul>
        </li>
        <li><strong>Visitor Interaction</strong>:
          <ul>
            <li>Guests can browse properties and view posts without needing an account.</li>
            <li>Search and filter functionalities to help visitors find relevant properties and posts quickly.</li>
          </ul>
        </li>
        <li><strong>Scalable Backend</strong>:
          <ul>
            <li>Built with Node.js and Express to handle multiple users and properties efficiently.</li>
            <li>MongoDB is used for data storage, ensuring flexibility and scalability.</li>
          </ul>
        </li>
        <li><strong>Responsive Frontend</strong>:
          <ul>
            <li>Developed using React for a dynamic and responsive user interface.</li>
            <li>Intuitive navigation and user-friendly design to enhance user experience.</li>
          </ul>
        </li>
      </ul>

      <h2>Future Enhancements</h2>
      <ul>
        <li><strong>Booking System</strong>: Implement a booking feature for guests to reserve properties directly through the platform.</li>
        <li><strong>Rating and Reviews</strong>: Allow guests to rate properties and leave reviews, providing feedback to property owners and information to future guests.</li>
        <li><strong>Notification System</strong>: Notify users of new posts, updates to their properties, and other relevant activities.</li>
      </ul>
    </div>
  );
};

export default HomePage;