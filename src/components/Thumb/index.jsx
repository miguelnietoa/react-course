import { Link } from 'react-router-dom';

import { Image } from './Thumb.styles';

// eslint-disable-next-line react/prop-types
function Thumb({ image, movieId, clickable }) {
  return (
    <div>
      { clickable
        ? (
          <Link to={`/${movieId}`}>
            <Image src={image} alt="movie-thumb" />
          </Link>
        )
        : <Image src={image} alt="movie-thumb" />}
    </div>
  );
}

export default Thumb;
