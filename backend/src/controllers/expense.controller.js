import Expense from '../models/expense.model.js'
import { APIFeatures } from '../utils/apiFeatures.js';

export const addExpense = async (req, res) => {
    const { groupId, paidBy, amount, members } = req.body;

    const amountCents = Math.round(Number(amount) * 100);
    if (!Number.isFinite(amountCents) || amountCents <= 0) {
        return res.status(400).json({ message: 'Amount must be a positive number' });
    }

    if (!Array.isArray(members) || members.length === 0) {
        return res.status(400).json({ message: 'Members are required' });
    }

    const base = Math.floor(amountCents / members.length);
    let remainder = amountCents - base * members.length;

    const splitBetween = members.map((user) => {
        const extra = remainder > 0 ? 1 : 0;
        remainder -= extra;
        return {
            user,
            amount: (base + extra) / 100,
        };
    });

    const expense = await Expense.create({
        groupId,
        paidBy,
        amount: amountCents / 100,
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
    const features = new APIFeatures(
        Expense.find({ groupId: req.params.groupId })
            .populate('paidBy', 'name email')
            .populate('splitBetween.user', 'name email'),
        req.query
    ).paginate();

    const expenses = await features.query;

    res.json(expenses);
}