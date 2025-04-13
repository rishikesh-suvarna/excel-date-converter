# Excel Date Converter

A lightweight JavaScript library to convert Excel serial date numbers to JavaScript Date objects and vice versa.

## Installation

```bash
npm install excel-date-converter
```

## Features

- Convert Excel serial date numbers to JavaScript Date objects
- Convert JavaScript Date objects to Excel serial numbers
- Handle Excel's 1900 leap year bug (February 29, 1900)
- Format JavaScript dates with customizable patterns
- ES Modules support

## Usage with ES Modules

```javascript
// Import specific functions
import { excelDateToJsDate, jsDateToExcelDate, formatDate } from 'excel-date-converter';

// Or import everything as a namespace
import * as excelDateConverter from 'excel-date-converter';
```

### Converting Excel Dates to JavaScript Dates

```javascript
import { excelDateToJsDate } from 'excel-date-converter';

// Convert Excel date to JavaScript Date
const jsDate = excelDateToJsDate(44561); // Returns Date object for December 31, 2021
console.log(jsDate.toISOString()); // 2021-12-31T00:00:00.000Z

// Another example
const newYearsDay = excelDateToJsDate(44562); // Returns Date object for January 1, 2022
console.log(newYearsDay.toISOString()); // 2022-01-01T00:00:00.000Z
```

### Converting JavaScript Dates to Excel Dates

```javascript
import { jsDateToExcelDate } from 'excel-date-converter';

// Convert JavaScript Date to Excel date
const excelDate = jsDateToExcelDate(new Date('2021-12-31'));
console.log(excelDate); // 44561 (Excel serial number for December 31, 2021)

// Convert New Year's Day 2022
const newYearExcelDate = jsDateToExcelDate(new Date('2022-01-01'));
console.log(newYearExcelDate); // 44562 (Excel serial number for January 1, 2022)
```

### Formatting Dates

```javascript
import { excelDateToJsDate, formatDate } from 'excel-date-converter';

// Convert Excel date to JavaScript Date
const jsDate = excelDateToJsDate(44561);

// Format with default pattern (YYYY-MM-DD)
console.log(formatDate(jsDate)); // 2021-12-31

// Format with custom patterns
console.log(formatDate(jsDate, 'DD/MM/YYYY')); // 31/12/2021
console.log(formatDate(jsDate, 'MM/DD/YYYY HH:mm:ss')); // 12/31/2021 00:00:00
```

### Handling Excel's Leap Year Bug

Excel incorrectly treats 1900 as a leap year, including February 29, 1900 (day 60) which didn't exist.

```javascript
import { excelDateToJsDate } from 'excel-date-converter';

// February 28, 1900 (day 59)
const feb28 = excelDateToJsDate(59);
console.log(feb28.toISOString()); // 1900-02-28T00:00:00.000Z

// March 1, 1900 (day 61 - day 60 is the non-existent Feb 29)
const mar1 = excelDateToJsDate(61);
console.log(mar1.toISOString()); // 1900-03-01T00:00:00.000Z

// Disable leap year bug adjustment
const withoutBugFix = excelDateToJsDate(61, false);
console.log(withoutBugFix.toISOString()); // 1900-03-02T00:00:00.000Z
```

## CommonJS Usage (Legacy)

If you're using CommonJS, you'll need to use the dynamic import syntax:

```javascript
async function example() {
  const excelModule = await import('excel-date-converter');
  const jsDate = excelModule.excelDateToJsDate(44561);
  console.log(jsDate);
}

example();
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