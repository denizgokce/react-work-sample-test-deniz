import React from 'react';
import styled from 'styled-components';

const InfoBar = styled.div`
  display: flex;
  justify-content: space-between;
`;

export interface TodoStatusBarProps {
  className?: string;
  total: number;
}

const _TodoStatusBar: React.FC<TodoStatusBarProps> = ({className, total}) => (
  <div data-cy='TodoStatusBar' className={className}>
    <InfoBar>
      <span>Total: {total}</span>
      <span>Done: 0</span>
    </InfoBar>
  </div>
);

export const TodoStatusBar = styled(_TodoStatusBar)`
  display: flex;
  flex-direction: column;
`;
