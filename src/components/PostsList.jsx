import { useState, useEffect } from "react";
import { fetchPosts } from "../logic/fetch";
import { useNavigate } from "react-router";
import OffcanvasForm from "./OffcanvasForm";

export default function PostsList() {
    const [posts, setPosts] = useState([])
    const [searchResult, setSearchResult] = useState('')
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

    const handleDetails = (postId) => {
        // Navigate to post
        navigate(`/posts/${postId}`)
    }

    const postFilter = () => {
        return posts.filter((post) => {
            return (
                post.title.toLowerCase().includes(searchResult?.toLowerCase()) ||
                post.description.toLowerCase().includes(searchResult?.toLowerCase())
            );
        });
    };

    const postsFiltered = postFilter();

    console.log(posts)
    return (
        <div>
            <h1 className="display-2 text-center"></h1>
            {posts.length === 0 ? (
            <p>No posts available</p>
        ) :  (
            <div className="container my-4">
                <div className="text-center mb-5 form-floating">
                    <input className="form-control" value={searchResult} onChange={(e) => setSearchResult(e.target.value)} type="text"/>
                    <label className="form-label">Search</label>
                </div>
                <div className="text-center mb-5">
                <button className="btn btn-primary" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">New Post</button>
                </div>
                {postsFiltered.map((post) => (
                    <div className="card shadow" key={post._id}>
                        <div className="card-body">
                            <h5 className="card-title">{post.title}</h5>
                            <p className="card-text">{post.description}</p>
                            <p className="card=text">{post.location}</p>
                            <p className="card=text">{post.willDeliver ? "Delivery Available" : "Pickup Available"}</p>
                            <p className="card=text">Price: {post.price}</p>
                            <p className="card=text">Seller: {post.author.username}</p>
                            <button className="btn btn-success me-2" onClick={() => handleDetails(post._id)}>More details</button>
                            {post.isAuthor ? (
                                <>
                                    <button className="btn btn-danger me-2">DELETE</button>
                                    <button className="btn btn-primary">EDIT</button>
                                </>
                            ) :  null}
                            
                        </div>
                    </div>
                ))}
            </div>
                
        )}
        <OffcanvasForm />
        </div>
        
    )
}