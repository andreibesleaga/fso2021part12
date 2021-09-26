import React from 'react'

const TodoItem = ({ todo }) => {
    return (
        <div style={{ display: 'flex', justifyContent: 'space-between', maxWidth: '70%', margin: 'auto' }}>
          <span>
            {todo.text} 
          </span>
          {todo.done ? 'done' : 'notDone'}
        </div>
      )
}

export default TodoItem