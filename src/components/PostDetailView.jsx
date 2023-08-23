import { useState, useEffect } from "react";
import { useParams } from "react-router";

export default function PostDetailsView() {
    const [post, setPost] = useState([]);
    const { postId } = useParams();

    useEffect(() => {
        
    })
}