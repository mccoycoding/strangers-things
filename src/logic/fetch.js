import { POSTS, USERS } from "./info";


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
        console.error(`Error fetching posts ${error}`)
    }
}

export async function fetchUser(token) {
    try {
        const response = await fetch(`${USERS}/me`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.error(`Error fetching user: ${error}`)
    }
}

export async function postPost(token, title, description, price, location, willDeliver) {
    try {
        const response = await fetch(POSTS, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                post: {
                    title: title,
                    description: description,
                    price: price,
                    location: location,
                    willDeliver: willDeliver
                }
            })
        });
        const result = await response.json();
        return result
    } catch (error) {
        console.error(`Error making post: ${error}`)
    }
}