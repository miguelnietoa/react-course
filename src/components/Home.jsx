/* eslint-disable no-unused-vars */
import React from 'react';

// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components

// Hook
import { useHomeFetch } from '../hooks/useHomeFetch';
// Image
import NoImage from '../images/no_image.jpg';

function Home() {
  const { state, loading, error } = useHomeFetch();

  console.log(state);
  return <div>Home Page</div>;
}

export default Home;
