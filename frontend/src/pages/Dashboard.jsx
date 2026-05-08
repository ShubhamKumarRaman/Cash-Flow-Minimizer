import { useEffect, useState } from "react";
import API from "../api/axios";
import GroupCard from "../components/GroupCard";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/groups').then(res => setGroups(res.data));
    }, []);

    return (
        <div className="bg-gray-900 min-h-screen">
            <Navbar />

            <div className="p-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                {groups.map((g) => (
                    <GroupCard
                        key={g._id}
                        group={g}
                        onClick={() => navigate(`/group/${g._id}`)}
                    />
                ))

                }
            </div>
        </div>
    )
}

export default Dashboard;