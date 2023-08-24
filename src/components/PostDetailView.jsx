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
        <div className="container-fluid mt-5 py-3 px-4 border shadow rounded">
            <h3>{post.title}</h3>
            <h5>Seller: {post.author?.username}</h5>
            <p>{post.description}</p>
            <p>{post.location}</p>
            <p>{post.willDeliver ? "Delivery Available" : "Pickup Available"}</p>
            <p>Price: {post.price}</p>
            {post.isAuthor ? (
                <>
                    <button className="btn btn-danger me-2">DELETE</button>
                    <button className="btn btn-primary">EDIT</button>
                </>
              ) :  null}
            {post.messages > 0 ? (
              <div className="card mt-3">
                <div className="card-body">
                  <h5 className="card-title">Messages</h5>
                  <ul className="list-group">
                      {post.messages.map(message => (
                          <li key={message._id} className="list-group-item">
                              <strong>{message.fromUser.username}</strong>: {message.content}
                          </li>
                      ))}
                  </ul>
                </div>
              </div>
            ) : null}
        </div>
    )
}