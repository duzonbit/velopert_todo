import React, { useCallback } from "react"

const TodoItem = ({ todo, onToggle, onRemove }) => {
  const { id, text, done } = todo

  //useCallback : 이벤트 핸들러 함수를 필요할 때만 생성
  const toggle = useCallback(() => onToggle(id), [id, onToggle])
  const remove = useCallback(() => onRemove(id), [id, onRemove])

  return (
    <li>
      <span
        style={{
          textDecoration: done ? "line-through" : "none",
        }}
        onClick={toggle}
      >
        {text}
      </span>
      <button onClick={remove}>삭제</button>
    </li>
  )
}

export default TodoItem
