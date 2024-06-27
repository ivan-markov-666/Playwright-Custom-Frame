/**
 * @description     This method reads an Excel file and converts it to a JSON object.
 */

// Import the 'fs' module to read files and the 'xlsx' module to work with Excel files.
import { promises as fs } from 'fs';
// Import the 'xlsx' module to work with Excel files.
import * as xlsx from 'xlsx';

// Function to read an Excel file and convert it to a JSON object
/**
 * @description         This method reads an Excel file and converts it to a JSON object.
 * @param filePath      Provide the file path.
 * @param sheetName     Optional. Provide the sheet name.
 * @param headerRow     Optional. Provide the row number of the headers (0-indexed).
 * @returns             Returns the JSON object.
 */
async function readExcelAsObject(
    filePath: string,
    sheetName?: string,
    headerRow: number = 0
) {
    try {
        // Read the Excel file and convert it to a buffer.
        const buffer = await fs.readFile(filePath);
        // Read the buffer and convert it to a workbook.
        const workbook = xlsx.read(buffer, { type: 'buffer' });
        // Get the sheet name.
        if (!sheetName) {
            // Assume you want the first sheet.
            sheetName = workbook.SheetNames[0]; // Assume you want the first sheet
        }

        // Get the sheet data and convert it to a JSON object.
        const sheet = workbook.Sheets[sheetName];
        // Convert the sheet to a JSON object.
        const data = xlsx.utils.sheet_to_json(sheet, { header: 1 }) as any[][];  // Type assert to any[][]
        // Get headers from the specified header row
        const headers = data[headerRow] as string[];  // Type assert to string[]
        // Create an object for each row with headers as keys and row values as values in the object
        const rows = data.slice(headerRow + 1);
        const objects = rows.map((row: any[]) => {  // Explicitly type 'row' as any[]
            let obj: { [key: string]: any } = {};
            headers.forEach((header: string, index: number) => {  // Explicit types for 'header' and 'index'
                obj[header] = row[index];
            });
            // Return the object with headers as keys and row values as values in the object
            return obj;
        });
        // Return the JSON object. Each object represents a row in the Excel file. The keys are the headers. The values are the row values.
        return objects;
    } catch (error) {
        console.error("Error reading Excel file:", error);
        throw error;
    }
}

export { readExcelAsObject };
