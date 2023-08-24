import {Link} from 'react-router-dom';
import AuthContext from '../context/AuthContext/AuthContext';
import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {logoutUser} from '../context/AuthContext/AuthActions';

export default function Navbar({
  darkMode,
  setDarkMode,
  userToken,
  setUserToken,
}) {
  // This should be a navigation to all the different pages for the project
  const {user, dispatch} = useContext(AuthContext);
  //Update NavBar once token is present
  const navigate = useNavigate();

  useEffect(() => {
    const updatedToken = sessionStorage.getItem('userToken');
    setUserToken(updatedToken);
  }, [userToken]);

  //Toggle Darkmode on and off
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    const html = document.documentElement;
    if (darkMode === true) {
      html.setAttribute('data-bs-theme', 'dark');
    } else if (darkMode === false) {
      html.setAttribute('data-bs-theme', 'light');
    }
  };

  const handleLogout = () => {
    logoutUser();
    dispatch({type: 'USER_LOGOUT'});
    navigate('/');
  };

  return (
    <nav className='navbar navbar-expand-lg bg-body-tertiary shadow'>
      <div className='container-fluid'>
        <Link
          className='navbar-brand'
          to='/'
        >
          Strangers Things
        </Link>
        <button
          className='navbar-toggler'
          type='button'
          data-bs-toggle='collapse'
          data-bs-target='#navbarContent'
          aria-controls='navbarContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
        >
          <span className='navbar-toggler-icon'></span>
        </button>
        <div
          className='collapse navbar-collapse'
          id='navbarContent'
        >
          <ul className='navbar-nav me-auto mb-2 mb-lg-0'>
            {!user && (
              <li className='nav-item'>
                <Link
                  className='nav-link'
                  to='/'
                >
                  Login
                </Link>
              </li>
            )}
            <li className='nav-item'>
              <Link
                className='nav-link'
                to='/posts'
              >
                Posts
              </Link>
            </li>
            {user ? (
              <>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to='/profile'
                  >
                    Profile
                  </Link>
                </li>
                <li className='nav-item'>
                  <Link
                    className='nav-link'
                    to='/'
                    onClick={() => handleLogout()}
                  >
                    Logout
                  </Link>
                </li>
              </>
            ) : null}
          </ul>
          <div className=' d-flex form-check form-switch'>
            <p>Light Mode</p>
            <input
              onClick={toggleDarkMode}
              className='form-check-input mx-2'
              type='checkbox'
              role='switch'
            />
            <p>Dark Mode</p>
          </div>
        </div>
      </div>
    </nav>
  );
}
