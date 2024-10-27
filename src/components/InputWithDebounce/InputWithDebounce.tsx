import React, {FC, useEffect} from 'react';
import {useDebounce} from '../../hooks/useDebounce';
import styled from 'styled-components';

interface InputWithDebounceProps {
  value: string;
  className?: string;
  placeholder: string;
  onChange: (value: string) => void;
  debounceTime?: number;
}

const FilterInput = styled.input`
  flex-grow: 1;
  border: none;
  outline: none;
  border-bottom: 2px solid #cfd8dc;
`;

export const InputWithDebounce: FC<InputWithDebounceProps> = ({
  value,
  className,
  placeholder,
  onChange,
  debounceTime = 1000,
}: InputWithDebounceProps) => {
  const [data, setData] = React.useState<string>(value);
  const debouncedChange = useDebounce(data, debounceTime);

  useEffect(() => {
    onChange(debouncedChange);
  }, [debouncedChange, onChange]);

  useEffect(() => {
    setData(value);
  }, [value]);

  return (
    <FilterInput
      type='text'
      className={className}
      placeholder={placeholder}
      value={data}
      onChange={event => {
        setData(event.target.value);
      }}
    />
  );
};
