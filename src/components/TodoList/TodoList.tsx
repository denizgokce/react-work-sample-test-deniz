import React from 'react';
import styled from 'styled-components';
import {Todo} from '../../models/types';
import {OnDelete, OnToggle, TodoItem} from '../TodoItem/TodoItem';

export interface TodoListProps {
  todos: Array<Todo>;
  onToggle: OnToggle;
  onDelete: OnDelete;
  className?: string;
}

const _TodoList: React.FC<TodoListProps> = ({
  todos,
  onToggle,
  onDelete,
  className,
}) => {
  return (
    <ul data-cy='TodoList' className={className}>
      {todos.map((todo, index) => (
        <TodoItem
          key={index}
          todo={todo}
          onToggle={onToggle}
          onDelete={onDelete}
        />
      ))}
    </ul>
  );
};

export const TodoList = styled(_TodoList)`
  list-style: none;
  padding: 0;
`;
