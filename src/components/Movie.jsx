/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
/* eslint-disable react/destructuring-assignment */
import { Component } from 'react';
import { useParams } from 'react-router-dom';
// Config
import { IMAGE_BASE_URL, POSTER_SIZE } from '../config';
// Components
import BreadCrumb from './BreadCrumb';
import Grid from './Grid';
import Spinner from './Spinner';
import MovieInfo from './MovieInfo';
import MovieInfoBar from './MovieInfoBar';
import Actor from './Actor';
// API
import API from '../API';
// Image
import NoImage from '../images/no_image.jpg';

class Movie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movie: {},
      loading: true,
      error: false,
    };
  }

  componentDidMount() {
    this.fetchMovie();
  }

  fetchMovie = async () => {
    const { movieId } = this.props.params;

    try {
      this.setState({ error: false, loading: true });

      const movie = await API.fetchMovie(movieId);
      const credits = await API.fetchCredits(movieId);
      // Get directors only
      const directors = credits.crew.filter(
        member => member.job === 'Director',
      );

      this.setState({
        movie: {
          ...movie,
          actors: credits.cast,
          directors,
        },
        loading: false,
      });
    } catch (err) {
      this.setState({ error: true, loading: false });
    }
  };

  render() {
    const { movie, loading, error } = this.state;

    if (loading) return <Spinner />;
    if (error) return <div>Something went wrong ...</div>;
    return (
      <>
        <BreadCrumb movieTitle={movie.original_title} />
        <MovieInfo movie={movie} />
        <MovieInfoBar
          time={movie.runtime}
          budget={movie.budget}
          revenue={movie.revenue}
        />
        <Grid header="Actors">
          {movie.actors.map(
            actor => (
              <Actor
                key={actor.credit_id}
                name={actor.name}
                character={actor.character}
                imageUrl={
                  actor.profile_path
                    ? `${IMAGE_BASE_URL}${POSTER_SIZE}${actor.profile_path}`
                    : NoImage
                }
              />
            ),
          )}
        </Grid>
      </>
    );
  }
}

function MovieWithParams(props) {
  return <Movie {...props} params={useParams()} />;
}

export default MovieWithParams;
