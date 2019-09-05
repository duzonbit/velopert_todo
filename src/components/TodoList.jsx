import React from "react"
import TodoItem from "components/TodoItem"

const TodoList = ({ todos, onToggle, onRemove }) => {
  return (
    // data-testid : getByTestId() 함수를 사용하여 해당 태그의 존재 유무를 확인하기 위함
    <ul data-testid="TodoList">
      {todos.map((todo) => (
        <TodoItem todo={todo} key={todo.id} onToggle={onToggle} onRemove={onRemove} />
      ))}
    </ul>
  )
}

export default TodoList
