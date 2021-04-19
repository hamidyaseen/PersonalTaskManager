import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';
import { Task } from '../models/task';
import { projects_data, tasks_data, task_states } from './data';

@Injectable({
  providedIn: 'root'
})
export class InMomoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): Observable<{}> {
    const tasks = tasks_data;
    const stateTypes = task_states;
    const projects = projects_data;

    return of({ tasks, stateTypes, projects });
  }

  genId(tasks: Task[]): number {
    return (tasks.length > 0) ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
