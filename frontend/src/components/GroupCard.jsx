import { motion } from "framer-motion";

function GroupCard({ group, onClick }) {
    return (
        <motion.div
            whileHover={{ scale: 1.05 }}
            className="bg-gray-800 text-white p-4 rounded-xl shadow cursor-pointer"
            onClick={onClick}
        >
            <h3 className="text-lg font-semibold">{group.name}</h3>
            <p className="text-sm text-gray-400">
                Members:{group.members.length}
            </p>
        </motion.div>
    )
}

export default GroupCard;