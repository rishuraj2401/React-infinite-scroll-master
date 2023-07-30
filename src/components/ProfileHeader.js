import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { FaUser } from 'react-icons/fa';
import { UnsplashImage } from './UnsplashImage';

const ProfileHeader = () => {
  const [userDetails, setUserDetails] = useState(null);
  const [viewType, setViewType] = useState('grid'); // 'grid' or 'list'
  const { username } = useParams();
  const accessKey = process.env.REACT_APP_ACCESSKEY;
  const [darkMode, setDarkMode] = useState(false); // State for dark mode
  const [Image, setImage] = useState([]);

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.unsplash.com/users/${username}?client_id=${accessKey}`
        );
        setUserDetails(response.data);
        const newImages = response.data.photos.map((image) => ({
          ...image,
        }));
        setImage((prevImages) => [...prevImages, ...newImages]);
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    };

    fetchUserDetails();
  }, [username]);

  const toggleView = () => {
    setViewType((prevType) => (prevType === 'grid' ? 'list' : 'grid'));
  };

  const toggleDarkMode = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  if (!userDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className={darkMode ? 'dark-mode' : 'light-mode'}>
      <div className="nav1">
        <h1>User Profile</h1>
        <h6>Infinite Scrolling Application using Unsplash API</h6>
        
      </div>
      <button onClick={toggleDarkMode} style={{ marginLeft: '1rem' ,position :"absolute"}}>
        Toggle Dark Mode
      </button>
      <div className="proinfo">
        <div className="dp">
          <img
            src={userDetails.profile_image.large}
            alt={<FaUser />}
            style={{ borderRadius: '80px' }}
          />
        </div>
        <div className="info1">
          <h3>
            {userDetails.first_name} {userDetails.last_name}
          </h3>
          <h5>@{userDetails.username}</h5>
          <h4>Bio: {userDetails.bio}</h4>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.5vw 2vw 0.5vw 2vw', backgroundColor: 'grey' }}>
        <h4>
          Followers: <i>{userDetails.followers_count}</i>
        </h4>
        <h4>
          Followings: <i>{userDetails.following_count}</i>
        </h4>
      </div>
      <br />
      <button onClick={toggleView} style={{ height: '3vw', minHeight: '30px' }}>
        Switch to {viewType === 'grid' ? 'List' : 'Grid'} View
      </button>
     
      <div className={viewType === 'grid' ? 'grid-container' : 'list-container'}>
        {userDetails.photos.map((image) => (
          <div key={image.id} className={viewType === 'grid' ? 'grid-item' : 'list-item'}>
            <UnsplashImage url={image.urls.thumb} />
            <p>
              Resolution: <Link to={image.urls.full}>Full</Link> <Link to={image.urls.raw}>Raw</Link>{' '}
              <Link to={image.urls.regular}>Regular</Link>
            </p>
            <p>Uploaded on:{image.created_at}</p>
            <p>{image.slug} </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfileHeader;
