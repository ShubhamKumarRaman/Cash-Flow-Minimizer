import { useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

function Register() {
    const [form, setForm] = useState({ name: "", email: "", password: "" });
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e?.preventDefault?.();
        setError("");
        setIsSubmitting(true);

        try {
            await API.post('/auth/register', form);
            navigate('/');
        } catch (err) {
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Registration failed';
            setError(String(message));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white flex items-center justify-center px-4">
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className="w-full max-w-md"
            >
                <div className="bg-gray-900/70 backdrop-blur border border-white/10 rounded-2xl shadow-xl p-6">
                    <div className="mb-6">
                        <h2 className="text-2xl font-semibold">Create your account</h2>
                        <p className="text-sm text-gray-300 mt-1">Start tracking group expenses in minutes.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-1">
                            <label className="text-sm text-gray-200">Name</label>
                            <input
                                type="text"
                                value={form.name}
                                placeholder="Your name"
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                className="w-full rounded-xl bg-gray-800/70 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="name"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-200">Email</label>
                            <input
                                type="email"
                                value={form.email}
                                placeholder="you@example.com"
                                onChange={e => setForm({ ...form, email: e.target.value })}
                                className="w-full rounded-xl bg-gray-800/70 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="email"
                                required
                            />
                        </div>

                        <div className="space-y-1">
                            <label className="text-sm text-gray-200">Password</label>
                            <input
                                type="password"
                                value={form.password}
                                placeholder="••••••••"
                                onChange={e => setForm({ ...form, password: e.target.value })}
                                className="w-full rounded-xl bg-gray-800/70 border border-white/10 px-3 py-2 outline-none focus:ring-2 focus:ring-blue-500"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        {error ? (
                            <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                                {error}
                            </div>
                        ) : null}

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full rounded-xl bg-blue-500 py-2 font-medium hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
                        >
                            {isSubmitting ? 'Creating…' : 'Create account'}
                        </button>
                    </form>

                    <div className="mt-5 text-sm text-gray-300">
                        Already have an account?{' '}
                        <Link className="text-blue-400 hover:text-blue-300" to="/">
                            Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default Register;