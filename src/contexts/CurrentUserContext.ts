import { createContext } from 'react';

export const UserContext = createContext({
  _id: '',
  name: '',
  email: '',
});
