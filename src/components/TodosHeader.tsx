import React from 'react';
import styled from 'styled-components';

const Heading = styled.h1`
  margin: 8px 0;
  color: #263238;
`;

export interface TodosHeaderProps {
  className?: string;
}

const _TodosHeader: React.FC<React.PropsWithChildren<TodosHeaderProps>> = ({
  children,
  className,
}) => (
  <div data-cy='TodosHeader' className={className}>
    <Heading>TODO APP</Heading>
    {children}
  </div>
);

export const TodosHeader = styled(_TodosHeader)`
  padding: 8px;
`;
