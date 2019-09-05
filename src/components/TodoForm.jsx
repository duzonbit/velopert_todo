import React, { useState, useCallback } from "react"

const TodoForm = ({ onInsert }) => {
  const [value, setValue] = useState("")
  const onChange = useCallback((e) => {
    setValue(e.target.value)
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성

  const onSubmit = useCallback((e) => {
      onInsert(value)
      setValue("")
      e.preventDefault()
    },[onInsert, value]); // onInsert 혹은 value 가 바뀌었을 때만 함수 생성

  return (
    <form onSubmit={onSubmit}>
      <input placeholder="할 일을 입력하세요" value={value} onChange={onChange} />
      <button type="submit">등록</button>
    </form>
  )
}

export default TodoForm
