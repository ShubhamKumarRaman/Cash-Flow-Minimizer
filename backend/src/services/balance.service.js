import Expense from '../models/expense.model.js'

export const calculateBalances = async (groupId) => {
    const expenses = await Expense.find({ groupId });

    const balanceMap = {};

    expenses.forEach((expense) => {
        const payer = expense.paidBy.toString();

        //Add full amount to payer
        balanceMap[payer] = (balanceMap[payer] || 0) + expense.amount;

        //Substract split amount
        expense.splitBetween.forEach((split) => {
            const user = split.user.toString();

            balanceMap[user] = (balanceMap[user] || 0) - split.amount;
        })
    })
    return balanceMap;
}