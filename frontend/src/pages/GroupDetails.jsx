import { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ExpenseForm from '../components/ExpenseForm'
import BalanceChart from "../components/BalanceChart";
import Navbar from "../components/Navbar";
import { motion } from "framer-motion";

function GroupDetails() {
    const { id } = useParams();

    const [expenses, setExpenses] = useState([]);
    const [settlement, setSettlement] = useState([]);
    const [group, setGroup] = useState(null);
    const [balances, setBalances] = useState([]);

    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState("");

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [users, setUsers] = useState([]);
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const [usersError, setUsersError] = useState("");

    const [editName, setEditName] = useState("");
    const [selectedMemberIds, setSelectedMemberIds] = useState(() => new Set());
    const [isSaving, setIsSaving] = useState(false);
    const [saveError, setSaveError] = useState("");

    const fetchData = useCallback(async () => {
        setError("");
        setIsLoading(true);

        try {
            const g = await API.get(`/groups/${id}`);
            setGroup(g.data);

            const exp = await API.get(`/expenses/${id}`);
            setExpenses(Array.isArray(exp.data) ? exp.data : []);

            const bal = await API.get(`/settlement/balances/${id}`);
            setBalances(Array.isArray(bal.data) ? bal.data : []);

            const opt = await API.get(`/settlement/optimize/${id}`);
            setSettlement(Array.isArray(opt.data) ? opt.data : []);
        } catch (err) {
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to load group';
            setError(String(message));
        } finally {
            setIsLoading(false);
        }
    }, [id]);

    const fetchUsers = useCallback(async () => {
        setUsersError("");
        setIsUsersLoading(true);
        try {
            const res = await API.get('/users');
            setUsers(Array.isArray(res.data) ? res.data : []);
        } catch (err) {
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to load users';
            setUsersError(String(message));
        } finally {
            setIsUsersLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    useEffect(() => {
        if (isEditOpen) {
            if (users.length === 0 && !isUsersLoading) fetchUsers();
            setEditName(group?.name || "");
            setSelectedMemberIds(new Set((group?.members || []).map((m) => m._id)));
            setSaveError("");
        }
    }, [isEditOpen, group, users.length, isUsersLoading, fetchUsers]);

    const toggleMember = (userId) => {
        setSelectedMemberIds((prev) => {
            const next = new Set(prev);
            if (next.has(userId)) next.delete(userId);
            else next.add(userId);
            return next;
        });
    };

    const handleSave = async (e) => {
        e?.preventDefault?.();
        setSaveError("");

        const name = editName.trim();
        const members = Array.from(selectedMemberIds);

        if (!name) {
            setSaveError('Group name is required.');
            return;
        }

        if (members.length === 0) {
            setSaveError('Select at least one member.');
            return;
        }

        setIsSaving(true);
        try {
            await API.put(`/groups/${id}`, { name, members });
            setIsEditOpen(false);
            await fetchData();
        } catch (err) {
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to update group';
            setSaveError(String(message));
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            <Navbar />
            <div className="mx-auto max-w-6xl px-4 py-8">
                <div className="flex items-start justify-between gap-4">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-semibold tracking-tight">{group?.name || 'Group'}</h2>
                        <p className="text-sm text-gray-300 mt-1">Manage expenses, balances, and settlement.</p>
                    </div>

                    <motion.button
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => setIsEditOpen((v) => !v)}
                        className="shrink-0 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium hover:bg-white/15 transition"
                        disabled={!group}
                    >
                        {isEditOpen ? 'Close' : 'Edit group'}
                    </motion.button>
                </div>

                {error ? (
                    <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/10 p-4 text-red-200">
                        {error}
                        <button
                            className="mt-3 rounded-xl bg-white/10 px-3 py-2 text-sm hover:bg-white/15 transition"
                            onClick={fetchData}
                            type="button"
                        >
                            Retry
                        </button>
                    </div>
                ) : null}

                {isEditOpen ? (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mt-6 rounded-2xl border border-white/10 bg-gray-900/70 p-5 shadow-xl shadow-black/20"
                    >
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <div className="text-lg font-semibold">Edit group details</div>
                                <div className="text-sm text-gray-300 mt-1">Update name and members.</div>
                            </div>
                            <button
                                className="text-sm text-gray-300 hover:text-white transition"
                                onClick={fetchUsers}
                                type="button"
                            >
                                Refresh users
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="mt-4 space-y-4">
                            <div className="space-y-1">
                                <label className="text-sm text-gray-200">Group name</label>
                                <input
                                    className="w-full rounded-xl bg-gray-800/70 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                                    value={editName}
                                    onChange={(e) => setEditName(e.target.value)}
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

                            {saveError ? (
                                <div className="rounded-xl border border-red-500/20 bg-red-500/10 p-3 text-sm text-red-200">
                                    {saveError}
                                </div>
                            ) : null}

                            <div className="flex gap-3">
                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="flex-1 rounded-xl bg-blue-500 py-2 font-medium hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
                                >
                                    {isSaving ? 'Saving…' : 'Save changes'}
                                </button>
                                <button
                                    type="button"
                                    className="flex-1 rounded-xl bg-white/10 py-2 font-medium hover:bg-white/15 transition"
                                    onClick={() => setIsEditOpen(false)}
                                >
                                    Cancel
                                </button>
                            </div>
                        </form>
                    </motion.div>
                ) : null}

                {!isLoading && group ? (
                    <ExpenseForm
                        groupId={id}
                        members={group.members}
                        refresh={fetchData}
                    />
                ) : null}

                {/* Chart */}
                <div className="mt-6">
                    <BalanceChart data={balances} />
                </div>

                {/* Expenses */}
                <div className="mt-6">
                    <h3 className="mb-2 text-lg font-semibold">Expenses</h3>
                    {
                        expenses.map((e) => (
                            <motion.div
                                key={e._id}
                                whileHover={{ y: -1 }}
                                className="rounded-2xl border border-white/10 bg-gray-900/70 p-4 mb-2"
                            >
                                <div className="flex items-center justify-between gap-4">
                                    <div className="text-white">
                                        <span className="font-medium">{e.paidBy?.name || 'Someone'}</span> paid
                                    </div>
                                    <div className="text-white font-semibold">₹{e.amount}</div>
                                </div>
                            </motion.div>
                        ))
                    }
                </div>

                <div className="mt-6">
                    <h3 className="mb-2 text-lg font-semibold">Settlement</h3>
                    <div className="rounded-2xl border border-white/10 bg-gray-900/70 p-4">
                        {settlement.length === 0 ? (
                            <div className="text-sm text-gray-300">No settlement transactions yet.</div>
                        ) : (
                            settlement.map((s, i) => (
                                <div key={i} className="flex items-center justify-between gap-4 py-2 border-b border-white/5 last:border-b-0">
                                    <div className="text-gray-200 truncate">{s.from} pays {s.to}</div>
                                    <div className="text-white font-semibold">₹{s.amount}</div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GroupDetails;