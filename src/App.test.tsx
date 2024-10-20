import React from 'react';
import { render, screen, act } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { App } from './App';
import { useTodoStore } from './stores/todoStore';

// Mock the zustand store
jest.mock('./stores/todoStore', () => ({
  useTodoStore: jest.fn(),
}));

const mockTodos = [
  { id: '1', text: 'Test Todo 1', done: false, createdTimestamp: Date.now() },
  { id: '2', text: 'Test Todo 2', done: true, createdTimestamp: Date.now() },
];

// Create a mock for the store behavior
const todoStoreMock = {
  todos: mockTodos,
  fetch: jest.fn(),
  create: jest.fn(),
  toggle: jest.fn(),
  delete: jest.fn(),
  allDone: false,
  checkIfAllDone: jest.fn(),
};

beforeEach(() => {
  (useTodoStore as unknown as jest.Mock).mockReturnValue(todoStoreMock);
});

test('renders the app with initial todos', async () => {
  await act(async () => {
    render(<App />);
  });

  const todoItems = screen.getAllByRole('listitem');
  expect(todoItems).toHaveLength(mockTodos.length);
});

test('creates a new todo', async () => {
  const user = userEvent.setup();
  await act(async () => {
    render(<App />);
  });

  const input = screen.getByPlaceholderText('todo title');
  await user.type(input, 'New Todo');
  const addButton = screen.getByText('+');
  await act(async () => {
    await user.click(addButton);
  });

  expect(todoStoreMock.create).toHaveBeenCalledWith('New Todo');
});

test('toggles a todo', async () => {
  const user = userEvent.setup();
  await act(async () => {
    render(<App />);
  });

  const checkboxes = screen.getAllByRole('checkbox');
  await act(async () => {
    await user.click(checkboxes[0]);
  });

  expect(todoStoreMock.toggle).toHaveBeenCalledWith(mockTodos[0].id);
});

test('deletes a todo', async () => {
  const user = userEvent.setup();
  await act(async () => {
    render(<App />);
  });

  const deleteButtons = screen.getAllByText('🗑️');
  await act(async () => {
    await user.click(deleteButtons[0]);
  });

  expect(todoStoreMock.delete).toHaveBeenCalledWith(mockTodos[0].id);
});

test('shows alert when all todos are done', async () => {
  window.alert = jest.fn();
  todoStoreMock.allDone = true;

  await act(async () => {
    render(<App />);
  });

  expect(window.alert).toHaveBeenCalledWith(
    `Congratulations, you're all set! You've done everything on your list.`
  );
});