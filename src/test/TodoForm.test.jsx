import React from "react"
import { render, fireEvent } from "@testing-library/react"
import TodoForm from "components/TodoForm"

describe("<TodoForm/>", () => {

  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />) // {props1, props2, props3}
    const { getByText, getByPlaceholderText } = utils
    const input = getByPlaceholderText("할 일을 입력하세요")
    const button = getByText("등록")
    return {
      ...utils,
      input,
      button,
    }
  }

  it("has input and a button", () => {
    const { input, button } = setup(); // return해주니까 
    expect(input).toBeTruthy() // 존재 확인
    expect(button).toBeTruthy()
  });

  it("changes input", () => {
    const { input } = setup();

    // <input>에 value={value}를 "TDD 배우기"로 바꿈
    // onChange 이벤트 발생
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    });

    // <input>의 value가 "TDD 배우기"인지 아닌지 확인
    expect(input).toHaveAttribute("value", "TDD 배우기")
  });

  it("calls onInsert and clears input", () => {
    // mock function
    const onInsert = jest.fn(); // onInsert 함수를 임의로 생성
    const { input, button } = setup({ onInsert }); // 
 
    // <input>에 value={value}를 "TDD 배우기"로 바꿈
    // onChange 이벤트 발생
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    });

    // button을 클릭하면 이벤트 발생 : onSubmit
    fireEvent.click(button);

    // 결과 확인
    // onInsert의 value가 받는 text가 "TDD 배우기" 인지
    expect(onInsert).toBeCalledWith("TDD 배우기");
    
    // <input>의 value가 공백인지 
    expect(input).toHaveAttribute("value", "");
  });
});
