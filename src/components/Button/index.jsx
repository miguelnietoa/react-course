import { Wrapper } from './Button.styles';

// eslint-disable-next-line react/prop-types
function Button({ text, callback }) {
  return (
    <Wrapper type="button" onClick={callback}>
      {text}
    </Wrapper>
  );
}

export default Button;
