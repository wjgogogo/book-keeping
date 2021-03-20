import { RecordType } from "../pages/detail/components/record/Record";
import { getIconByName } from "./iconSelector";

describe("getIconByName function test", () => {
  test("should return icon icon when give expenditure type and name", () => {
    expect(getIconByName(RecordType.Expenditure, "餐饮")).toEqual({
      name: "餐饮",
      icon: "icon-food",
    });

    expect(getIconByName(RecordType.Expenditure, "购物")).toEqual({
      name: "购物",
      icon: "icon-gouwu",
    });

    expect(getIconByName(RecordType.Expenditure, "日用")).toEqual({
      name: "日用",
      icon: "icon-riyongpin",
    });
  });

  test("should return icon icon when give income type and name", () => {
    expect(getIconByName(RecordType.Income, "工资")).toEqual({
      name: "工资",
      icon: "icon-salary",
    });

    expect(getIconByName(RecordType.Income, "兼职")).toEqual({
      name: "兼职",
      icon: "icon-part-time-job",
    });

    expect(getIconByName(RecordType.Income, "理财")).toEqual({
      name: "理财",
      icon: "icon-financing",
    });
  });

  test("should return undefined when give invalid income type and name", () => {
    expect(getIconByName(RecordType.Expenditure, "工资")).toBeUndefined(); // toBeUndefined 用于判断返回值是否为 undefined
    expect(getIconByName(RecordType.Income, "日用")).toBeUndefined();
  });
});
