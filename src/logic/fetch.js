import { POSTS } from "./info";


// FETCH all posts
export async function fetchPosts(token) {
    try {
        const response = await fetch(POSTS, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        const result = await response.json();
        return result
    } catch (error) {
        
    }
}