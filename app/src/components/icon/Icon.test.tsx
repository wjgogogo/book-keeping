import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Icon, { IconButton } from "./Icon";

describe("Icon component test", () => {
  test("should display expected icon when render the Icon component", () => {
    // render 返回值的 container 就是之前 debug 的 dom 结构
    const { container } = render(<Icon icon={"icon"} />);
    const svg = container.querySelector("svg");
    // 测试 svg 节点有 icon 这个样式
    expect(svg).toHaveClass("icon");
  });
});

describe("IconButton component test", () => {
  test("should trigger onClick callback when click the button", () => {
    const mock = jest.fn();
    render(<IconButton icon={"icon"} onClick={mock} />);
    const button = screen.getByRole("button"); // 获取 button 节点

    expect(mock).not.toBeCalled(); // 首先判断 onClick 模拟函数被没有被点击过

    userEvent.click(button);
    expect(mock).toBeCalled(); // 在点击按钮后，判断 onClick 模拟函数被有被点击过
  });
});
