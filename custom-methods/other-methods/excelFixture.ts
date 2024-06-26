import { promises as fs } from 'fs';
import * as xlsx from 'xlsx';

// Function to read an Excel file and convert it to a JSON object
async function readExcelAsObject(
    filePath: string,
    sheetName?: string
) {
    try {
        const buffer = await fs.readFile(filePath);
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        if (!sheetName) {
            sheetName = workbook.SheetNames[0]; // Assume you want the first sheet
        }

        const sheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as any[][];  // Type assert to any[][]

        // Skip header row and create an object mapping headers to their respective columns
        const headers = data[0] as string[];  // Type assert to string[]
        const rows = data.slice(1);
        const objects = rows.map((row: any[]) => {  // Explicitly type 'row' as any[]
            let obj: { [key: string]: any } = {};
            headers.forEach((header: string, index: number) => {  // Explicit types for 'header' and 'index'
                obj[header] = row[index];
            });
            return obj;
        });

        return objects;
    } catch (error) {
        console.error("Error reading Excel file:", error);
        throw error;
    }
}

export { readExcelAsObject };
