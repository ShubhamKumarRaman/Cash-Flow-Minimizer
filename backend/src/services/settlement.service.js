import { calculateBalances } from "./balance.service.js";
import { minimizeCashFlow } from "../algorithms/greedyMinimizer.js";
import Settlement from '../models/settlement.model.js'

export const getOptimizedSettlement = async (groupId) => {
    const balanceMap = await calculateBalances(groupId);

    const transactions = minimizeCashFlow(balanceMap);

    return transactions;
}

export const saveSettlements = async (groupId, transactions) => {
    await Settlement.deleteMany({ groupId });

    const data = transactions.map((t) => ({
        groupId,
        from: t.from,
        to: t.to,
        amount: t.amount,
        dueDate: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        interestRate: 0,
    }))

    return Settlement.insertMany(data);
}