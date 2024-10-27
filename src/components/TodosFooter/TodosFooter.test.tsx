import React from 'react';
import {render} from '@testing-library/react';
import {TodosFooter} from './TodosFooter';

test('renders TodosFooter component with children', () => {
  const {getByText} = render(
    <TodosFooter>
      <span>Footer Content</span>
    </TodosFooter>
  );

  const footerElement = getByText('Footer Content');
  expect(footerElement).toBeInTheDocument();
});

test('applies className to TodosFooter component', () => {
  const {container} = render(
    <TodosFooter className='custom-class'>
      <span>Footer Content</span>
    </TodosFooter>
  );

  const footerElement = container.querySelector('.custom-class');
  expect(footerElement).toBeInTheDocument();
});
