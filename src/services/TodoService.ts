import {Todo} from '../models/types';

export class TodoService {
  async fetchAll(): Promise<Todo[]> {
    try {
      const response = await fetch('http://localhost:3001/todos');
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return [];
    }
  }

  async create(todo: Todo): Promise<Todo | null> {
    try {
      const response = await fetch('http://localhost:3001/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(todo),
      });
      if (!response.ok) {
        throw new Error(
          `Unexpected error ${response.status}: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

  async fetchById(id: string): Promise<Todo | null> {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

  async update(id: string, updatedTodo: Partial<Todo>): Promise<Todo | null> {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTodo),
      });
      if (!response.ok) {
        throw new Error(
          `Unexpected error ${response.status}: ${response.statusText}`
        );
      }
      return await response.json();
    } catch (error) {
      console.error('Fetch error:', error);
      return null;
    }
  }

  async delete(id: string): Promise<boolean> {
    try {
      const response = await fetch(`http://localhost:3001/todos/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(
          `Unexpected error ${response.status}: ${response.statusText}`
        );
      }
      return true;
    } catch (error) {
      console.error('Fetch error:', error);
      return false;
    }
  }
}
