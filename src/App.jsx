import { Routes, Route } from "react-router-dom"
//Page Imports for Routing
import Register from "./pages/Register"
import Login from "./pages/Login"
import Posts from "./pages/Posts"
import Profile from "./pages/Profile"
import NewPost from "./pages/NewPost"
import PostDetails from "./pages/PostDetails"
import Navbar from "./components/Navbar"
import { useState } from "react"


function App() {
  const [darkMode, setDarkMode] = useState(true);
  const [userToken, setUserToken] = useState(sessionStorage.getItem('userToken'))

  return (
    <div>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} userToken={userToken} setUserToken={setUserToken} />
      <Routes>
        <Route path="/" element={ <Login userToken={userToken} setUserToken={setUserToken}/>}/>
        <Route path="/register" element={<Register userToken={userToken} setUserToken={setUserToken}/>}/>
        <Route path="/posts" element={<Posts />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="/create-post" element={<NewPost />}/>
        <Route path="/post-details" element={<PostDetails />} />
      </Routes>
    </div>
  )
}

export default App
