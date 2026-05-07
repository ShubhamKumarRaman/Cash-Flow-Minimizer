import Expense from '../models/expense.model.js'
import { APIFeatures } from '../utils/apiFeatures.js';

export const addExpense = async (req, res) => {
    const { groupId, paidBy, amount, members } = req.body;

    const splitAmount = amount / members.length;
    const splitBetween = members.map((user) => ({
        user,
        amount: splitAmount
    }))

    const expense = await Expense.create({
        groupId,
        paidBy,
        amount,
        splitBetween
    })

    res.json(expense);
}

// export const getExpenses = async (req, res) => {
//     const expenses = await Expense.find({
//         groupId: req.params.groupId,
//     }).populate("paidBy", "name");

//     res.json(expenses);
// }

export const getExpenses = async (req, res) => {
    const featuers = new APIFeatures(
        Expense.find({ groupId: req.params.groupId }),
        req.query
    ).paginate();

    const expenses = await featuers.query;

    res.json(expense);
}