import { Todo } from '../interfaces/todo';

export const TASKS: Todo[] = [];

export async function getTasks(): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(TASKS);
    }, 2000);
  });
}

export async function add(text: string): Promise<Todo> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newTask: Todo = {
        id: TASKS.length + 1,
        title: text,
        change: false,
        completed: false,
      };
      TASKS.push(newTask);

      resolve(newTask);
    }, 2000);
  });
}
