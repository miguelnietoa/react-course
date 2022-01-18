/* eslint-disable max-len */
import { useState, useEffect, useRef } from 'react';
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './SearchBar.styles';

// eslint-disable-next-line react/prop-types
function SearchBar({ setSearchTerm }) {
  const [state, setState] = useState('');
  const initial = useRef(true);

  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return undefined;
    }

    const timer = setTimeout(() => {
      setSearchTerm(state);
    }, 500);

    return () => clearTimeout(timer);
  }, [setSearchTerm, state]);

  return (
    <Wrapper>
      <Content>
        <img src={searchIcon} alt="search" />
        <input
          type="text"
          placeholder="Search Movie"
          onChange={event => setState(event.target.value)}
          value={state}
        />
      </Content>
    </Wrapper>
  );
}

export default SearchBar;
