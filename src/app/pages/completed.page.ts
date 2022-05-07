import { Component, OnInit } from "@angular/core";
import { Todo } from "../interfaces/todo";
import * as taskServ from "../services/todos.service";

@Component({
  template: `
    <div class="container mt-5">
      <!-- Message -->
      <p *ngIf="tasks.length === 0; else mess2" class="text-center text-muted display-6">{{ message }}</p>
      <ng-template #mess2><p class="text-center text-muted display-6">Completed Tasks</p></ng-template>

      <!-- List print -->
      <ul class="list-unstyled" *ngIf="tasks.length > 0">
        <li *ngFor="let task of tasks" class="d-flex justify-content-between display-6 mt-3 border-bottom">
          <span>- {{ task.title | titlecase }}</span>
          <!-- Delete button -->
          <button type="button" class="btn rounded-pill text-danger" (click)="del(task.id - 1)">
            <i class="bi bi-x-circle-fill h3"></i>
          </button>
        </li>
      </ul>
    </div>
  `,
  styles: [],
})
export class CompletedPage implements OnInit {
  message: string = "Searching Tasks...";
  tasks: Todo[] = [];

  constructor() {
    // get tasks promise
    taskServ.getTasks().then((resp) => {
      this.tasks = resp.filter((item) => {
        return item.completed === true;
      });
    });
  }
  // no task message method
  noTask() {
    setTimeout(() => {
      this.message = "--- No completed tasks found ---";
    }, 2000);
  }
  // delete task promise method
  del(index: number) {
    taskServ.delTask(index).then((resp) => {
      this.tasks = resp.filter((item) => {
        return item.completed === true;
      });
    });
  }

  ngOnInit(): void {
    this.noTask();
  }
}
