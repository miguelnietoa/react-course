import { Link } from 'react-router-dom';
// Styles
import { Wrapper, Content } from './BreadCrumb.styles';

// eslint-disable-next-line react/prop-types
function BreadCrumb({ movieTitle }) {
  return (
    <Wrapper>
      <Content>
        <Link to="/">
          <span>Home</span>
        </Link>
        <span>|</span>
        <span>{movieTitle}</span>
      </Content>
    </Wrapper>
  );
}

export default BreadCrumb;
