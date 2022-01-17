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

  const fetchMovies = async (page, searchTerm_ = '') => {
    try {
      setError(false);
      setLoading(true);

      const movies = await API.fetchMovies(searchTerm_.trim(), page);

      setState(prev => ({
        ...movies,
        results: [...prev.results, ...movies.results],
      }));
      setLoading(false);
    } catch (err) {
      setError(true);
    }
  };

  // Initial and search
  useEffect(() => {
    setState(initialState);
    fetchMovies(1, searchTerm);
  }, [searchTerm]);

  return {
    state, loading, error, searchTerm, setSearchTerm,
  };
};
