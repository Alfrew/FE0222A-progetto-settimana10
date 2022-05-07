import { Component, OnInit } from "@angular/core";
import { Todo } from "../interfaces/todo";
import * as taskServ from "../services/todos.service";

@Component({
  template: `
    <!-- Input for task adding -->
    <div class="d-flex container mt-5" *ngIf="message === '--- No tasks found ---'">
      <input type="text" class="form-control" placeholder="Write new task" [(ngModel)]="newTask" />
      <button class="btn btn-secondary" (click)="addTask()">Add&nbsp;Task</button>
    </div>

    <div class="container mt-5">
      <ng-container *ngIf="tasks.length === 0; then advice; else list"></ng-container>
      <!-- Message -->
      <ng-template #advice>
        <p class="text-center text-muted display-6">{{ message }}</p>
      </ng-template>

      <!-- List print -->
      <ng-template #list>
        <ul class="list-unstyled">
          <li *ngFor="let task of tasks; let i = index" class="display-6 mt-3 d-flex justify-content-between border-bottom">
            <ng-container *ngIf="task !== undefined">
              <ng-container *ngIf="!task.change; then tBtns; else tChange"></ng-container>
              <!-- Task and buttons -->
              <ng-template #tBtns>
                <span [ngClass]="{ 'text-muted text-decoration-line-through': task.completed }">- {{ task.title | titlecase }} </span>
                <span>
                  <button type="button" class="btn rounded-pill text-success" [disabled]="task.completed" (click)="change(i, true)">
                    <i class="bi bi-pencil-fill h3"></i>
                  </button>
                  <button type="button" class="btn rounded-pill text-success" [disabled]="task.completed" (click)="complete(task.id - 1)">
                    <i class="bi bi-check-circle-fill h3"></i>
                  </button>
                </span>
              </ng-template>

              <!-- Input for task changes -->
              <ng-template #tChange>
                <input class="form-control" type="text" [(ngModel)]="task.title" />
                <button class="btn btn-success" (click)="change(i, false)">Change&nbsp;Task</button>
              </ng-template>
            </ng-container>
          </li>
        </ul>
      </ng-template>
    </div>
  `,
  styles: [],
})
export class HomePage implements OnInit {
  newTask: string = "";
  tasks: Todo[] = [];
  message: string = "Searching Tasks...";

  constructor() {
    // get tasks promise
    taskServ.getTasks().then((resp) => {
      this.tasks = resp.filter((item) => {
        return item !== undefined;
      });
    });
  }
  // add task promise method
  addTask() {
    taskServ.addTask(this.newTask).then((resp) => {
      this.tasks = resp.filter((item) => {
        return item !== undefined;
      });
      this.newTask = "";
    });
  }
  // complete task promise method
  complete(index: number) {
    taskServ.compTask(index).then((resp) => {
      this.tasks = resp.filter((item) => {
        return item !== undefined;
      });
    });
  }

  ngOnInit(): void {
    this.noTask();
  }
  // no task message method
  noTask() {
    setTimeout(() => {
      this.message = "--- No tasks found ---";
    }, 2000);
  }
  // change task method
  change(index: number, bool: boolean) {
    this.tasks[index].change = bool;
  }
}
