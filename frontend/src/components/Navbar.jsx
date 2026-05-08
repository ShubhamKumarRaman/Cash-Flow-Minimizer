import { motion } from 'framer-motion'
import { useContext } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../context/authContext'

function Navbar() {
    const { token, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/');
    };

    return (
        <motion.header
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className='sticky top-0 z-50 border-b border-white/10 bg-gray-950/70 backdrop-blur'
        >
            <div className='mx-auto max-w-6xl px-4 py-3 flex items-center justify-between'>
                <NavLink
                    to={token ? '/dashboard' : '/'}
                    className='text-lg font-semibold tracking-tight hover:opacity-90 transition'
                >
                    Cash Flow Minimizer
                </NavLink>

                <nav className='flex items-center gap-2'>
                    {token ? (
                        <>
                            <NavLink
                                to='/dashboard'
                                className={({ isActive }) =>
                                    [
                                        'px-3 py-2 rounded-xl text-sm transition',
                                        isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-gray-200 hover:bg-white/10 hover:text-white',
                                    ].join(' ')
                                }
                            >
                                Dashboard
                            </NavLink>

                            <motion.button
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.98 }}
                                className='bg-red-500/90 hover:bg-red-500 px-3 py-2 rounded-xl text-sm font-medium transition'
                                onClick={handleLogout}
                            >
                                Logout
                            </motion.button>
                        </>
                    ) : (
                        <>
                            <NavLink
                                to='/'
                                className={({ isActive }) =>
                                    [
                                        'px-3 py-2 rounded-xl text-sm transition',
                                        isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-gray-200 hover:bg-white/10 hover:text-white',
                                    ].join(' ')
                                }
                            >
                                Login
                            </NavLink>
                            <NavLink
                                to='/register'
                                className={({ isActive }) =>
                                    [
                                        'px-3 py-2 rounded-xl text-sm transition',
                                        isActive
                                            ? 'bg-white/10 text-white'
                                            : 'text-gray-200 hover:bg-white/10 hover:text-white',
                                    ].join(' ')
                                }
                            >
                                Register
                            </NavLink>
                        </>
                    )}
                </nav>
            </div>
        </motion.header>
    )
}

export default Navbar;