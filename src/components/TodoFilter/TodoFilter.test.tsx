import React from 'react';
import { render } from '@testing-library/react';
import { TodoFilter } from './TodoFilter';

test('renders TodoFilter component', () => {
  const { getByText } = render(<TodoFilter />);
  const filterElement = getByText(/Filter goes here 😁/i);
  expect(filterElement).toBeInTheDocument();
});