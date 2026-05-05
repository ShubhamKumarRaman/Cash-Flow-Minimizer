import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
    {
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
        paidBy: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        amount: Number,
        splitBetween: [
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User"
                },
                amount: Number
            }
        ]
    }, { timestamps: true }
);

export default mongoose.model("Expense", expenseSchema);