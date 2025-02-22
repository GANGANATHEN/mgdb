// import React from 'react'

const TodoList = () => {
  return (
    <div>
      <h1>Todo List</h1>
      <div>
        <input type="text" placeholder="Add todo" />
        <button>Add</button>
        <ul>
          <li>
            <span>Todo 1</span>
            <button>Delete</button>
          </li>
          <li>
            <span>Todo 2</span>
            <button>Delete</button>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default TodoList