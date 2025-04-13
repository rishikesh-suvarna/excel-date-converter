import { excelDateToJsDate, jsDateToExcelDate, formatDate } from './excel-date.js';
import { describe, test, expect } from '@jest/globals';

describe('Excel Date Converter', () => {
  describe('excelDateToJsDate', () => {
    test('converts Excel dates to JS dates correctly', () => {
      const testCases = [
        { excel: 1, year: 1900, month: 0, day: 1 }, // Jan 1, 1900
        { excel: 59, year: 1900, month: 1, day: 28 }, // Feb 28, 1900
        { excel: 61, year: 1900, month: 2, day: 1 }, // Mar 1, 1900
        { excel: 43831, year: 2020, month: 0, day: 1 }, // Jan 1, 2020
        { excel: 44562, year: 2022, month: 0, day: 1 } // Jan 1, 2022
      ];

      testCases.forEach(({ excel, year, month, day }) => {
        const result = excelDateToJsDate(excel);

        expect(result.getUTCFullYear()).toBe(year);
        expect(result.getUTCMonth()).toBe(month);
        expect(result.getUTCDate()).toBe(day);
      });
    });


    test('handles the Excel leap year bug', () => {
      const feb28 = excelDateToJsDate(59);
      const mar1 = excelDateToJsDate(61);

      expect(feb28.getFullYear()).toBe(1900);
      expect(feb28.getMonth()).toBe(1);
      expect(feb28.getDate()).toBe(28);

      expect(mar1.getFullYear()).toBe(1900);
      expect(mar1.getMonth()).toBe(2);
      expect(mar1.getDate()).toBe(1);
    });

    test('throws error for non-numeric input', () => {
      expect(() => excelDateToJsDate('not a number')).toThrow(TypeError);
      expect(() => excelDateToJsDate(null)).toThrow(TypeError);
      expect(() => excelDateToJsDate(undefined)).toThrow(TypeError);
    });
  });

  describe('jsDateToExcelDate', () => {
    test('converts JS dates to Excel dates correctly', () => {
      // Test cases with known JS dates and corresponding Excel dates
      const testCases = [
        { date: new Date(1900, 0, 1), excel: 1 }, // Jan 1, 1900
        { date: new Date(1900, 1, 28), excel: 59 }, // Feb 28, 1900
        { date: new Date(1900, 2, 1), excel: 61 }, // Mar 1, 1900 (after leap year bug)
        { date: new Date(2020, 0, 1), excel: 43831 }, // Jan 1, 2020
        { date: new Date(2021, 11, 31), excel: 44561 } // Dec 31, 2021 (corrected value)
      ];

      testCases.forEach(({ date, excel }) => {
        const result = jsDateToExcelDate(date);

        // For very close dates, we'll round to account for any millisecond differences
        expect(Math.round(result)).toBe(excel);
      });
    });

    test('throws error for non-Date input', () => {
      expect(() => jsDateToExcelDate('not a date')).toThrow(TypeError);
      expect(() => jsDateToExcelDate(123)).toThrow(TypeError);
      expect(() => jsDateToExcelDate(null)).toThrow(TypeError);
      expect(() => jsDateToExcelDate(undefined)).toThrow(TypeError);
    });
  });

  describe('formatDate', () => {
    test('formats dates with default format', () => {
      const date = new Date(2022, 0, 15); // Jan 15, 2022

      expect(formatDate(date)).toBe('2022-01-15');
    });

    test('formats dates with custom format', () => {
      const date = new Date(2022, 0, 15, 13, 45, 30); // Jan 15, 2022, 13:45:30

      expect(formatDate(date, 'YYYY/MM/DD')).toBe('2022/01/15');
      expect(formatDate(date, 'MM/DD/YYYY')).toBe('01/15/2022');
      expect(formatDate(date, 'DD.MM.YYYY HH:mm:ss')).toBe('15.01.2022 13:45:30');
    });

    test('throws error for non-Date input', () => {
      expect(() => formatDate('not a date')).toThrow(TypeError);
      expect(() => formatDate(123)).toThrow(TypeError);
      expect(() => formatDate(null)).toThrow(TypeError);
      expect(() => formatDate(undefined)).toThrow(TypeError);
    });
  });
});
