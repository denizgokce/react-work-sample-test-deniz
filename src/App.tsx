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

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  width: 400px;
  margin: 0 auto;
  height: 100vh;
`;

export const App: React.FC = () => {
  const [todos, setTodos] = React.useState<Todo[]>([]);
  const todoStore = useTodoStore();

  React.useEffect(() => {
    todoStore.fetch();
  }, []);

  React.useEffect(() => {
    setTodos(todoStore.todos);
  }, [todoStore]);

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
    setTodos(todoStore.todos);
  };

  const deleteTodo = async (id: string | number) => {
    await todoStore.delete(id);
    setTodos(todoStore.todos);
  };

  return (
    <AppContainer className='App'>
      <TodosHeader>
        <TodoStatusBar
          total={todoStore.todos.length}
          done={todoStore.todos.filter(x => x.done).length}
        />
      </TodosHeader>
      <TodoInput onSubmit={createTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <TodosFooter>
        <TodoStatusBar
          total={todoStore.todos.length}
          done={todoStore.todos.filter(x => x.done).length}
        />
      </TodosFooter>
    </AppContainer>
  );
};
