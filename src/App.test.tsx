import React from 'react';
import {render, screen, act} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {App} from './App';
import {useTodoStore} from './stores/todoStore';
import {waitFor} from '@testing-library/react';
import {fireEvent} from '@testing-library/dom';

jest.mock('./stores/todoStore', () => ({
  useTodoStore: jest.fn(),
}));

const mockTodos = [
  {id: '1', text: 'Test Todo 1', done: false, createdTimestamp: Date.now()},
  {id: '2', text: 'Test Todo 2', done: true, createdTimestamp: Date.now()},
];

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

describe('App Component', () => {
  it('renders the app with initial todos', async () => {
    await act(async () => {
      render(<App />);
    });

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(mockTodos.length);
  });

  it('creates a new todo', async () => {
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

  it('toggles a todo', async () => {
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

  it('deletes a todo', async () => {
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

  it('shows alert when all todos are done', async () => {
    window.alert = jest.fn();
    todoStoreMock.allDone = true;

    await act(async () => {
      render(<App />);
    });

    expect(window.alert).toHaveBeenCalledWith(
      `Congratulations, you're all set! You've done everything on your list.`
    );
  });

  it('filters todos based on filter text', async () => {
    render(<App />);

    const filterInput = screen.getByPlaceholderText('Filter todos');
    fireEvent.change(filterInput, {target: {value: 'Test Todo 1'}});

    await waitFor(() => {
      const todoItems = screen.getAllByRole('listitem');
      expect(todoItems).toHaveLength(1);
    });

    expect(screen.getByText('Test Todo 1')).toBeInTheDocument();
  });

  it('clears the filter when clear button is clicked', async () => {
    const user = userEvent.setup();
    await act(async () => {
      render(<App />);
    });

    const filterInput = screen.getByPlaceholderText('Filter todos');
    await user.type(filterInput, 'Test Todo 1');

    const clearButton = screen.getByText('❌');
    await act(async () => {
      await user.click(clearButton);
    });

    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(mockTodos.length);
  });
});
