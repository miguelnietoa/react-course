/* eslint-disable no-unused-vars */
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
// Hook
import { useMovieFetch } from '../hooks/useMovieFetch';
// Image
import NoImage from '../images/no_image.jpg';

function Movie() {
  const { movieId } = useParams();
  const { state: movie, loading, error } = useMovieFetch(movieId);

  if (loading) return <Spinner />;
  if (error) return <div>Something went wrong ...</div>;
  return (
    <>
      <BreadCrumb movieTitle={movie.original_title} />
      <p>Hello</p>
    </>
  );
}

export default Movie;
