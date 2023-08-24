import { useState } from "react";
import { postPost } from "../logic/fetch";
import { useNavigate } from "react-router-dom";

export default function NewPostForm() {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [location, setLocation] = useState('')
    const [willDeliver, setWillDeliver] = useState(false)

    const navigate = useNavigate();

    const submitForm = async () => {
        if (!title || !description || !price) {
            console.log("Missing one or more inputs")
            return
        }
        try {
            const token = sessionStorage.getItem('userToken')
            const data = await postPost(token, title, description, price, location, willDeliver);
            console.log(data);
        } catch (error) {
            console.error(`Error Submitting Form: ${error}`)
        }
    }

    const handleClick = () => {
        submitForm();
        setTimeout(() => {
            navigate('/posts')
        }, 2000)
    }

    return (
        <form className="container" onSubmit={(e) => {e.preventDefault()}}>
            <div className="form-floating">
                <input required value={title} onChange={e => setTitle(e.target.value)} className="form-control" type="text"/>
                <label className="form-label">Title</label>
            </div>
            <div className="form-floating">
                <textarea required value={description} onChange={e => setDescription(e.target.value)} className="form-control" id="floatingTextarea" rows={30}></textarea>
                <label className="form-label">Description</label>
            </div>
            <div className="form-floating">
                <input required value={price} onChange={e => setPrice(e.target.value)} className="form-control" type="text"/>
                <label className="form-label">Price</label>
            </div>
            <div className="form-floating">
                <input value={location} onChange={e => setLocation(e.target.value)} className="form-control" type="text"/>
                <label className="form-label">Location</label>
            </div>
            <div className="form-check my-3">
                <input value={willDeliver} onChange={e => setWillDeliver(e.target.value)} className="form-check-input" type="checkbox"/>
                <label className="form-check-label">Available for Delivery</label>
            </div>
            <button className="btn btn-primary" type="submit" onClick={() => handleClick()}>Submit</button>
        </form>
    )
}