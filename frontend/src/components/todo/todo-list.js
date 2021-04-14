import React from "react"

import TodoItem  from './todo-item'

const TodoList = props => {

    if (props.items.length === 0) {
        return (
            <h2>No todos found</h2>
        )
    }

    return (
        <ul>
          {props.items.map(todo => (
            <TodoItem
              key={todo.id}
              id={todo.id}
              title={todo.title}
            />
          ))}
        </ul>
    );
}

export default TodoList;