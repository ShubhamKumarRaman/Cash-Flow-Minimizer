import { motion } from "framer-motion";

function GroupCard({ group, onClick }) {
    return (
        <motion.div
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.99 }}
            className="group relative rounded-2xl border border-white/10 bg-gray-900/70 p-4 shadow-xl shadow-black/20 cursor-pointer transition hover:border-white/15"
            role="button"
            tabIndex={0}
            onClick={onClick}
            onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') onClick?.();
            }}
        >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />

            <div className="relative">
                <h3 className="text-lg font-semibold tracking-tight text-white">
                    {group.name}
                </h3>
                <p className="mt-1 text-sm text-gray-300">
                    {group.members?.length ?? 0} member{(group.members?.length ?? 0) === 1 ? '' : 's'}
                </p>

                <div className="mt-4 inline-flex items-center gap-2 text-sm text-blue-300/90">
                    <span className="h-2 w-2 rounded-full bg-blue-400/80" />
                    Open group
                </div>
            </div>
        </motion.div>
    )
}

export default GroupCard;