import { USERS } from "../logic/info"
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginForm({ setUserToken }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [token, setToken] = useState(null)

    const navigate = useNavigate()
    
    const loginUser = async (username, password) => {
        
        //Fetch Request for logging in
        try {
            const response = await fetch(`${USERS}/login`, {
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
            console.log(result)
            const fetchedToken = result.data.token;
            sessionStorage.setItem('userToken', fetchedToken)
            setToken(sessionStorage.getItem('userToken'))
            console.log(result.data.message)
        } catch (error) {
            throw error
        }
        //After logging in, save token to sessionStorage
        
    }

    const handleClick = async () => {
        loginUser(username, password);
        setTimeout(() => {
            navigate('/profile')
            setUserToken(token)
        }, 2000)
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
            <button className="btn btn-primary btn-lg" type="submit" onClick={() => handleClick()}>Log in</button>
        </form>
    )
}