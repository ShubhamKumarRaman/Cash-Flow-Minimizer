import { calculateBalances } from "../services/balance.service.js";
import User from '../models/user.model.js';

export const getBalances = async (req, res) => {
    const { groupId } = req.params;

    const balances = await calculateBalances(groupId);

    //convert userId => user name for readability
    const result = [];
    for (let userId in balances) {
        const user = await User.findById(userId);

        result.push({
            user: user.name,
            balance: balances[userId],
        })
    }
    res.json(result);
}