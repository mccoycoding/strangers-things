import { useState, useEffect } from "react";
import { fetchPosts } from "../logic/fetch";
import { useNavigate } from "react-router";

export default function PostsList() {
    const [posts, setPosts] = useState([])
    const navigate = useNavigate();
    useEffect(() => {
        const loadPosts = async () => {
            try {
                const token = sessionStorage.getItem('userToken');
                const postsData = await fetchPosts(token);
                setPosts(postsData.data.posts)
            } catch (error) {
                throw error
            }
        }
        loadPosts();
    }, [])

    const handleClick = (postId) => {
        // Navigate to post
        navigate(`/post-details/${postId}`)
    }

    console.log(posts)
    return (
        <div>
            <h1 className="display-2 text-center"></h1>
            {posts.length === 0 ? (
            <p>No posts available</p>
        ) :  (
            <div className="container my-4">
                {posts.map((post) => (
                    <div className="card shadow" key={post._id}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.description}</p>
                            <p className="card=text">{post.location}</p>
                            <p className="card=text">{post.willDeliver ? "Delivery Available" : "Pickup Available"}</p>
                            <p className="card=text">Price: {post.price}</p>
                            <p className="card=text">Seller: {post.author.username}</p>
                            <button className="btn btn-primary" onClick={() => handleClick(post._id)}>More details</button>
                        </div>
                    </div>
                ))}
            </div>
                
        )}
        </div>
        
    )
}