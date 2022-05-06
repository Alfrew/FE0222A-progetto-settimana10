import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import * as taskServ from '../services/todos.service';

@Component({
  template: `
    <div class="container mt-5">
      <p *ngIf="tasks.length === 0" class="text-center text-muted display-6">
        {{ message }}
      </p>
      <p *ngIf="tasks.length > 0" class="text-center text-muted display-6">
        Completed Tasks
      </p>
      <ul class="list-unstyled">
        <li
          *ngFor="let task of tasks"
          class="d-flex justify-content-between display-6 mt-3 border-bottom"
        >
          <span>- {{ task.title | titlecase }}</span>
          <button
            type="button"
            class="btn rounded-pill text-danger"
            (click)="del(task.id - 1)"
          >
            <i class="bi bi-x-circle-fill"></i>
          </button>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class CompletedPage implements OnInit {
  message: string = 'Searching Tasks...';
  tasks: Todo[] = [];

  constructor() {
    taskServ.getTasks().then((resp) => {
      this.tasks = resp.filter((list) => {
        return list.completed === true;
      });
    });
  }

  noTask() {
    setTimeout(() => {
      this.message = '--- No completed tasks found ---';
    }, 2000);
  }

  del(index: number) {
    delete taskServ.TASKS[index];
    this.tasks = taskServ.TASKS.filter((list) => {
      return list.completed === true;
    });
  }

  ngOnInit(): void {
    this.noTask();
  }
}
