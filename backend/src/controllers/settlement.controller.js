import { getOptimizedSettlement } from "../services/settlement.service.js";
import { calculateBalances } from "../services/balance.service.js";
import User from '../models/user.model.js';
import Settlement from '../models/settlement.model.js'
import { calculateInterest } from "../services/interest.service.js";
import client from "../config/redis.js";

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

export const markAsPaid = async (req, res) => {
    const { id } = req.params;

    const settlement = await Settlement.findById(id);

    if (!settlement) {
        return res.status(404).json("Not found");
    }

    const today = new Date();
    const due = new Date(settlement.dueDate);

    let finalAmount = settlement.amount;

    if (today > due) {
        const daysLate = Math.floor((today - due) / (1000 * 60 * 60 * 24));
        finalAmount = calculateInterest(
            settlement.amount,
            settlement.interestRate,
            daysLate
        );
    }

    settlement.isPaid = true;
    await settlement.save();

    res.json({ message: "Paid", finalAmount });
}

export const getCachedSettlement = async (groupId) => {
    const cache = await client.get(groupId);

    if (cache)
        return JSON.parse(cache);

    const data = await getOptimizedSettlement(groupId);

    await client.setEx(groupId, 60, stringify(data));

    return data;
}