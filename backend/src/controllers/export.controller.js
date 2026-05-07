import { generateExcel } from "../services/export.service";
import { getOptimizedSettlement } from "../services/settlement.service";

export const exportReport = async (req, res) => {
    const data = await getOptimizedSettlement(req.params.groupId);

    const workbook = await generateExcel(data);

    res.setHeader(
        "Content-Type",
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );

    await workbook.xlsx.write(res);
    res.end();
}