import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import TodoItem from './Todos/TodoItem'

test('renders content', () => {
  const todo = {
    text: 'Component testing',
    done: true
  }

  const component = render(
    <TodoItem todo={todo} />
  )

  expect(component.container).toHaveTextContent(
    'Component testing'
  )
})