import { useState, useEffect } from 'react';
// API
import API from '../API';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

// eslint-disable-next-line import/prefer-default-export
export const useHomeFetch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [state, setState] = useState(initialState);
  const [loading, setLoading] = useState();
  const [error, setError] = useState();

  console.log(searchTerm);

  const fetchMovies = async page => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm, page);

      setState(prev => ({
        ...movies,
        results: [...prev.results, ...movies.results],
      }));
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  // Initial render
  useEffect(() => {
    fetchMovies(1);
  }, []);

  return {
    state, loading, error, setSearchTerm,
  };
};
