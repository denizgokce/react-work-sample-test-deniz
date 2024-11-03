import React from 'react';
import {render} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {TodoList} from './TodoList';
import {Todo} from '../../models/types';

const mockTodos: Todo[] = [
  {id: '1', text: 'Test Todo 1', done: false, createdTimestamp: Date.now()},
  {id: '2', text: 'Test Todo 2', done: true, createdTimestamp: Date.now()},
];

test('renders TodoList component', () => {
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const {getByText} = render(
    <TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />
  );

  expect(getByText('Test Todo 1')).toBeInTheDocument();
  expect(getByText('Test Todo 2')).toBeInTheDocument();
});

test('invokes onToggle callback when checkbox is clicked', async () => {
  const user = userEvent.setup();
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const {getAllByRole} = render(
    <TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />
  );

  const checkboxes = getAllByRole('checkbox');
  expect(checkboxes).toHaveLength(2);

  await user.click(checkboxes[0]);
  expect(onToggle).toBeCalledWith(mockTodos[0].id);

  await user.click(checkboxes[1]);
  expect(onToggle).toBeCalledWith(mockTodos[1].id);
});

test('invokes onDelete callback when delete button is clicked', async () => {
  const user = userEvent.setup();
  const onToggle = jest.fn();
  const onDelete = jest.fn();
  const {getAllByText} = render(
    <TodoList todos={mockTodos} onToggle={onToggle} onDelete={onDelete} />
  );

  const deleteButtons = getAllByText('🗑️');
  expect(deleteButtons).toHaveLength(2);

  await user.click(deleteButtons[0]);
  expect(onDelete).toBeCalledWith(mockTodos[0].id);

  await user.click(deleteButtons[1]);
  expect(onDelete).toBeCalledWith(mockTodos[1].id);
});
