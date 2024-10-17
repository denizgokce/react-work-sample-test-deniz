import React from 'react';
import styled from 'styled-components';

export interface TodosFooterProps {
  className?: string;
}

const _TodosFooter: React.FC<React.PropsWithChildren<TodosFooterProps>> = ({
  children,
  className,
}) => (
  <div data-cy='TodosFooter' className={className}>
    {children}
  </div>
);

export const TodosFooter = styled(_TodosFooter)`
  padding: 8px;
  margin-top: auto;
  font-size: 12px;
  color: #455a64;
`;
