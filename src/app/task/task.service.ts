import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, Subject } from 'rxjs';
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

  private selectedTaskSubject = new BehaviorSubject(0);
  selectedTaskAction$ = this.selectedTaskSubject.asObservable();

  private Tasks$: Observable<Task[]> = this.http.get<Task[]>(this.baseUrl)
    .pipe(
      tap(tasks => (tasks?.length > 0) ? console.log(`got ${tasks.length} tasks`) : ''),
      //tap(tasks => console.log(`Tasks : ${JSON.stringify(tasks)}`)),
      catchError(this.handleError.handleError('get Tasks', []))
    );

  constructor(private http: HttpClient, private handleError: HandleErrorService,
    private taskStatesService: StateTypeService, private projectService: ProjectsService) {
  }

  public tasks_SP$ = combineLatest([this.Tasks$, this.taskStatesService.stateTypes$, this.projectService.Projects$])
    .pipe(
      map(([tasks, states, projects]) => {
        return tasks.map(task => ({
          ...task,
          state: states.find(state => (state.id === task.stateTypeId))!.name,
          project: projects.find(proj => proj.id === task.projectId)!.name
        }) as Task);
      })
    );

  Task$ = combineLatest([this.Tasks$, this.selectedTaskAction$])
    .pipe(
      map(([tasks, selectedTaskId]) => {
        const findTask = tasks.find(task => task.id === selectedTaskId);
        //(findTask?.id) ? console.log(`find task is ${JSON.stringify(findTask)}`) : 'Cannot find Task';
        return findTask;
      })
      ,
      tap(task => task ? console.log(`Selected task is ${JSON.stringify(task)}`) : 'Undefined Task')
    );

  public selectedTaskChanged(taskId: number) {
    this.selectedTaskSubject.next(taskId);
  }
  public createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl, task, this.httpOption).pipe(      
      tap(task => (task.id === undefined) ? console.log('Failed to create task') : console.log(`task ${task.id} created`)),
      catchError(this.handleError.handleError('Create Task', {} as Task))
    );
  }
}
