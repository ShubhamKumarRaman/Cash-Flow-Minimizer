import { generateExcel } from "../services/export.service.js";
import { getOptimizedSettlement } from "../services/settlement.service.js";
import User from '../models/user.model.js';

export const exportReport = async (req, res) => {
    try {
        const { groupId } = req.params;
        if (!groupId) {
            return res.status(400).json({ message: 'groupId is required' });
        }

        const transactions = await getOptimizedSettlement(groupId);

        const userIds = Array.isArray(transactions)
            ? [...new Set(transactions.flatMap((t) => [t.from, t.to]).filter(Boolean))]
            : [];

        const users = userIds.length
            ? await User.find({ _id: { $in: userIds } }).select('name')
            : [];

        const nameById = new Map(users.map((u) => [u._id.toString(), u.name]));

        const data = Array.isArray(transactions)
            ? transactions.map((t) => ({
                from: nameById.get(String(t.from)) ?? String(t.from),
                to: nameById.get(String(t.to)) ?? String(t.to),
                amount: t.amount,
            }))
            : transactions;

        console.log(
            `[export] groupId=${groupId} transactions=${Array.isArray(data) ? data.length : 'non-array'}`
        );
        if (Array.isArray(data) && data.length) {
            console.log('[export] sample:', data.slice(0, 3));
        }

        const workbook = await generateExcel(
            Array.isArray(data) && data.length
                ? data
                : [{ from: '-', to: '-', amount: 0 }]
        );

        res.setHeader(
            'Content-Type',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        );
        res.setHeader('Content-Disposition', 'attachment; filename="report.xlsx"');

        await workbook.xlsx.write(res);
        res.end();
    } catch (error) {
        console.error('Export failed:', error);
        res.status(500).json({ message: 'Failed to export report' });
    }
}