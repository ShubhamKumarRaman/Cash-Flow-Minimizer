import { useEffect, useState } from "react";
import API from "../api/axios";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const [groups, setGroups] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        API.get('/groups').then(res => setGroups(res.data));
    }, []);

    return (
        <div>
            <h2>Your Groups</h2>
            {
                groups.map(g => (
                    <div key={g._id} onClick={() => navigate(`/group/${g._id}`)}>
                        {g.name}
                    </div>
                ))
            }
        </div>
    )
}

export default Dashboard;