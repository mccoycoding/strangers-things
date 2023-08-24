import { useState, useEffect } from "react"
import { fetchUser } from "../logic/fetch";

export default function Profile() {
    const [posts, setPosts] = useState([]);
    const [messages, setMessages] = useState([])
    const [username, setUsername] = useState()
    
    useEffect(() => {
        async function fetchUserDetails() {
            try {
                const token = sessionStorage.getItem("userToken");
                const fetchedUser = await fetchUser(token); //Fetch user info
                setPosts(fetchedUser.data.posts);
                setMessages(fetchedUser.data.messages)
                setUsername(fetchedUser.data.username)
            } catch (error) {
                console.error(`Error fetching user: ${error}`)
            }
        }
        fetchUserDetails()
    }, []);


    return (
        <div>
            <h1>{username}</h1>
        </div>
        

    )
}