import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Task } from '../models/task';
import { ProjectsService } from '../projects/projects.service';
import { HandleErrorService } from '../services/handle-error.service';
import { StateTypeService } from './state-type.service';


@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private baseUrl = 'api/tasks';
  private httpOption = { headers: new HttpHeaders({ 'content-type': 'application/json' }) }

  public tasks$: Observable<Task[]> = this.http.get<Task[]>(this.baseUrl).pipe(
    tap(tasks => (tasks.length > 0) ? console.log(`${tasks.length} tasks`) : ''),
    catchError(this.handleError.handleError('get Tasks', []))
  );

  constructor(private http: HttpClient,
    private handleError: HandleErrorService,
    private taskStatesService: StateTypeService,
    private projectService: ProjectsService
  ) { }

  public tasks_SP$ = combineLatest([this.tasks$, this.taskStatesService.stateTypes$, this.projectService.projects$])
    .pipe(
      map(([tasks, states, projects]) => {
        return tasks.map(task => ({
          ...task,
          state: states.find(state => state.id === task.stateTypeId)!.name,
          project: projects.find(proj => proj.id === task.projectId)!.name
        }) as Task);
      })
  );

  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, this.httpOption).pipe(
      // confirm
      tap(task => (task.id === undefined) ? console.log('Failed to create task'): ''),
      catchError(this.handleError.handleError('Create Task', {} as Task))
    );
  }
}
