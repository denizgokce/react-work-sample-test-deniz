import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import {InputWithDebounce} from './InputWithDebounce';
import {useDebounce} from '../../hooks/useDebounce';

jest.mock('../../hooks/useDebounce');

describe('InputWithDebounce', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the input with the correct placeholder and value', () => {
    render(
      <InputWithDebounce
        value='test'
        placeholder='Filter todos'
        onChange={jest.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Filter todos');
    expect(input).toBeInTheDocument();
    expect(input).toHaveValue('test');
  });

  it('calls onChange with the debounced value', async () => {
    jest.useFakeTimers();
    const onChange = jest.fn();
    (useDebounce as jest.Mock).mockImplementation(value => value);

    render(
      <InputWithDebounce
        value=''
        placeholder='Filter todos'
        onChange={onChange}
        debounceTime={500}
      />
    );

    const input = screen.getByPlaceholderText('Filter todos');
    fireEvent.change(input, {target: {value: 'test'}});

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onChange).toHaveBeenCalledWith('test');
    jest.useRealTimers();
  });

  it('updates the input value when the value prop changes', () => {
    const {rerender} = render(
      <InputWithDebounce
        value='initial'
        placeholder='Filter todos'
        onChange={jest.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Filter todos');
    expect(input).toHaveValue('initial');

    rerender(
      <InputWithDebounce
        value='updated'
        placeholder='Filter todos'
        onChange={jest.fn()}
      />
    );

    expect(input).toHaveValue('updated');
  });

  it('updates the internal state when the input value changes', () => {
    const onChange = jest.fn();
    render(
      <InputWithDebounce
        value=''
        placeholder='Filter todos'
        onChange={onChange}
      />
    );

    const input = screen.getByPlaceholderText('Filter todos');
    fireEvent.change(input, {target: {value: 'test'}});

    expect(input).toHaveValue('test');
  });
});
