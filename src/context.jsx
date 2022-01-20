import { useState, useMemo, createContext } from 'react';
import PropTypes from 'prop-types';

export const Context = createContext();

function UserProvider({ children }) {
  const [state, setState] = useState(undefined);
  const value = useMemo(() => ([state, setState]), [state]);

  return (
    <Context.Provider value={value}>
      {children}
    </Context.Provider>
  );
}

UserProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default UserProvider;
