import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { fetchPosts } from "../logic/fetch";

export default function PostDetailsView() {
    const [post, setPost] = useState({});
    const { postId } = useParams();

    useEffect(() => {
        async function fetchPostDetails() {
            try {
              const token = sessionStorage.getItem("userToken");
              const fetchedPosts = await fetchPosts(token); // Fetch posts with messages
              const foundPost = fetchedPosts.data.posts.find(
                (post) => post._id === postId
              );
      
              if (foundPost) {
                console.log("Fetched post data:", foundPost);
                setPost(foundPost);
              } else {
                console.error("Post not found.");
              }
            } catch (error) {
              console.error("Error fetching posts:", error);
            }
          }
        fetchPostDetails();
    }, [postId])

    return (
        <div className="container mt-5 border shadow rounded">
            <h3>{post.title}</h3>
            <h5>Seller: {post.author?.username}</h5>
            <p>{post.description}</p>
            <p>{post.location}</p>
            <p>{post.willDeliver ? "Delivery Available" : "Pickup Available"}</p>
            <p>Price: {post.price}</p>
            
        </div>
    )
}