import {createContext, useReducer} from 'react';
import authReducer from './AuthReducer';
const AuthContext = createContext();

export const AuthProvider = ({children}) => {
  const user = JSON.parse(sessionStorage.getItem('user'));

  const initialState = {
    user: user ? user : null,
    isError: false,
    isLoading: false,
    message: '',
  };

  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthContext.Provider value={{...state, dispatch}}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
