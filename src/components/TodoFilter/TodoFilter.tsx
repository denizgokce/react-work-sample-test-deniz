import React from 'react';
import styled from 'styled-components';
import {InputWithDebounce} from '../InputWithDebounce/InputWithDebounce';

interface TodoFilterProps {
  onFilterChange: (filterText: string) => void;
  filterText: string;
}

const ClearButton = styled.button`
  margin-left: 8px;
  background: none;
  border: none;
  color: red;
  cursor: pointer;
`;

const FilterContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const TodoFilter: React.FC<TodoFilterProps> = ({
  onFilterChange,
  filterText,
}) => {
  const handleFilterChange = (newValue: string) => {
    onFilterChange(newValue);
  };

  const handleClearFilter = () => {
    handleFilterChange('');
  };

  return (
    <FilterContainer>
      <InputWithDebounce
        placeholder='Filter todos'
        value={filterText}
        onChange={handleFilterChange}
        debounceTime={500}
      />
      <ClearButton onClick={handleClearFilter}>❌</ClearButton>
    </FilterContainer>
  );
};
