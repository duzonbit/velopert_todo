import React, { useState, useCallback, useRef } from "react"
import TodoForm from "components/TodoForm"
import TodoList from "components/TodoList"

const TodoApp = () => {
  const [todos, setTodos] = useState([
    {
      id: 1,
      text: "TDD 배우기",
      done: false,
    },
    {
      id: 2,
      text: "react-testing-library 배우기",
      done: true,
    },
  ]);

  const nextId = useRef(3); // 새로 추가 할 항목에서 사용 할 id
  // ref : 이전화면

  const onInsert = useCallback((text) => {
    setTodos((todos) => [
      ...todos,
      {
        id: nextId.current,
        text,
        done: false,
      },
    ])
    nextId.current += 1
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) => todos.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)))
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id))
  }, []);

  return (
    <>
      <TodoForm onInsert={onInsert} />
      <TodoList todos={todos} onToggle={onToggle} onRemove={onRemove} />
    </>
  )
}

export default TodoApp
