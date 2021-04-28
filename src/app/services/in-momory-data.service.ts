import { Injectable } from '@angular/core';
import { InMemoryDbService, RequestInfo } from 'angular-in-memory-web-api';
import { Observable, of } from 'rxjs';

import { Project } from '../models/project';
import { StateType } from '../models/stateType';
import { Task } from '../models/task';
import { ProjectsData } from './project-data';
import { TasksData } from './task-data';
import { TaskStateType } from './task-state-type-data';

export interface IAppData {
  tasks: Task[];
  stateTypes: StateType[];
  projects: Project[];
}

@Injectable({
  providedIn: 'root'
})
export class InMomoryDataService implements InMemoryDbService {

  constructor() { }

  createDb(reqInfo?: RequestInfo): Observable<IAppData>
  {
    const tasks = TasksData.Tasks;
    const stateTypes = TaskStateType.States;
    const projects = ProjectsData.Projects;

    return of({ tasks, stateTypes, projects });
  }

  genId(tasks: Task[]): number {
    return (tasks.length > 0) ? Math.max(...tasks.map(task => task.id)) + 1 : 1;
  }
}
