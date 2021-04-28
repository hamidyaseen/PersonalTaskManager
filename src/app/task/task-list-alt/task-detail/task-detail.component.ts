import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../../../models/task';
import { TaskService } from '../../task.service';

@Component({
  selector: 'app-task-detail',
  templateUrl: './task-detail.component.html',
  styleUrls: ['./task-detail.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskDetailComponent implements OnInit {

  constructor(private taskService: TaskService) { }

  task$: Observable<Task | undefined> = this.taskService.Task$
    .pipe(
      catchError(err => { console.log(err); return EMPTY; })
    );

  ngOnInit(): void {  }

}
