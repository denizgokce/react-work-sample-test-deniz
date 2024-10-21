import React from 'react';
import styled from 'styled-components';

const Input = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  border-bottom: 2px solid #cfd8dc;
`;

const AddButton = styled.button`
  margin-left: 8px;
  cursor: pointer;
`;

export type OnSubmit = (text: string) => Promise<string>;

export interface TodoInputProps {
  className?: string;
  onSubmit: OnSubmit;
  placeholder?: string;
}

export const DEFAULT_PLACEHOLDER = 'todo title';

const _TodoInput: React.FC<TodoInputProps> = ({
  className,
  onSubmit,
  placeholder = DEFAULT_PLACEHOLDER,
}) => {
  const [text, setText] = React.useState('');

  const handleTextInput = (e: React.FormEvent<HTMLInputElement>) => {
    setText(e.currentTarget.value);
  };

  return (
    <div data-cy='TodoInput' className={className}>
      <Input
        type='text'
        placeholder={placeholder}
        value={text}
        onChange={handleTextInput}
      />
      <AddButton onClick={async () => text && setText(await onSubmit(text))}>
        +
      </AddButton>
    </div>
  );
};

export const TodoInput = styled(_TodoInput)`
  display: flex;
  padding: 8px;
`;
