import { useState } from "react";
import API from "../api/axios";
import { motion } from "framer-motion";

function ExpenseForm({ groupId, members, refresh }) {
    const [amount, setAmount] = useState("")
    const [paidBy, setPaidBy] = useState("")

    const handleSubmit = async () => {
        await API.post('/expenses', {
            groupId,
            paidBy,
            amount,
            members
        });

        refresh();
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="bg-gray-800 p-4 rounded-xl shadow mt-4"
        >
            <h3 className="text-white mb-2">Add Expense</h3>

            <input
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
                placeholder="Amount"
                onChange={(e) => setAmount(e.target.value)}
            />

            <select
                className="w-full p-2 mb-2 rounded bg-gray-700 text-white"
                onChange={(e) => setPaidBy(e.target.value)}
            >
                <option>Select payer</option>
                {members.map((m) => (
                    <option key={m._id} value={m._id}>
                        {m.name}
                    </option>
                ))}

            </select>

            <button
                className="bg-blue-500 w-full py-2 rounded hover:bg-blue-600"
                onClick={handleSubmit}
            >
                Add Expense
            </button>
        </motion.div>
    )
}

export default ExpenseForm;