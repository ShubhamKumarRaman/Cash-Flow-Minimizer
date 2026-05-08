import { useCallback, useEffect, useState } from "react";
import API from "../api/axios";
import GroupCard from "../components/GroupCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const [isAddOpen, setIsAddOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [usersError, setUsersError] = useState("");
    const [isUsersLoading, setIsUsersLoading] = useState(false);

    const [newGroupName, setNewGroupName] = useState("");
    const [selectedMemberIds, setSelectedMemberIds] = useState(() => new Set());
    const [createError, setCreateError] = useState("");
    const [isCreating, setIsCreating] = useState(false);

    const fetchGroups = useCallback(async () => {
        setError("");
        setIsLoading(true);

        try {
            const res = await API.get('/groups');
            setGroups(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            if (err?.response?.status === 401) {
                navigate('/');
                return;
            }
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to load groups';
            setError(String(message));
        } finally {
            setIsLoading(false);
        }
    }, [navigate]);

    const fetchUsers = useCallback(async () => {
        setUsersError("");
        setIsUsersLoading(true);
        try {
            const res = await API.get('/users');
            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            if (err?.response?.status === 401) {
                navigate('/');
                return;
            }
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to load users';
            setUsersError(String(message));
        } finally {
            setIsUsersLoading(false);
        }
    }, [navigate]);

    useEffect(() => {
        fetchGroups();
    }, [fetchGroups]);

    useEffect(() => {
        if (isAddOpen && users.length === 0 && !isUsersLoading) {
            fetchUsers();
        }
    }, [isAddOpen, users.length, isUsersLoading, fetchUsers]);

    const toggleMember = (userId) => {
        setSelectedMemberIds((prev) => {
            const next = new Set(prev);
            if (next.has(userId)) next.delete(userId);
            else next.add(userId);
            return next;
        });
    };

    const handleCreateGroup = async (e) => {
        e?.preventDefault?.();
        setCreateError("");

        const name = newGroupName.trim();
        const members = Array.from(selectedMemberIds);

        if (!name) {
            setCreateError('Group name is required.');
            return;
        }

        if (members.length === 0) {
            setCreateError('Select at least one member.');
            return;
        }

        setIsCreating(true);
        try {
            await API.post('/groups', { name, members });
            setNewGroupName("");
            setSelectedMemberIds(new Set());
            setIsAddOpen(false);
            await fetchGroups();
        } catch (err) {
            if (err?.response?.status === 401) {
                navigate('/');
                return;
            }
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to create group';
            setCreateError(String(message));
        } finally {
            setIsCreating(false);
        }
    };

    const container = {
        hidden: { opacity: 0 },
        show: {
            opacity: 1,
            transition: { staggerChildren: 0.06 },
        },
    };

    const item = {
        hidden: { opacity: 0, y: 10 },
        show: { opacity: 1, y: 0 },
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />

            <div className="mx-auto max-w-6xl px-4 py-8">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-6 flex items-start justify-between gap-4"
                >
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">Your Groups</h2>
                        <p className="text-sm text-gray-300 mt-1">Open a group to add expenses and view settlements.</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsAddOpen((v) => !v)}
                        className="shrink-0 rounded-xl bg-blue-500 px-4 py-2 text-sm font-medium hover:bg-blue-600 transition"
                    >
                        {isAddOpen ? 'Close' : 'Add group'}
                    </motion.button>
                </motion.div>

                {isAddOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-6 rounded-2xl border border-white/10 bg-gray-900/70 p-5 shadow-xl shadow-black/20"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold">Create a group</div>
                                <div className="text-sm text-gray-300 mt-1">Choose members and start tracking expenses.</div>
                            </div>
                            <button
                                className="text-sm text-gray-300 hover:text-white transition"
                                onClick={fetchUsers}
                                type="button"
                            >
                                Refresh users
                            </button>
                        </div>

                        <form onSubmit={handleCreateGroup} className="mt-4 space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm text-gray-200">Group name</label>
                                <input
                                    className="w-full rounded-xl bg-gray-800/70 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                                    placeholder="e.g. Goa Trip"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    required
                                />
                            </div>

                            <div>
                                <div className="text-sm text-gray-200">Members</div>
                                {usersError ? (
                                    <div className="mt-2 rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                                        {usersError}
                                    </div>
                                ) : null}

                                <div className="mt-2 rounded-2xl border border-white/10 bg-black/20 p-3 max-h-56 overflow-auto">
                                    {isUsersLoading ? (
                                        <div className="text-sm text-gray-300">Loading users…</div>
                                    ) : users.length === 0 ? (
                                        <div className="text-sm text-gray-300">No users found.</div>
                                    ) : (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                                            {users.map((u) => (
                                                <label
                                                    key={u._id}
                                                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 hover:bg-white/8 transition cursor-pointer"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        className="accent-blue-500"
                                                        checked={selectedMemberIds.has(u._id)}
                                                        onChange={() => toggleMember(u._id)}
                                                    />
                                                    <div className="min-w-0">
                                                        <div className="text-sm text-white truncate">{u.name}</div>
                                                        <div className="text-xs text-gray-400 truncate">{u.email}</div>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="mt-2 text-xs text-gray-400">Selected: {selectedMemberIds.size}</div>
                            </div>

                            {createError ? (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                                    {createError}
                                </div>
                            ) : null}

                            <button
                                type="submit"
                                disabled={isCreating}
                                className="w-full rounded-xl bg-blue-500 py-2 font-medium hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
                            >
                                {isCreating ? 'Creating…' : 'Create group'}
                            </button>
                        </form>
                    </motion.div>
                ) : null}

                {error ? (
                    <div className="mb-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
                        <div className="font-medium">Couldn’t load groups</div>
                        <div className="text-sm mt-1 opacity-90">{error}</div>
                        <button
                            onClick={fetchGroups}
                            className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15 transition"
                        >
                            Retry
                        </button>
                    </div>
                ) : null}

                {isLoading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="rounded-2xl border border-white/10 bg-gray-900/70 p-4"
                            >
                                <div className="h-5 w-2/3 rounded bg-white/10 animate-pulse" />
                                <div className="mt-3 h-4 w-1/2 rounded bg-white/10 animate-pulse" />
                                <div className="mt-5 h-9 w-28 rounded-xl bg-white/10 animate-pulse" />
                            </div>
                        ))}
                    </div>
                ) : groups.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="rounded-2xl border border-white/10 bg-gray-900/70 p-6"
                    >
                        <div className="text-lg font-medium">No groups yet</div>
                        <div className="text-sm text-gray-300 mt-1">Create a group from your backend/API and it will show up here.</div>
                    </motion.div>
                ) : (
                    <motion.div
                        variants={container}
                        initial="hidden"
                        animate="show"
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    >
                        {groups.map((g) => (
                            <motion.div key={g._id} variants={item}>
                                <GroupCard
                                    group={g}
                                    onClick={() => navigate(`/group/${g._id}`)}
                                />
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </div>
    )
}

export default Dashboard;