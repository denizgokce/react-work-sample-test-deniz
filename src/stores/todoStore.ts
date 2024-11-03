import {create} from 'zustand';
import _ from 'lodash';
import {Todo} from '../models/types';
import {TodoService} from '../services/TodoService';
import {v4 as uuidv4} from 'uuid';

interface TodoStore {
  loading: boolean;
  service: TodoService;
  todos: Todo[];
  allDone: boolean;
  fetch: (refresh?: boolean) => Promise<Todo[]>;
  create: (text: string) => Promise<string>;
  delete: (id: string | number) => Promise<boolean>;
  toggle: (id: string | number) => Promise<Todo | null>;
  checkIfAllDone: () => boolean;
}

export const useTodoStore = create<TodoStore>()((set, get) => ({
  loading: false,
  service: new TodoService(),
  todos: [],
  allDone: false,
  fetch: async (refresh?: boolean): Promise<Todo[]> => {
    let {todos, loading, service} = get();
    let fetchedTodos: any[] = [];
    if (!loading) {
      if (todos.length <= 0 || refresh) {
        fetchedTodos = await service.fetchAll();
        fetchedTodos = _.orderBy(fetchedTodos, ['createdTimestamp'], ['desc']);
        set({todos: fetchedTodos, loading: false});
      }
    }
    return Promise.resolve(fetchedTodos);
  },
  create: async (text: string): Promise<string> => {
    let {service, fetch} = get();
    let newTodo = {
      id: uuidv4(),
      text,
      done: false,
      createdTimestamp: Date.now(),
    };
    let addedTodo = await service.create(newTodo);
    if (addedTodo) {
      await fetch(true);
      set({allDone: false});
    }
    return Promise.resolve('');
  },
  delete: async (id: string | number): Promise<boolean> => {
    let {service, fetch, checkIfAllDone} = get();
    let deleted = await service.delete(id.toString());
    if (deleted) {
      await fetch(true);
      set({allDone: checkIfAllDone()});
    }
    return Promise.resolve(deleted);
  },
  toggle: async (id: string | number): Promise<Todo | null> => {
    let {service, fetch, checkIfAllDone} = get();
    let todo = await service.fetchById(id.toString());
    if (todo) {
      let updatedTodo = {
        ...todo,
        done: !todo.done,
      };
      let updated = await service.update(id.toString(), updatedTodo);
      if (updated) {
        await fetch(true);
        set({allDone: checkIfAllDone()});
      }
      return Promise.resolve(updated);
    }
    return Promise.resolve(null);
  },
  checkIfAllDone: (): boolean => {
    let {todos} = get();
    return todos.length > 0 && todos.every(x => x.done);
  },
}));
