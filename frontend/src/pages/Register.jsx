import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();

    const handleSubmit = async () => {
        await API.post('/auth/register', form);
        navigate('/');
    };

    return (
        <div>
            <h2>Register</h2>
            <input type="text" placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
            <input type="text" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="text" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button onClick={handleSubmit}>Register</button>
        </div>
    )
}

export default Register;