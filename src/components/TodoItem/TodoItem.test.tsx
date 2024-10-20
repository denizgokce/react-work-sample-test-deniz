import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { TodoItem, OnToggle, OnDelete } from './TodoItem';
import { Todo } from '../../models/types';

const mockTodo: Todo = {
  id: '1',
  text: 'Test Todo',
  done: false,
  createdTimestamp: Date.now(),
};

test('invokes onToggle callback when checkbox is clicked', async () => {
  const user = userEvent.setup();
  const onToggle: OnToggle = jest.fn();
  const onDelete: OnDelete = jest.fn();
  const { getByRole } = render(
    <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />
  );

  const checkbox = getByRole('checkbox');
  expect(checkbox).toBeInTheDocument();
  expect(checkbox).not.toBeChecked();
  await user.click(checkbox);
  expect(onToggle).toBeCalledWith(mockTodo.id);
});

test('invokes onDelete callback when delete button is clicked', async () => {
  const user = userEvent.setup();
  const onToggle: OnToggle = jest.fn();
  const onDelete: OnDelete = jest.fn();
  const { getByText } = render(
    <TodoItem todo={mockTodo} onToggle={onToggle} onDelete={onDelete} />
  );

  const deleteButton = getByText('🗑️');
  expect(deleteButton).toBeInTheDocument();
  await user.click(deleteButton);
  expect(onDelete).toBeCalledWith(mockTodo.id);
});