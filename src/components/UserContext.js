import React from 'react';

export const UserContext = React.createContext({
  username: null,
  password: null,
  setUserDetails: () => {},
});
