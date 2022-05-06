import { Component, OnInit } from '@angular/core';
import { Todo } from '../interfaces/todo';
import * as taskServ from '../services/todos.service';

@Component({
  template: `
    <div
      class="d-flex container mt-5"
      *ngIf="message === '--- No tasks found ---'"
    >
      <input
        type="text"
        class="form-control"
        placeholder="Write new task"
        [(ngModel)]="newTask"
      />
      <button class="btn btn-secondary" (click)="addTask()">Add Task</button>
    </div>

    <div class="container mt-5">
      <p *ngIf="tasks.length === 0" class="text-center text-muted display-6">
        {{ message }}
      </p>
      <ul class="list-unstyled">
        <li *ngFor="let task of tasks" class="display-6 mt-3">
          <div
            *ngIf="task !== undefined"
            class="d-flex justify-content-between border-bottom"
          >
            <span
              *ngIf="!task.change"
              [class.text-decoration-line-through]="task.completed"
              >- {{ task.title | titlecase }}</span
            >
            <span *ngIf="task.change" class="d-flex"
              ><input
                class="form-control"
                type="text"
                [(ngModel)]="task.title"
              /><button
                class="btn btn-success form-control"
                (click)="change(task.id - 1, false)"
              >
                Change Task
              </button></span
            >

            <span>
              <button
                *ngIf="!task.change"
                type="button"
                class="btn rounded-pill text-success"
                [disabled]="task.completed"
                (click)="change(task.id - 1, true)"
              >
                <i class="bi bi-pencil-fill"></i>
              </button>
              <button
                *ngIf="!task.change"
                type="button"
                class="btn rounded-pill text-success"
                [disabled]="task.completed"
                (click)="complete(task.id - 1)"
              >
                <i class="bi bi-check-circle-fill"></i>
              </button>
            </span>
          </div>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class HomePage implements OnInit {
  newTask: string = '';
  tasks: Todo[] = [];
  message: string = 'Searching Tasks...';

  constructor() {
    taskServ.getTasks().then((resp) => {
      this.tasks = resp;
    });
  }

  complete(index: number) {
    this.tasks[index].completed = true;
  }

  addTask() {
    taskServ.add(this.newTask).then((resp) => {
      this.newTask = '';
    });
  }

  noTask() {
    setTimeout(() => {
      this.message = '--- No tasks found ---';
    }, 2000);
  }

  change(index: number, bool: boolean) {
    this.tasks[index].change = bool;
  }

  ngOnInit(): void {
    this.noTask();
  }
}
