import { set } from "immutable"
import RegisterForm from "../components/RegisterForm"
import { Link } from "react-router-dom"
export default function Register({setUserToken}) {

    return (
        <div className="container text-center">
            <h1 className="display-1">Register</h1>
            <RegisterForm setUserToken={setUserToken}/>
            <p>Already a member? <Link to="/">Log in here</Link></p>
        </div>
    )
}