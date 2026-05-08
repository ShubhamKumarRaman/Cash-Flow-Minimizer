import Expense from '../models/expense.model.js'

export const calculateBalances = async (groupId) => {
    const expenses = await Expense.find({ groupId });

    const balanceCents = {};

    expenses.forEach((expense) => {
        const payer = expense.paidBy.toString();

        const amountCents = Math.round(Number(expense.amount) * 100);
        if (!Number.isFinite(amountCents)) return;

        //Add full amount to payer
        balanceCents[payer] = (balanceCents[payer] || 0) + amountCents;

        let splitSumCents = 0;

        //Substract split amount
        expense.splitBetween.forEach((split) => {
            const user = split.user.toString();
            const splitCents = Math.round(Number(split.amount) * 100);
            if (!Number.isFinite(splitCents)) return;
            splitSumCents += splitCents;
            balanceCents[user] = (balanceCents[user] || 0) - splitCents;
        })

        // Historical data might have per-split rounding that doesn't sum to amount.
        // Adjust payer so each expense is net-zero.
        const diff = amountCents - splitSumCents;
        if (diff !== 0) {
            balanceCents[payer] -= diff;
        }
    })

    const balanceMap = {};
    for (const userId of Object.keys(balanceCents)) {
        balanceMap[userId] = balanceCents[userId] / 100;
    }

    return balanceMap;
}