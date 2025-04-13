/**
 * Excel Date Converter
 * A package for converting between Excel serial date numbers and JavaScript Date objects
 */

import * as excelDate from './excel-date.js';

export default excelDate;
export const { excelDateToJsDate, jsDateToExcelDate, formatDate } = excelDate;
