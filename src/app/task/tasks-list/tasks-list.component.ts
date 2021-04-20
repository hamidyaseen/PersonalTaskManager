import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { ProjectsService } from '../../projects/projects.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-tasks-list',
  templateUrl: './tasks-list.component.html',
  styleUrls: ['./tasks-list.component.css']
})
export class TasksListComponent implements OnInit {

  private projectIdSubject = new BehaviorSubject<number>(0);
  private pSelectedAction$ = this.projectIdSubject.asObservable();

  Projects$: Observable<Project[]> | undefined = this.projectService.projects$.pipe(
    catchError(err => { console.log(err.message); return EMPTY; })
  );

  tasks$: Observable<Task[]> = combineLatest([this.taskService.tasks_SP$, this.pSelectedAction$])
    .pipe(
      map(([tasks, projectId]) => (tasks.filter(task => (projectId ? task.projectId === projectId : true))))
  );

  constructor(private taskService: TaskService, private projectService: ProjectsService) {
  }

  ngOnInit(): void { }

  isFilterOpen = false;

  onSelected(target: EventTarget | null): void {
    if (target) {
      const pID = (target as HTMLSelectElement).value;
      this.projectIdSubject.next(parseInt(pID));
    }
  }
}
