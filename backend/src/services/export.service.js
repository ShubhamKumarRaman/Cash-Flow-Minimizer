import ExcelJS from 'exceljs'

export const generateExcel = async (data) => {
    const workbook = new ExcelJS.Workbook();
    const sheet = workbook.addWorksheet("Report");

    sheet.columns = [
        { header: "From", key: "from" },
        { header: "To", key: "to" },
        { header: "Amount", key: "amount" }
    ];

    data.forEach((d) => sheet.addRow(d));

    return workbook;
}