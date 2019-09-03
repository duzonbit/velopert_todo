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
describe('sum', () => {
  it('calculates all numbers', () => {
    const array = [1, 2, 3, 4, 5];
    expect(sumOf(array)).toBe(15);
  });
});
```

> **describe** - 관심 묶기  
> **it** - 테스트 케이스  
> **expect** - 테스트 실행기

## react-testing-libaray 기초
