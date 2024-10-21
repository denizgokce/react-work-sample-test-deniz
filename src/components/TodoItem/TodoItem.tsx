import React from 'react';
import styled from 'styled-components';
import {Todo} from '../../models/types';

const TodoText = styled.span<{done: boolean}>`
  text-decoration: ${p => (p.done ? 'line-through' : 'none')};
`;

const TodoCheckbox = styled.input`
  margin-right: 8px;
`;

const DeleteButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

export type OnToggle = (id: string | number) => Promise<void>;
export type OnDelete = (id: string | number) => Promise<void>;

export interface TodoItemProps {
  todo: Todo;
  onToggle: OnToggle;
  onDelete: OnDelete;
  className?: string;
}

const _TodoItem: React.FC<TodoItemProps> = ({
  todo,
  onToggle,
  onDelete,
  className,
}) => {
  return (
    <li data-cy='TodoItem' className={className}>
      <div>
        <TodoCheckbox
          type='checkbox'
          checked={todo.done}
          onChange={() => {
            onToggle(todo.id);
          }}
        />
        <TodoText done={todo.done}>{todo.text}</TodoText>
      </div>
      <DeleteButton
        onClick={() => {
          onDelete(todo.id);
        }}
      >
        🗑️
      </DeleteButton>
    </li>
  );
};

export const TodoItem = styled(_TodoItem)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
