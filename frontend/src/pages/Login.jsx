import { useState, useContext } from "react";
import API from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from 'react-router-dom';

function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        const res = await API.post('/auth/login', form);
        login(res.data.token);
        navigate('/dashboard');
    }

    return (
        <div>
            <h2>Login</h2>
            <input type="text" placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
            <input type="text" placeholder="Password" type="password" onChange={e => setForm({ ...form, password: e.target.value })} />
            <button onClick={handleSubmit}>Login</button>
        </div>
    )
}

export default Login;