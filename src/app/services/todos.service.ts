import { Todo } from "../interfaces/todo";

export const TASKS: Todo[] = [];
// get tasks promise
export async function getTasks(): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(TASKS);
    }, 2000);
  });
}
// add task promise
export async function addTask(text: string): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const newTask: Todo = {
        id: TASKS.length + 1,
        title: text,
        completed: false,
        change: false,
      };
      TASKS.push(newTask);
      resolve(TASKS);
    }, 2000);
  });
}
// complete task promise
export async function compTask(index: number): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      TASKS[index].completed = true;
      resolve(TASKS);
    }, 2000);
  });
}
// delete task promise
export async function delTask(index: number): Promise<Todo[]> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      delete TASKS[index];
      resolve(TASKS);
    }, 2000);
  });
}
