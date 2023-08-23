import { USERS } from "../logic/info"
import { useState } from "react";

export default function RegisterForm() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const registerUser = async (username, password) => {
        try {
            const response = await fetch(`${USERS}/register`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    user: {
                        username: username,
                        password: password
                    }
                })
            });
            const result = await response.json();
            const token = result.data.token
            sessionStorage.setItem('userToken', token)
            console.log(result.data.message)
        } catch (error) {
            throw error
        }
    }

    return (
        <form className="mx-5" onSubmit={(e) => e.preventDefault()}>
            <div className="form-floating mb-3 mx-5">
                <input className="form-control" type="text" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <label className="form-label">Username</label>
            </div>
            <div className="form-floating mb-3 mx-5">
                <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                <label className="form-label">Password</label>
            </div>
            <button className="btn btn-primary btn-lg" type="submit" onClick={() => registerUser(username, password)}>Log in</button>
        </form>
    )
}