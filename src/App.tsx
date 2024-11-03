import React from 'react';
import styled from 'styled-components';
import {TodosFooter} from './components/TodosFooter/TodosFooter';
import {TodosHeader} from './components/TodosHeader/TodosHeader';
import {OnSubmit, TodoInput} from './components/TodoInput/TodoInput';
import {TodoList} from './components/TodoList/TodoList';
import {TodoStatusBar} from './components/TodoStatusBar/TodoStatusBar';
import {useTodoStore} from './stores/todoStore';
import {Todo} from './models/types';
import {OnToggle} from './components/TodoItem/TodoItem';
import {TodoFilter} from './components/TodoFilter/TodoFilter';

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  height: 100vh;
`;

export const App: React.FC = () => {
  const [filteredTodos, setFilteredTodos] = React.useState<Todo[]>([]);
  const [filterText, setFilterText] = React.useState('');

  const todoStore = useTodoStore();

  React.useEffect(() => {
    todoStore.fetch();
  }, [todoStore]);

  const filterTodos = React.useCallback(() => {
    let _filteredTodos = todoStore.todos;
    if (filterText.length > 0) {
      _filteredTodos = _filteredTodos.filter(todo =>
        todo.text.toLowerCase().includes(filterText.toLowerCase())
      );
    }
    setFilteredTodos(_filteredTodos);
  }, [todoStore.todos, filterText]);

  React.useEffect(() => {
    filterTodos();
  }, [todoStore.todos, filterText, filterTodos]);

  React.useEffect(() => {
    if (todoStore.allDone) {
      alert(
        `Congratulations, you're all set! You've done everything on your list.`
      );
    }
  }, [todoStore.allDone]);

  const createTodo: OnSubmit = async text => {
    return await todoStore.create(text);
  };

  const toggleTodo: OnToggle = async (id: string | number) => {
    await todoStore.toggle(id);
    filterTodos();
  };

  const deleteTodo = async (id: string | number) => {
    await todoStore.delete(id);
    filterTodos();
  };

  const handleFilterChange = (filterText: string) => {
    setFilterText(filterText);
  };

  return (
    <AppContainer className='App'>
      <TodosHeader>
        <TodoFilter
          filterText={filterText}
          onFilterChange={handleFilterChange}
        ></TodoFilter>
        <TodoStatusBar
          total={todoStore.todos.length}
          done={todoStore.todos.filter(x => x.done).length}
        />
      </TodosHeader>
      <TodoInput onSubmit={createTodo} />
      <TodoList
        todos={filteredTodos}
        onToggle={toggleTodo}
        onDelete={deleteTodo}
      />
      <TodosFooter>
        <TodoStatusBar
          total={todoStore.todos.length}
          done={todoStore.todos.filter(x => x.done).length}
        />
      </TodosFooter>
    </AppContainer>
  );
};
