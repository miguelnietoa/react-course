/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
// Config
import { POSTER_SIZE, BACKDROP_SIZE, IMAGE_BASE_URL } from '../config';
// Components
import HeroImage from './HeroImage';
import Grid from './Grid';
import Thumb from './Thumb';
import Spinner from './Spinner';
import SearchBar from './SearchBar';
import Button from './Button';
// API
import API from '../API';
// Image
import NoImage from '../images/no_image.jpg';

const initialState = {
  page: 0,
  results: [],
  total_pages: 0,
  total_results: 0,
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movies: initialState,
      searchTerm: '',
      isLoadingMore: false,
      loading: false,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchMovies(1);
  }

  fetchMovies = async (page, searchTerm_ = '') => {
    try {
      this.setState({ error: false, loading: true });

      const movies = await API.fetchMovies(searchTerm_.trim(), page);

      this.setState(prev => ({
        ...prev,
        movies: {
          ...movies,
          results: [...prev.movies.results, ...movies.results],
        },
        loading: false,
      }));
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  };

  handleSearch = searchTerm => this.setState(
    { movies: initialState, searchTerm },
    () => this.fetchMovies(1, this.state.searchTerm),
  );

  handleLoadMore = () => this.fetchMovies(this.state.movies.page + 1, this.state.searchTerm);

  render() {
    const {
      movies, searchTerm, loading, error,
    } = this.state;

    if (error) return <div>Something went wrong ...</div>;

    return (
      <>
        { !searchTerm && movies.results[0]
          ? (
            <HeroImage
              image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${movies.results[0].backdrop_path}`}
              title={movies.results[0].original_title}
              text={movies.results[0].overview}
            />
          )
          : null}
        <SearchBar setSearchTerm={this.handleSearch} />
        <Grid header={searchTerm ? 'Search Result' : 'Popular Movies'}>
          {movies.results.map(movie => ((
            <Thumb
              key={movie.id}
              clickable
              image={
                movie.poster_path
                  ? `${IMAGE_BASE_URL}${POSTER_SIZE}${movie.poster_path}`
                  : NoImage
              }
              movieId={movie.id}
            />
          )))}
        </Grid>
        { loading && <Spinner /> }
        { movies.page < movies.total_pages && !loading && (
          <Button text="Load More" callback={() => this.handleLoadMore(true)} />
        )}
      </>
    );
  }
}

export default Home;
