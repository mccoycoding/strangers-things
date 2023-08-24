import {useState, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {register} from '../context/AuthContext/AuthActions.js';
import AuthContext from '../context/AuthContext/AuthContext';

export default function RegisterForm() {
  const {user, isError, message, isLoading, dispatch} = useContext(AuthContext);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleClick = async () => {
    dispatch({type: 'SET_LOADING'});
    const result = await register(username, password);

    if (result.error) {
      dispatch({type: 'USER_AUTH_ERROR', payload: result.error});
    }
    if (result.token) {
      dispatch({type: 'USER_REGISTER', payload: result.token});
      navigate('/profile');
    }
  };

  return (
    <form
      className='mx-5'
      onSubmit={(e) => e.preventDefault()}
    >
      <div className='form-floating mb-3 mx-5'>
        <input
          className='form-control'
          type='text'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <label className='form-label'>Username</label>
      </div>
      <div className='form-floating mb-3 mx-5'>
        <input
          className='form-control'
          type='password'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className='form-label'>Password</label>
      </div>
      <button
        className='btn btn-primary btn-lg'
        type='submit'
        onClick={() => handleClick()}
      >
        Log in
      </button>
    </form>
  );
}
