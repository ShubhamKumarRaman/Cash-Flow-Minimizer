import { useState } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";

function ExpenseForm({ groupId, members, refresh }) {
    const [amount, setAmount] = useState("");
    const [paidBy, setPaidBy] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState("");

    const parsedAmount = Number(amount);
    const isAmountValid = Number.isFinite(parsedAmount) && parsedAmount > 0;
    const canSubmit = Boolean(groupId) && Boolean(paidBy) && isAmountValid && !isSubmitting;

    const handleSubmit = async (e) => {
        e?.preventDefault?.();
        setError("");

        if (!canSubmit) {
            setError('Please enter a valid amount and select a payer.');
            return;
        }

        setIsSubmitting(true);
        try {
            await API.post('/expenses', {
                groupId,
                paidBy,
                amount: parsedAmount,
                members,
            });

            setAmount("");
            setPaidBy("");
            await refresh?.();
        } catch (err) {
            const message = err?.response?.data?.message || err?.response?.data || err?.message || 'Failed to add expense';
            setError(String(message));
        } finally {
            setIsSubmitting(false);
        }
    };

    // return (
    //     <div>
    //         <h3>Add Expense</h3>
    //         <input type="text" placeholder="Amount" onChange={e => setAmount(e.target.value)} />

    //         <select onChange={e => setPaidBy(e.target.value)}>
    //             <option>Select payer</option>
    //             {members.map(m => (
    //                 <option key={m._id} value={m._id}>{m.name}</option>
    //             ))}
    //         </select>

    //         <button onClick={handleSubmit}>Add</button>
    //     </div>
    // )

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 rounded-2xl border border-white/10 bg-gray-900/70 p-5 shadow-xl shadow-black/20"
        >
            <div className="flex items-center justify-between gap-4">
                <h3 className="text-white text-lg font-semibold">Add Expense</h3>
                <div className="text-xs text-gray-400">Split equally</div>
            </div>

            <form onSubmit={handleSubmit} className="mt-4 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div className="space-y-1">
                        <label className="text-sm text-gray-200">Amount</label>
                        <input
                            className="w-full rounded-xl bg-gray-800/70 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="0"
                            inputMode="decimal"
                            type="number"
                            min="0"
                            step="0.01"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-sm text-gray-200">Paid by</label>
                        <select
                            className="w-full rounded-xl bg-gray-800/70 border border-white/10 px-3 py-2 text-white outline-none focus:ring-2 focus:ring-blue-500"
                            value={paidBy}
                            onChange={(e) => setPaidBy(e.target.value)}
                            required
                        >
                            <option value="" disabled>
                                Select payer
                            </option>
                            {members.map((m) => (
                                <option key={m._id} value={m._id}>
                                    {m.name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {error ? (
                    <div className="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl p-3">
                        {error}
                    </div>
                ) : null}

                <button
                    className="w-full rounded-xl bg-blue-500 py-2 font-medium hover:bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed transition"
                    type="submit"
                    disabled={!canSubmit}
                >
                    {isSubmitting ? 'Adding…' : 'Add expense'}
                </button>
            </form>
        </motion.div>
    );
}

export default ExpenseForm;