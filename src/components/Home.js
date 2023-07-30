



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';
import { UnsplashImage } from './UnsplashImage';
import { Loader } from './Loader';
import { createGlobalStyle } from 'styled-components';
import styled from 'styled-components';
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

// Style
const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: ${(props) => (props.darkMode ? '#222' : '#fff')};
    color: ${(props) => (props.darkMode ? '#fff' : '#222')};
  }
`;

const WrapperImages = styled.section`
  max-width: 75rem;
  height: auto;
  margin: 6rem auto;
  display: grid;
  grid-gap: 2em;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-auto-rows: 450px;
`;

const CACHE_KEY = 'unsplashImages'; // Cache key for localStorage
const CACHE_EXPIRATION = 19000; // Cache expiration time in seconds (1 hour)

const Home = () => {
  const [images, setImages] = useState([]);
  const [likedImages, setLikedImages] = useState([]);
  const [darkMode, setDarkMode] = useState(false); // New state for dark mode

  useEffect(() => {
    // Check if cached data exists and is not expired
    const cachedData = JSON.parse(localStorage.getItem(CACHE_KEY));
    if (cachedData && Date.now() - cachedData.timestamp < CACHE_EXPIRATION * 1000) {
      setImages(cachedData.images);
    } else {
      fetchImages();
    }
  }, []);

  const fetchImages = (count = 10) => {
    const apiRoot = 'https://api.unsplash.com';
    const accessKey = process.env.REACT_APP_ACCESSKEY;

    axios
      .get(`${apiRoot}/photos/random?client_id=${accessKey}&count=${count}`)
      .then((res) => {
        const newImages = res.data.map((image) => ({
          ...image,
          comments: [],
        }));
        setImages((prevImages) => [...prevImages, ...newImages]);

        // Cache the new data in localStorage
        const cacheData = {
          timestamp: Date.now(),
          images: [...images, ...newImages],
        };
        localStorage.setItem(CACHE_KEY, JSON.stringify(cacheData));
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleLike = (imageId) => {
    setImages((prevImages) =>
      prevImages.map((image) =>
        image.id === imageId ? { ...image, likes: image.likes + 1 } : image
      )
    );

    // Check if the image is already liked
    if (likedImages.includes(imageId)) {
      // Unlike the image
      setLikedImages((prevLikedImages) => prevLikedImages.filter((id) => id !== imageId));
      setImages((prevImages) =>
        prevImages.map((image) =>
          image.id === imageId ? { ...image, likes: image.likes - 2 } : image
        )
      );
    } else {
      // Like the image
      setLikedImages((prevLikedImages) => [...prevLikedImages, imageId]);
    }
  };

  const handleDarkModeToggle = () => {
    setDarkMode((prevDarkMode) => !prevDarkMode);
  };

  return (
    <>
      <div>
        <div className="nav1">
          <h1>FEEDS</h1>
          <h6>Infinite Scrolling Application using unsplash API</h6>
        </div>
        <button onClick={handleDarkModeToggle}>Toggle Dark mode</button>
        {/* Add a button to toggle dark mode */}
        <GlobalStyle darkMode={darkMode} /> {/* Apply dark mode styles */}
        <InfiniteScroll dataLength={images.length} next={fetchImages} hasMore={true} loader={<Loader />}>
          <WrapperImages style={{ background: darkMode ? '#333' : 'white' }}>
            {images.map((image) => (
              <div className="imgsec">
                <div key={image.id} style={{ padding: '1vw', borderRadius: '5px' }}>
                  <Link to={`/profile/${image.user.username}`}>
                    <b>@{image.user.username} </b>
                  </Link>
                  <p>
                    <i>Location: {image.location.country}</i>
                  </p>

                  <UnsplashImage url={image.urls.thumb} style={{ height: '200px' }} />
                  <p style={{ display: 'inlineFlex', JustifyContent: 'spaceBetween', position: 'relative' }}>
                    Resolutions: <Link to={image.urls.raw}>Raw</Link> <Link to={image.urls.full}>Full</Link>{' '}
                    <Link to={image.urls.regular}>Regular</Link>{' '}
                  </p>

                  <div style={{ borderRadius: '2px' }}>
                    <div className="like">
                      <button onClick={() => handleLike(image.id)}>
                        {likedImages.includes(image.id) ? (
                          <AiFillHeart size={22} color="red" />
                        ) : (
                          <AiOutlineHeart size={22} color="black" />
                        )}
                      </button>
                      <p>Likes: {image.likes}</p>
                    </div>
                  </div>
                  <h>
                    <b>About:</b> {image.alt_description}
                  </h>
                </div>
              </div>
            ))}
          </WrapperImages>
        </InfiniteScroll>
      </div>
    </>
  );
};

export default Home;
