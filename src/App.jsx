import {BrowserRouter, Routes, Route} from 'react-router-dom';
//Page Imports for Routing
import Register from './pages/Register';
import Login from './pages/Login';
import Posts from './pages/Posts';
import Profile from './pages/Profile';
import PostDetails from './pages/PostDetails';
import Navbar from './components/Navbar';
import {useState} from 'react';
import {AuthProvider} from './context/AuthContext/AuthContext';

function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [userToken, setUserToken] = useState(null);

  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <Navbar
            darkMode={darkMode}
            setDarkMode={setDarkMode}
            userToken={userToken}
            setUserToken={setUserToken}
          />
          <Routes>
            <Route
              path='/'
              element={<Login setUserToken={setUserToken} />}
            />
            <Route
              path='/register'
              element={<Register setUserToken={setUserToken} />}
            />
            <Route
              path='/posts'
              element={<Posts />}
            />
            <Route
              path='/profile'
              element={<Profile />}
            />
            <Route
              path='/posts/:postId'
              element={<PostDetails />}
            />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
