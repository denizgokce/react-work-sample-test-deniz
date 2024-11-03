import React from 'react';
import {render, screen, fireEvent, act} from '@testing-library/react';
import {TodoFilter} from './TodoFilter';

jest.mock('../InputWithDebounce/InputWithDebounce', () => {
  return {
    __esModule: true,
    InputWithDebounce: ({
      value,
      onChange,
      placeholder,
    }: {
      value: string;
      onChange: (value: string) => void;
      placeholder: string;
    }) => (
      <input
        data-testid='debounce-input'
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
      />
    ),
  };
});

describe('TodoFilter', () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.runOnlyPendingTimers();
    jest.useRealTimers();
    jest.clearAllMocks();
  });

  it('renders the input and clear button', () => {
    render(<TodoFilter filterText='' onFilterChange={jest.fn()} />);

    const input = screen.getByPlaceholderText('Filter todos');
    const clearButton = screen.getByText('❌');

    expect(input).toBeInTheDocument();
    expect(clearButton).toBeInTheDocument();
  });

  it('calls onFilterChange when input changes', () => {
    const onFilterChange = jest.fn();
    render(<TodoFilter filterText='' onFilterChange={onFilterChange} />);

    const input = screen.getByPlaceholderText('Filter todos');
    fireEvent.change(input, {target: {value: 'test'}});

    expect(onFilterChange).toHaveBeenCalledWith('test');
  });

  it('calls onFilterChange with an empty string when clear button is clicked', () => {
    const onFilterChange = jest.fn();
    render(<TodoFilter filterText='test' onFilterChange={onFilterChange} />);

    const clearButton = screen.getByText('❌');
    fireEvent.click(clearButton);

    expect(onFilterChange).toHaveBeenCalledWith('');
  });

  it('debounces the input change', async () => {
    const onFilterChange = jest.fn();
    render(<TodoFilter filterText='' onFilterChange={onFilterChange} />);

    const input = screen.getByPlaceholderText('Filter todos');
    fireEvent.change(input, {target: {value: 'debounced'}});

    act(() => {
      jest.advanceTimersByTime(500);
    });

    expect(onFilterChange).toHaveBeenCalledWith('debounced');
  });
});
