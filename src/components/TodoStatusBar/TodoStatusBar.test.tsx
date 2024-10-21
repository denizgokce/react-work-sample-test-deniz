import React from 'react';
import { render } from '@testing-library/react';
import { TodoStatusBar, TodoStatusBarProps } from './TodoStatusBar';

const defaultProps: TodoStatusBarProps = {
  total: 5,
  done: 3,
};

test('renders TodoStatusBar component with total and done counts', () => {
  const { getByText } = render(<TodoStatusBar {...defaultProps} />);

  const totalElement = getByText('Total: 5');
  const doneElement = getByText('Done: 3');

  expect(totalElement).toBeInTheDocument();
  expect(doneElement).toBeInTheDocument();
});

test('applies className to TodoStatusBar component', () => {
  const { container } = render(
    <TodoStatusBar {...defaultProps} className="custom-class" />
  );

  const statusBarElement = container.querySelector('.custom-class');
  expect(statusBarElement).toBeInTheDocument();
});