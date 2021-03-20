import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Record, { RecordItem, RecordType } from "./Record";
describe("Record component test", () => {
  const record: RecordItem = {
    id: 1,
    timeStamp: 1616061578915, // 2021-03-18 17:59:38:915
    type: RecordType.Expenditure,
    name: "购物",
    price: 20,
    remark: "this is remark",
  };
  const mockOpenUpdateModalFn = jest.fn();
  const mockDeleteRecordFn = jest.fn();

  // 在每一个 test 执行之前执行
  beforeEach(() => {
    // 清空 mock 函数状态，使得各个测试之间互不影响
    mockOpenUpdateModalFn.mockClear();
    mockDeleteRecordFn.mockClear();
  });
  test("should display expected layout when render the Record component", () => {
    const { rerender } = render(
      <Record {...record} onOpenUpdateModal={mockOpenUpdateModalFn} onDeleteRecord={mockDeleteRecordFn} />
    );

    expect(screen.getByText("购物")).toBeInTheDocument();
    expect(screen.getByText("-20")).toBeInTheDocument();
    expect(screen.getByText("this is remark")).toBeInTheDocument();

    // 测试 income 类型的记录 layout 布局
    const incomeRecord = { ...record, name: "红包", type: RecordType.Income };
    rerender(
      <Record {...incomeRecord} onOpenUpdateModal={mockOpenUpdateModalFn} onDeleteRecord={mockDeleteRecordFn} />
    );
    expect(screen.getByText("红包")).toBeInTheDocument();
    expect(screen.getByText("+20")).toBeInTheDocument();
  });

  test("should trigger update callback when click update button", () => {
    render(<Record {...record} onOpenUpdateModal={mockOpenUpdateModalFn} onDeleteRecord={mockDeleteRecordFn} />);

    const updateButton = screen.getAllByRole("button")[0];
    expect(mockOpenUpdateModalFn).not.toBeCalled(); // 首先判断 onClick 模拟函数被没有被点击过

    userEvent.click(updateButton);
    expect(mockOpenUpdateModalFn).toBeCalled(); // 在点击按钮后，判断 onClick 模拟函数被有被点击过
  });

  test("shouldn't trigger delete callback when click cancel button", () => {
    render(<Record {...record} onOpenUpdateModal={mockOpenUpdateModalFn} onDeleteRecord={mockDeleteRecordFn} />);

    const deleteButton = screen.getAllByRole("button")[1];
    expect(mockDeleteRecordFn).not.toBeCalled();

    userEvent.click(deleteButton);
    expect(screen.getByText("您确认想删除这条记录吗？")).toBeInTheDocument();

    userEvent.click(screen.getByText("取 消"));
    expect(mockDeleteRecordFn).not.toBeCalled();
  });

  test("should trigger delete callback when click confirm button", () => {
    render(<Record {...record} onOpenUpdateModal={mockOpenUpdateModalFn} onDeleteRecord={mockDeleteRecordFn} />);

    const deleteButton = screen.getAllByRole("button")[1];
    expect(mockDeleteRecordFn).not.toBeCalled();

    userEvent.click(deleteButton);
    expect(screen.getByText("您确认想删除这条记录吗？")).toBeInTheDocument();

    userEvent.click(screen.getByText("确 认"));
    expect(mockDeleteRecordFn).toBeCalled();
  });
});
