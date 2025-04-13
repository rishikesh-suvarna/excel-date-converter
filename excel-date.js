/* eslint-disable no-param-reassign */
/**
 * Excel Date Converter
 * Utility for converting Excel serial date numbers to JavaScript Date objects and vice versa
 */

// Excel's date system has a quirk: it incorrectly treats 1900 as a leap year
// This constant accounts for the Excel leap year bug (day 60 = Feb 29, 1900 which didn't exist)
const EXCEL_LEAP_YEAR_BUG = 1;

// Milliseconds in a day constant
const MILLISECONDS_PER_DAY = 24 * 60 * 60 * 1000;

/**
 * Converts an Excel serial date number to a JavaScript Date object
 * @param {number} excelDate - Excel serial date number
 * @param {boolean} [adjustForLeapYearBug=true] - Whether to adjust for Excel's 1900 leap year bug
 * @returns {Date} JavaScript Date object
 */
function excelDateToJsDate(excelDate, adjustForLeapYearBug = true) {
  if (typeof excelDate !== 'number') {
    throw new TypeError('Excel date must be a number');
  }

  // Adjust for Excel's leap year bug if needed
  if (adjustForLeapYearBug && excelDate >= 60) {
    excelDate -= EXCEL_LEAP_YEAR_BUG;
  }

  const msFromExcelEpoch = excelDate * MILLISECONDS_PER_DAY;
  const excelEpoch = new Date(Date.UTC(1899, 11, 31)); // Excel day 0

  return new Date(excelEpoch.getTime() + msFromExcelEpoch);
}

/**
 * Converts a JavaScript Date object to an Excel serial date number
 * @param {Date} jsDate - JavaScript Date object
 * @param {boolean} [adjustForLeapYearBug=true] - Whether to adjust for Excel's 1900 leap year bug
 * @returns {number} Excel serial date number
 */
function jsDateToExcelDate(jsDate, adjustForLeapYearBug = true) {
  if (!(jsDate instanceof Date)) {
    throw new TypeError('JavaScript date must be a Date object');
  }

  // Get timestamp for Excel epoch (January 1, 1900)
  const excelEpoch = Date.UTC(1900, 0, 1);

  // Get the difference in days and add 1 (since Excel day 1 = Jan 1, 1900)
  let excelDate = Math.round((jsDate.getTime() - excelEpoch) / MILLISECONDS_PER_DAY) + 1;

  // Handle the Excel leap year bug (1900 Feb 29 doesn't exist)
  if (adjustForLeapYearBug && excelDate >= 60) {
    excelDate += EXCEL_LEAP_YEAR_BUG;
  }

  return excelDate;
}

/**
 * Formats a JavaScript Date object to a string using specified format
 * @param {Date} date - JavaScript Date object
 * @param {string} [format='YYYY-MM-DD'] - Format string
 * @returns {string} Formatted date string
 */
function formatDate(date, format = 'YYYY-MM-DD') {
  if (!(date instanceof Date)) {
    throw new TypeError('Date must be a Date object');
  }

  const year = date.getFullYear();
  const month = date.getMonth() + 1; // getMonth() returns 0-11
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  // Simple formatting - replace tokens with actual values
  return format
    .replace('YYYY', year)
    .replace('MM', month.toString().padStart(2, '0'))
    .replace('DD', day.toString().padStart(2, '0'))
    .replace('HH', hours.toString().padStart(2, '0'))
    .replace('mm', minutes.toString().padStart(2, '0'))
    .replace('ss', seconds.toString().padStart(2, '0'));
}

export {
  excelDateToJsDate,
  jsDateToExcelDate,
  formatDate
};
