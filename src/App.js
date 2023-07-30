import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  BrowserRouter as Router, Routes ,Route, useParams } from 'react-router-dom';
import InfiniteScroll from 'react-infinite-scroll-component';

import { Heading } from './components/Heading';
import { UnsplashImage } from './components/UnsplashImage';
import { Loader } from './components/Loader';

import styled from 'styled-components';
import { createGlobalStyle } from 'styled-components';
import ProfileHeader from './components/ProfileHeader';
import Home from './components/Home';
import "./App.css";
function App() {

const username=useParams();


  return ( 
       <>
  {/* // <Home/> */}

  <Router>
      <Routes>
        <Route exact path="/" element={<Home/>} ></Route>
        <Route path="/profile/:username" element={<ProfileHeader />}></Route>
        {/* <Route path="*" component={NotFound} /> */}
      {/* </Switch> */}
      </Routes>
    </Router>
    
       </>
        
  
     
  );
}

export default App;
