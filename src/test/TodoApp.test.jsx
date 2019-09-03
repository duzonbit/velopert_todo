import React from "react"
import TodoApp from "components/TodoApp"
import { render, fireEvent } from "@testing-library/react"

describe("<TodoApp/>", () => {
  it("renders TodoForm and TodoList", () => {
    const { getByText, getByTestId } = render(<TodoApp />)
    getByText("등록") // TodoApp에 있는 '등록'이라고 되어있는 요소를 들고옴 - button 
    getByTestId("TodoList") // TodoList에 있는 <ul data-testid="TodoList"> 
  })

  it("renders two defaults todos", () => {
    const { getByText } = render(<TodoApp />)
    getByText("TDD 배우기") //
    getByText("react-testing-library 배우기")
  })

  it("creates new todo", () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />)

    // onChange 이벤트 발생
    fireEvent.change(getByPlaceholderText("할 일을 입력하세요"), {
      // "할 일을 입력하세요"가 적혀있는 요소의 value={value} 수정
      target: {
        value: "새 항목 추가하기",
      },
    });

    // click 이벤트 실행
    fireEvent.click(getByText("등록"))

    // 결과 : "새 항목 추가하기"가 있는지 확인
    getByText("새 항목 추가하기")
  })

  it("toggles todo", () => {
    const { getByText } = render(<TodoApp />)
    const todoText = getByText("TDD 배우기") // todos
    
    // 적용되어 있는 css 찾기 - TodoItem
    expect(todoText).toHaveStyle("text-decoration: line-through;")  // 줄이 그어져 있느냐 : default

    fireEvent.click(todoText)
    expect(todoText).not.toHaveStyle("text-decoration: line-through;") // 줄이 안그어져 있느냐
    
    fireEvent.click(todoText)
    expect(todoText).toHaveStyle("text-decoration: line-through;") // 줄이 그어져 있느냐
  });

  it("removes todo", () => {
    const { getByText } = render(<TodoApp />);
    const todoText = getByText("TDD 배우기");
    const removeButton = todoText.nextSibling // "TDD 배우기" 옆에 버튼
    fireEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument(); //특정 엘리먼트가 화면에서 사라졌는지 확인
  });
})
