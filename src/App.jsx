import { Routes, Route } from "react-router-dom"
//Page Imports for Routing
import Home from "./pages/Home"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Posts from "./pages/Posts"
import Profile from "./pages/Profile"
import NewPost from "./pages/NewPost"
import PostDetails from "./pages/PostDetails"


function App() {

  return (
    <Routes>
      <Route path="/" element={<Home />}/>
      <Route path="/login" element={ <Login />}/>
      <Route path="/register" element={<Register />}/>
      <Route path="/posts" element={<Posts />}/>
      <Route path="/profile" element={<Profile />}/>
      <Route path="/create-post" element={<NewPost />}/>
      <Route path="/post-details" element={<PostDetails />} />
    </Routes>
  )
}

export default App
