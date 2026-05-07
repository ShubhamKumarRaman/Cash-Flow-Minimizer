import mongoose from 'mongoose'

const settlementSchema = new mongoose.Schema(
    {
        groupId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Group",
        },
        from: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        to: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
        amount: Number,
        dueDate: Date,
        interestRate: Number,
        isPaid: {
            type: Boolean,
            default: false
        }
    }, { timestamps: true }
)

export default mongoose.model("Settlement", settlementSchema);