import PropTypes from 'prop-types';
import { Component } from 'react';
// Image
import searchIcon from '../../images/search-icon.svg';
// Styles
import { Wrapper, Content } from './SearchBar.styles';

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
    this.timeout = null;
  }

  componentDidUpdate(_prevProps, prevState) {
    const { value } = this.state;
    if (value !== prevState.value) {
      const { setSearchTerm } = this.props;

      clearTimeout(this.timeout);

      this.timeout = setTimeout(() => {
        setSearchTerm(value);
      }, 500);
    }
  }

  render() {
    const { value } = this.state;

    return (
      <Wrapper>
        <Content>
          <img src={searchIcon} alt="search" />
          <input
            type="text"
            placeholder="Search Movie"
            onChange={event => this.setState({ value: event.target.value })}
            value={value}
          />
        </Content>
      </Wrapper>
    );
  }
}

SearchBar.propTypes = {
  setSearchTerm: PropTypes.func.isRequired,
};

export default SearchBar;
