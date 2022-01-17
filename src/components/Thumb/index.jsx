/* eslint-disable no-unused-vars */
import { Image } from './Thumb.styles';

// eslint-disable-next-line react/prop-types
function Thumb({ image, movieId, clickable }) {
  return (
    <div>
      <Image src={image} alt="movie-thumb" />
    </div>
  );
}

export default Thumb;
