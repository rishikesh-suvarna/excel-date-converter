# Excel Date Converter

A lightweight JavaScript library to convert Excel serial date numbers to JavaScript Date objects and vice versa.

## Installation

```bash
npm install excel-date-converter
```

## Usage

```javascript
const excelDateConverter = require('excel-date-converter');

// Convert Excel date to JavaScript Date
const jsDate = excelDateConverter.excelDateToJsDate(44562); // Returns Date object for December 31, 2021
console.log(jsDate); // 2021-12-31T00:00:00.000Z

// Convert JavaScript Date to Excel date
const excelDate = excelDateConverter.jsDateToExcelDate(new Date('2021-12-31'));
console.log(excelDate); // ~44562 (Excel serial number for December 31, 2021)

// Format date as string
const formattedDate = excelDateConverter.formatDate(jsDate, 'YYYY-MM-DD HH:mm:ss');
console.log(formattedDate); // 2021-12-31 00:00:00
```

## API Reference

### excelDateToJsDate(excelDate, adjustForLeapYearBug = true)

Converts an Excel serial date number to a JavaScript Date object.

- `excelDate` (Number): Excel serial date number
- `adjustForLeapYearBug` (Boolean, optional): Whether to adjust for Excel's 1900 leap year bug. Default: `true`
- Returns: JavaScript Date object

### jsDateToExcelDate(jsDate, adjustForLeapYearBug = true)

Converts a JavaScript Date object to an Excel serial date number.

- `jsDate` (Date): JavaScript Date object
- `adjustForLeapYearBug` (Boolean, optional): Whether to adjust for Excel's 1900 leap year bug. Default: `true`
- Returns: Excel serial date number

### formatDate(date, format = 'YYYY-MM-DD')

Formats a JavaScript Date object to a string using specified format.

- `date` (Date): JavaScript Date object
- `format` (String, optional): Format string with the following tokens:
  - `YYYY`: Four-digit year
  - `MM`: Two-digit month (01-12)
  - `DD`: Two-digit day (01-31)
  - `HH`: Two-digit hours (00-23)
  - `mm`: Two-digit minutes (00-59)
  - `ss`: Two-digit seconds (00-59)
- Returns: Formatted date string

## Excel Date System Details

Excel uses a serial number system for dates:
- In the default 1900 date system, serial number 1 represents January 1, 1900
- Excel incorrectly treats 1900 as a leap year (February 29, 1900 never existed)
- Times are represented as fractional days

This library handles these quirks automatically by default.

## License

MIT