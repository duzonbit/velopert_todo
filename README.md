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

  - 작업과 동시에 테스트를 진행
    - 실시간으로 오류 상황을 파악 & 시스템 결함을 방지
  - 짧은 개발 주기
    - 고객의 요구사항을 빠르게 수용 피드백을 줄 수 있고
    - 현재 진행 상황을 쉽게 파악
  - 단위 테스트 자동화 도구 Junit(Java), CppUnit(C/C++), NUnit(.NET) ...

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
