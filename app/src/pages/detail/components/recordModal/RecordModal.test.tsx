import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import RecordModal from "./RecordModal";

describe("RecordModal component test", () => {
  test("should hide the modal when set visible to false", () => {
    const { rerender } = render(<RecordModal visible={true} onClose={jest.fn()} onProcessRecord={jest.fn()} />);
    expect(document.body.querySelector(".ant-modal-root")).toBeInTheDocument();

    rerender(<RecordModal visible={false} onClose={jest.fn()} onProcessRecord={jest.fn()} />);
    expect(document.body.querySelector(".ant-modal-root")).toBeNull();
  });

  test("should trigger onClose callback when click cancel button", () => {
    const onClose = jest.fn();
    render(<RecordModal visible={true} onClose={onClose} onProcessRecord={jest.fn()} />);

    expect(onClose).not.toBeCalled();
    userEvent.click(screen.getByText("取 消"));
    expect(onClose).toBeCalled();
  });

  test("should validate the input onClose callback when click confirm button", () => {
    render(<RecordModal visible={true} onClose={jest.fn()} onProcessRecord={jest.fn()} />);

    // 还未输入类型的情况下
    userEvent.click(screen.getByText("确 认"));
    expect(screen.getByText("请选择类型")).toBeInTheDocument();

    userEvent.click(screen.getByText("餐饮").parentElement?.firstElementChild!);

    // 还没输入金额的情况下
    userEvent.click(screen.getByText("确 认"));
    expect(screen.getByText("请输入金额")).toBeInTheDocument();

    userEvent.type(screen.getByText("金额：").parentElement?.querySelector("input")!, "200");

    // 所有必须项都输入完毕
    userEvent.click(screen.getByText("确 认"));
    expect(screen.getByText("成功")).toBeInTheDocument();
  });

  test("should trigger onProcess callback when click confirm button and pass all the verification", () => {
    const onProcess = jest.fn();
    render(<RecordModal visible={true} onClose={jest.fn()} onProcessRecord={onProcess} />);

    // 选择餐饮类型
    userEvent.click(screen.getByText("餐饮").parentElement?.firstElementChild!);

    // 输入金额
    userEvent.type(screen.getByText("金额：").parentElement?.querySelector("input")!, "200");

    // 输入备注
    userEvent.type(screen.getByText("备注：").parentElement?.querySelector("input")!, "this is mark");

    userEvent.click(screen.getByText("确 认"));

    expect(onProcess).toBeCalled();
    expect(onProcess).toBeCalledWith({
      name: "餐饮",
      price: 200,
      remark: "this is mark",
      timeStamp: expect.any(Number), // 由于弹出框会自动填充时间，所以我们这里测试 timeStamp 只要是数字即可
      type: "expenditure",
    });
  });
});
