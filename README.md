# TDD

## 환경 설정

### npm

- Test module install

> node @testing-library/jest-dom @types/jest

- jsconfig.json - 루트 디렉토리 설정 1

```json
{
  "compilerOptions": {
    "baseUrl": "src",
    "rootDir": ".",
    "paths": {
      "~/*": ["*"]
    }
  }
}
```

- .env - 루트 디렉토리 설정 2

```env
NODE_PATH=src/
```

- jest cache clear

> package.json

```json
...
"scripts": {
    ...
    "clear_jest": "jest --clearCache"
}
...
```

> npm script

npm cache clean --force

### Dom Test Setup

> setupTests.js - src 하위폴더

```js
import "@testing-library/jest-dom/extend-expect"
```

---

## jest 기초

```js
describe("sum", () => {
  it("calculates all numbers", () => {
    const array = [1, 2, 3, 4, 5]
    expect(sumOf(array)).toBe(15)
  })
})
```

> **describe** - 관심 묶기  
> **it** - 테스트 케이스  
> **expect** - 테스트 실행기

## react-testing-libaray 기초

---

## TDD ( 테스트 주도 개발 )

![기존 프로세스](./image/image1.png)

- **waterfall**

  - 설계 이후 코드 개발 및 테스트케이스를 작성

![TDD 프로세스](./image/image2.png)

- **Test-driven development**_(Test First Development)_

  - 테스트케이스를 작성 한 후 실제 코드를 개발하여 리펙토링

- TDD 장점

  - 작업과 동시에 테스트를 진행함으로써 실시간으로 오류 상황을 파악하여 시스템 결함을 방지
  - 짧은 개발 주기를 통해 고객의 요구사항을 빠르게 수용하거나 피드백을 줄 수 있고 현재 진행 상황을 쉽게 파악
  - 단위 테스트 자동화 도구 Junit(Java), CppUnit(C/C++), NUnit(.NET)

- TDD 단점

  - 테스트케이스 설계 추가 → 코드 생산 비용 ↑
  - 테스트 방식 생각
  - 프로젝트 성격에 따른 테스트 프레임워크 선택 비용 ↑

## TDD의 3가지 절차

1. 실패

   - 가장 먼저 구현할 기능 하나씩 테스트 케이스를 작성

2. 성공

   - 코드를 작성하여 테스트를 통과

3. 리팩토링

   - 중복코드 개선
   - 기능 개선
   - 테스트 케이스 성공

### TodoApp.test.js

```JavaScript
import React from 'react';
import TodoApp from './TodoApp';
import { render, fireEvent } from 'react-testing-library';

describe('<TodoApp />', () => {
  // 등록의 Text와 TodoList의 Id의 존재유무
  it('renders TodoForm and TodoList', () => {
    const { getByText, getByTestId } = render(<TodoApp />);
    getByText('등록'); // TodoForm 존재유무 확인
    getByTestId('TodoList'); // TodoList 존재유무 확인
  });
  // default의 값
  it('renders two defaults todos', () => {
    const { getByText } = render(<TodoApp />);
    getByText('TDD 배우기');
    getByText('react-testing-library 배우기');
  });
  // Event의 trigger : fireEvent
  it('creates new todo', () => {
    const { getByPlaceholderText, getByText } = render(<TodoApp />);
    // 이벤트를 발생시켜서 새 항목을 추가하면
    fireEvent.change(getByPlaceholderText('할 일을 입력하세요'), {  // change 이벤트를 발생
      target: {
        value: '새 항목 추가하기'  // 텍스트창에 '새 항목 추가하기'을 넣는다
      }
    });
    fireEvent.click(getByText('등록'));  // 클릭 이벤트를 발생시킨다
    // 해당 항목이 보여져야합니다.
    getByText('새 항목 추가하기');  // 이벤트가 실행 후 '새 항목 추가하기'가 있는지 검사
  });

  it('toggles todo', () => {
    const { getByText } = render(<TodoApp />);
    // TDD 배우기 항목에 클릭 이벤트를 발생시키고 text-decoration 속성이 설정되는지 확인
    const todoText = getByText('TDD 배우기');
    expect(todoText).toHaveStyle('text-decoration: line-through;');
    fireEvent.click(todoText);
    expect(todoText).not.toHaveStyle('text-decoration: line-through;');
    fireEvent.click(todoText);
    expect(todoText).toHaveStyle('text-decoration: line-through;');
  });

  it('removes todo', () => {
    const { getByText } = render(<TodoApp />);
    const todoText = getByText('TDD 배우기');
    const removeButton = todoText.nextSibling;
    fireEvent.click(removeButton);
    expect(todoText).not.toBeInTheDocument(); // 페이지에서 사라졌음을 의미함
    /*
      또 다른 방법:
      const removedText = queryByText('TDD 배우기');
      expect(removedText).toBeFalsy();
    */
  });

});
```

### Mock Function

```JavaScript
import React from "react"
import { render, fireEvent } from "@testing-library/react"
import TodoForm from "components/TodoForm"

describe("<TodoForm/>", () => {
  const setup = (props = {}) => {
    const utils = render(<TodoForm {...props} />)
    const { getByText, getByPlaceholderText } = utils
    const input = getByPlaceholderText("할 일을 입력하세요")
    const button = getByText("등록")
    return {
      ...utils,
      input,
      button,
    }
  }
  it("calls onInsert and clears input", () => {
    // Mock Function
    const onInsert = jest.fn()
    const { input, button } = setup({ onInsert })
    fireEvent.change(input, {
      target: {
        value: "TDD 배우기",
      },
    })
    fireEvent.click(button)
    // 호출 됐다면 어떤 파라미터로 호출 됐는지
    // onInsert 가 'TDD 배우기' 파라미터가 호출됐어야함
    expect(onInsert).toBeCalledWith("TDD 배우기")
    // 이벤트가 호출되고 나서 input이 비워져야함.
    expect(input).toHaveAttribute("value", "")
  })
})
```
