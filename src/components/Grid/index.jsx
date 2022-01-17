import { Wrapper, Content } from './Grid.styles';

// eslint-disable-next-line react/prop-types
function Grid({ header, children }) {
  return (
    <Wrapper>
      <h1>{header}</h1>
      <Content>{children}</Content>
    </Wrapper>
  );
}

export default Grid;
