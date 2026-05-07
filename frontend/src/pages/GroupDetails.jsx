import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../api/axios";
import ExpenseForm from '../components/ExpenseForm'

function GroupDetails() {
    const { id } = useParams();

    const [expenses, setExpenses] = useState([]);
    const [settlement, setSettlement] = useState([]);
    const [group, setGroup] = useState(null);

    const fetchData = async () => {
        const g = await API.get('/groups');
        const current = g.data.find(x => x._id === id);
        setGroup(current);

        const exp = await API.get(`/expenses/${id}`);
        setExpenses(exp.data);

        const setl = await API.get(`/settlement/optimize/${id}`);
        setSettlement(setl.data);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div>
            <h2>{group?.name}</h2>
            {
                group && (
                    <ExpenseForm
                        groupId={id}
                        members={group.members}
                        refresh={fetchData}
                    />
                )
            }

            <h3>Expenses</h3>
            {
                expenses.map(e => (
                    <p key={e._id}>
                        {e.paidBy?.name} paid ₹{e.amount}
                    </p>
                ))
            }

            <h3>Settlement</h3>
            {
                settlement.map((s, i) => (
                    <p key={i}>
                        {s.from} pays {s.to} ₹{s.amount}
                    </p>
                ))
            }
        </div>
    )
}

export default GroupDetails;