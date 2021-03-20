import moment from "moment";
import { DateFormat, formatTimeStamp, getMonthRange, isSameMonth } from "./dateHelper";

describe("formatTimeStamp function test", () => {
  test("should return year-month-day when given timestamp and YEAR_MONTH_DAY format", () => {
    const timestamp1 = 1615985092598; // 代表 2021-03-17 20:44:52
    expect(formatTimeStamp(timestamp1, DateFormat.YEAR_MONTH_DAY)).toEqual("2021-03-17");

    // 测试闰年的 2 月
    const timestamp2 = 1582905600000; // 代表 2020-02-29 00:00:00
    expect(formatTimeStamp(timestamp2, DateFormat.YEAR_MONTH_DAY)).toEqual("2020-02-29");

    // 测试平年的 2 月
    const timestamp3 = 1551283200000; // 代表 2019-02-28 00:00:00
    expect(formatTimeStamp(timestamp3, DateFormat.YEAR_MONTH_DAY)).toEqual("2019-02-28");
  });

  test("should return month day and day of week when given timestamp and MONTH_DAYOFWEEK format", () => {
    const timestamp1 = 1615985092598; // 代表 2021-03-17 20:44:52
    expect(formatTimeStamp(timestamp1, DateFormat.MONTH_DAYOFWEEK)).toEqual("3月17日 星期三");

    // 测试闰年的 2 月
    const timestamp2 = 1582905600000; // 代表 2020-02-29 00:00:00
    expect(formatTimeStamp(timestamp2, DateFormat.MONTH_DAYOFWEEK)).toEqual("2月29日 星期六");

    // 测试平年的 2 月
    const timestamp3 = 1551283200000; // 代表 2019-02-28 00:00:00
    expect(formatTimeStamp(timestamp3, DateFormat.MONTH_DAYOFWEEK)).toEqual("2月28日 星期四");
  });

  test("should return day of month when given timestamp and Day format", () => {
    const timestamp1 = 1615985092598; // 代表 2021-03-17 20:44:52
    expect(formatTimeStamp(timestamp1, DateFormat.Day)).toEqual("17");

    // 测试闰年的 2 月
    const timestamp2 = 1582905600000; // 代表 2020-02-29 00:00:00
    expect(formatTimeStamp(timestamp2, DateFormat.Day)).toEqual("29");

    // 测试平年的 2 月
    const timestamp3 = 1551283200000; // 代表 2019-02-28 00:00:00
    expect(formatTimeStamp(timestamp3, DateFormat.Day)).toEqual("28");
  });
});

describe("getMonthRange function test", () => {
  test("should return start and end timestamp when given 2020-07", () => {
    const month1 = moment("2020-07-01");
    expect(getMonthRange(month1)).toEqual([1593532800000, 1596211199999]);

    const month2 = moment("2020-07-15");
    expect(getMonthRange(month2)).toEqual([1593532800000, 1596211199999]);

    const month3 = moment("2020-07-31");
    expect(getMonthRange(month3)).toEqual([1593532800000, 1596211199999]);
  });

  test("should return start and end timestamp when given 2020-02", () => {
    const month1 = moment("2020-02-01");
    expect(getMonthRange(month1)).toEqual([1580486400000, 1582991999999]);

    const month2 = moment("2020-02-15");
    expect(getMonthRange(month2)).toEqual([1580486400000, 1582991999999]);

    const month3 = moment("2020-02-29");
    expect(getMonthRange(month3)).toEqual([1580486400000, 1582991999999]);
  });

  test("should return start and end timestamp when given 2019-02", () => {
    const month1 = moment("2019-02-01");
    expect(getMonthRange(month1)).toEqual([1548950400000, 1551369599999]);

    const month2 = moment("2019-02-15");
    expect(getMonthRange(month2)).toEqual([1548950400000, 1551369599999]);

    const month3 = moment("2019-02-28");
    expect(getMonthRange(month3)).toEqual([1548950400000, 1551369599999]);
  });
});

describe("isSameMonth function test", () => {
  test("should return true when given timestamp is in 2020-07 ", () => {
    const month = moment("2020-07-01");
    const timeStamp1 = 1593532800000; // 2020-07-01 00:00:00:000
    expect(isSameMonth(timeStamp1, month)).toBeTruthy(); // toBeTruthy 用于判断返回值是否为 true

    const timeStamp2 = 1596211199999; // 2020-07-31 23:59:59:999
    expect(isSameMonth(timeStamp2, month)).toBeTruthy();

    const timeStamp3 = 1595174400000; // 2020-07-20 00:00:00:000
    expect(isSameMonth(timeStamp3, month)).toBeTruthy();

    const month2 = moment("2020-07-15");
    expect(getMonthRange(month2)).toEqual([1593532800000, 1596211199999]);

    const month3 = moment("2020-07-31");
    expect(getMonthRange(month3)).toEqual([1593532800000, 1596211199999]);
  });

  test("should return false when given timestamp is out 2020-06 ", () => {
    const month = moment("2020-06");
    const timeStamp1 = 1593532800000; // 2020-07-01 00:00:00:000
    expect(isSameMonth(timeStamp1, month)).toBeFalsy(); // toBeFalsy 用于判断返回值是否为 false

    const timeStamp2 = 1596211199999; // 2020-07-31 23:59:59:999
    expect(isSameMonth(timeStamp2, month)).toBeFalsy();
  });
});
