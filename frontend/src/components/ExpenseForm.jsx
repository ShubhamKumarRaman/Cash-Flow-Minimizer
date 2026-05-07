import { useState } from "react";
import API from "../api/axios";

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

    return (
        <div>
            <h3>Add Expense</h3>
            <input type="text" placeholder="Amount" onChange={e => setAmount(e.target.value)} />

            <select onChange={e => setPaidBy(e.target.value)}>
                <option>Select payer</option>
                {members.map(m => (
                    <option key={m._id} value={m._id}>{m.name}</option>
                ))}
            </select>

            <button onClick={handleSubmit}>Add</button>
        </div>
    )
}