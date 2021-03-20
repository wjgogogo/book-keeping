import React from "react";
import { render, screen } from "@testing-library/react";
import { Provider } from "../../components/provider/Provider";
import DetailPage from "./DetailPage";
import userEvent from "@testing-library/user-event";

describe("DetailPage component test", () => {
  test("should display expected layout when render the DetailPage component", () => {
    const { container } = render(
      <Provider>
        <DetailPage />
      </Provider>
    );
    const content = container.querySelector(".detail-page-content");
    expect(content?.childElementCount).toEqual(0);
  });

  test("should open RecordModal when click create new button", () => {
    render(
      <Provider>
        <DetailPage />
      </Provider>
    );

    // Modal 组件是被挂载在 body 上的
    expect(document.body.querySelector(".ant-modal-root")).toBeNull();

    userEvent.click(screen.getByRole("button"));
    expect(document.body.querySelector(".ant-modal-root")).toBeInTheDocument();
  });
});
