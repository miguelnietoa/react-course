import PropTypes from 'prop-types';
import { useState } from 'react';

function Rate({ callback }) {
  const [value, setValue] = useState(5);

  return (
    <div>
      <h1>Rate</h1>
      <input
        type="range"
        min="1"
        max="10"
        value={value}
        onChange={e => setValue(e.target.value)}
      />
      {value}
      <p>
        <button type="button" onClick={() => callback(value)}>Rate</button>
      </p>
    </div>
  );
}

Rate.propTypes = {
  callback: PropTypes.func.isRequired,
};

export default Rate;
