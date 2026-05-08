import { useEffect, useState } from "react";
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

    const fetchData = async () => {
        const g = await API.get('/groups');
        const current = g.data.find(x => x._id === id);
        setGroup(current);

        const exp = await API.get(`/expenses/${id}`);
        setExpenses(exp.data);

        const bal = await API.get(`/settlement/${id}`);
        setSettlement(bal.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen text-white">
            <Navbar />
            <div className="p-6">

                <h2 className="text-2xl mb-4">{group?.name}</h2>
                {
                    group && (
                        <ExpenseForm
                            groupId={id}
                            members={group.members}
                            refresh={fetchData}
                        />
                    )
                }

                {/* Chart */}
                <div className="mt-6">
                    <BalanceChart data={balances} />
                </div>

                {/* Expenses */}
                <div className="mt-6">
                    <h3 className="mb-2">Expenses</h3>
                    {
                        expenses.map((e) => (
                            <motion.div
                                key={e._id}
                                whileHover={{ scale: 1.02 }}
                                className="bg-gray-800 p-3 rounded mb-2"
                            >
                                {e.paidBy?.name} paid ₹{e.amount}
                            </motion.div>
                        ))
                    }
                </div>

                {/* <h3>Settlement</h3>
                {
                    settlement.map((s, i) => (
                        <p key={i}>
                            {s.from} pays {s.to} ₹{s.amount}
                        </p>
                    ))
                } */}
            </div>
        </div>
    )
}

export default GroupDetails;