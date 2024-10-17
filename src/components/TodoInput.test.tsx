import React from 'react';
import {render} from '@testing-library/react';
import {DEFAULT_PLACEHOLDER, TodoInput} from './TodoInput';
import userEvent from '@testing-library/user-event';

test('invokes callback on button click and applies return value', async () => {
  const user = userEvent.setup();
  const onSubmit = jest.fn(async () => 'after');
  const {getByText, getByPlaceholderText} = render(
    <TodoInput onSubmit={onSubmit} />
  );

  const input = getByPlaceholderText(DEFAULT_PLACEHOLDER);
  expect(input).toBeInTheDocument();
  expect(input).toHaveValue('');
  await user.click(input);
  await user.type(input, 'from test');
  expect(input).toHaveValue('from test');
  const button = getByText('+');
  expect(button).toBeInTheDocument();
  await user.click(button);
  expect(onSubmit).toBeCalledWith('from test');
  expect(input).toHaveValue('after');
});
