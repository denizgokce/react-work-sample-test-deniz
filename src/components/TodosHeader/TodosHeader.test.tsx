import React from 'react';
import { render } from '@testing-library/react';
import { TodosHeader } from './TodosHeader';

test('renders TodosHeader component with children', () => {
  const { getByText } = render(
    <TodosHeader>
      <span>Header Content</span>
    </TodosHeader>
  );

  const headerElement = getByText('Header Content');
  expect(headerElement).toBeInTheDocument();
});

test('applies className to TodosHeader component', () => {
  const { container } = render(
    <TodosHeader className="custom-class">
      <span>Header Content</span>
    </TodosHeader>
  );

  const headerElement = container.querySelector('.custom-class');
  expect(headerElement).toBeInTheDocument();
});

test('renders heading text', () => {
  const { getByText } = render(<TodosHeader />);
  const headingElement = getByText('TODO APP');
  expect(headingElement).toBeInTheDocument();
});