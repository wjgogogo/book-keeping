import moment from "moment";
import { RecordItem, RecordType } from "./../pages/detail/components/record/Record";
import { getDailySummaryInMonth, getSummary, getTypeSummaryInMonth, groupDailyRecords } from "./recordHelper";

// 因为后续多个测试都需要 mock 的账单记录，所以单独抽离出来
const mockRecords: RecordItem[] = [
  {
    timeStamp: 1611131232303, // 2021-01-20 16:27:12:303
    type: RecordType.Expenditure,
    name: "餐饮",
    price: 100,
    remark: "请人吃饭",
    id: 1,
  },
  {
    timeStamp: 1609921863459, // 2021-01-06 16:31:03:459
    type: RecordType.Expenditure,
    name: "购物",
    price: 200,
    id: 2,
  },
  {
    timeStamp: 1609835470256, // 2021-01-05 16:31:10:256
    type: RecordType.Expenditure,
    name: "蔬菜",
    price: 20,
    id: 3,
  },
  {
    timeStamp: 1609835470356, // 2021-01-05 16:31:10:356
    type: RecordType.Expenditure,
    name: "蔬菜",
    price: 20,
    id: 4,
  },
  {
    timeStamp: 1609835476467, // 2021-01-05 16:31:16:467
    type: RecordType.Income,
    name: "工资",
    price: 2000,
    id: 5,
  },
];
describe("getSummary function test", () => {
  // 测试正常情况
  test("should return expected summary when given some records", () => {
    expect(getSummary(mockRecords)).toEqual({ totalIncome: 2000, totalExpenditure: 340 });
  });

  // 测试数组为空的情况
  test("should return nil summary when given empty list", () => {
    expect(getSummary([])).toEqual({ totalIncome: 0, totalExpenditure: 0 });
  });
});

describe("groupDailyRecords function test", () => {
  test("should return expected grouped daily records when given some records", () => {
    expect(groupDailyRecords(mockRecords)).toEqual([
      {
        records: [
          {
            id: 1,
            name: "餐饮",
            price: 100,
            remark: "请人吃饭",
            timeStamp: 1611131232303,
            type: RecordType.Expenditure,
          },
        ],
        summary: {
          totalExpenditure: 100,
          totalIncome: 0,
        },
        timeStamp: 1611131232303,
      },
      {
        records: [
          {
            id: 2,
            name: "购物",
            price: 200,
            timeStamp: 1609921863459,
            type: RecordType.Expenditure,
          },
        ],
        summary: {
          totalExpenditure: 200,
          totalIncome: 0,
        },
        timeStamp: 1609921863459,
      },
      {
        records: [
          {
            id: 5,
            name: "工资",
            price: 2000,
            timeStamp: 1609835476467,
            type: RecordType.Income,
          },
          {
            id: 4,
            name: "蔬菜",
            price: 20,
            timeStamp: 1609835470356,
            type: "expenditure",
          },
          {
            id: 3,
            name: "蔬菜",
            price: 20,
            timeStamp: 1609835470256,
            type: RecordType.Expenditure,
          },
        ],
        summary: {
          totalExpenditure: 40,
          totalIncome: 2000,
        },
        timeStamp: 1609835470256,
      },
    ]);
  });
  test("should return empty list when given empty list", () => {
    expect(groupDailyRecords([])).toEqual([]);
  });
});

describe("getDailySummaryInMonth function test", () => {
  //  mock 所选择的月份
  const mockMonth = moment("2021-01");
  test("should return expected grouped daily records when given some records", () => {
    const result = getDailySummaryInMonth(mockRecords, mockMonth);

    expect(result).toHaveLength(31); // toHaveLength 用于判断返回值的数组的长度
    expect(result[4]).toEqual({ date: 5, totalExpenditure: 40, totalIncome: 2000 }); // 分别验证有记录的数据
    expect(result[5]).toEqual({ date: 6, totalExpenditure: 200, totalIncome: 0 });
    expect(result[19]).toEqual({ date: 20, totalExpenditure: 100, totalIncome: 0 });
  });
  test("should return nil list when given empty list", () => {
    const result = getDailySummaryInMonth([], mockMonth);

    expect(result).toHaveLength(31);
    expect(result[0]).toEqual({ date: 1, totalExpenditure: 0, totalIncome: 0 });
  });
});

describe("getTypeSummaryInMonth function test", () => {
  test("should return expected type summary when given some records", () => {
    const { incomeSummary, expenditureSummary } = getTypeSummaryInMonth(mockRecords);

    expect(incomeSummary).toEqual([{ name: "工资", total: 2000 }]);
    expect(expenditureSummary).toEqual([
      { name: "餐饮", total: 100 },
      { name: "购物", total: 200 },
      { name: "蔬菜", total: 40 },
    ]);
  });
  test("should return nil type summary when given empty list", () => {
    const { incomeSummary, expenditureSummary } = getTypeSummaryInMonth([]);

    expect(incomeSummary).toEqual([]);
    expect(expenditureSummary).toEqual([]);
  });
});
