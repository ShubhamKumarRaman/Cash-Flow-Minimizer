import { calculateBalances } from "./balance.service.js";
import { minimizeCashFlow } from "../algorithms/greedyMinimizer.js";

export const getOptimizedSettlement = async (groupId) => {
    const balanceMap = await calculateBalances(groupId);

    const transactions = minimizeCashFlow(balanceMap);

    return transactions;
}