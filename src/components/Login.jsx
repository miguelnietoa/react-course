/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable no-unused-vars */
import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../API';
// Components
import Button from './Button';
// Styles
import { Wrapper } from './Login.styles';
// Context
import { Context } from '../context';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const [_user, setUser] = useContext(Context);
  const navigate = useNavigate();

  const handleSubmit = async () => {
    setError(false);
    try {
      const requestToken = await API.getRequestToken();
      const sessionId = await API.authenticate(
        requestToken,
        username,
        password,
      );
      setUser({ sessionId: sessionId.session_id, username });
      navigate('/');
    } catch (err) {
      setError(true);
    }
  };

  const handleInput = e => {
    const { name, value } = e.target;
    if (name === 'username') setUsername(value);
    if (name === 'password') setPassword(value);
  };

  return (
    <Wrapper>
      { error && <div className="error">Invalid username or password</div> }
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        id="username"
        value={username}
        name="username"
        onChange={handleInput}
      />
      <input
        type="password"
        value={password}
        name="password"
        onChange={handleInput}
      />
      <Button callback={handleSubmit} text="Login" />
    </Wrapper>
  );
}

export default Login;
