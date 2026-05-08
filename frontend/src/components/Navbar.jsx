import { motion } from 'framer-motion'

function Navbar() {
    return (
        <motion.div
            initial={{ y: -50 }}
            animate={{ y: 0 }}
            className='bg-gray-900 text-white p-4 flex justify-between shadow-md'
        >
            <h1 className='text-xl font-bold'>Cash Flow Minimizer</h1>
            <button className='bg-red-500 px-4 py-1 rounded'>Logout</button>
        </motion.div>
    )
}

export default Navbar;