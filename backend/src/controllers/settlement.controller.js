import { getOptimizedSettlement } from "../services/settlement.service.js";
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

export const getSettlement = async (req, res) => {
    const { groupId } = req.params;

    const transactions = await getOptimizedSettlement(groupId);

    //convert Ids -> name (import for UI)
    const result = [];

    for (let t of transactions) {
        const fromUser = await User.findById(t.from);
        const toUser = await User.findById(t.to);

        result.push({
            from: fromUser.name,
            to: toUser.name,
            amount: t.amount
        })
    }

    res.json(result);
}