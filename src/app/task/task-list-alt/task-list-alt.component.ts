import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { BehaviorSubject, combineLatest, EMPTY, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { ProjectsService } from '../../projects/projects.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-list-alt',
  templateUrl: './task-list-alt.component.html',
  styleUrls: ['./task-list-alt.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TaskListAltComponent implements OnInit
{
  private selectedProjectSubject = new BehaviorSubject(0);
  selectedProjectId$ = this.selectedProjectSubject.asObservable();
    
  constructor(private taskService: TaskService, private projectService: ProjectsService) { }

  selectedTaskId$ = this.taskService.selectedTaskAction$;

  //public readonly tasks$: Observable<Task[]> = this.taskService.tasks_SP$.pipe();
  projects$: Observable<Project[]> = this.projectService.Projects$.pipe();

  tasks$ = combineLatest([this.taskService.tasks_SP$, this.selectedProjectId$])
    .pipe(
      map(([tasks, selectedProjectId]) =>
        tasks.filter(task => selectedProjectId ? task.projectId === selectedProjectId : true)),
      // here two input streams, if tasks_SP input stream got error internally and handled in upstream
      // input stream, which return EMPTY/of([]) then this would not be called else it is called.
      catchError(err => { console.log('resulting Error is ', err); return EMPTY; })
    );

  ngOnInit(): void { }

  public onSelected(id: number) {
   this.taskService.selectedTaskChanged(id);   
  }  
  public onSelectedProject(projectId: number) {
      // clear the selected task before filtering the project.
    //this.taskService.selectedTaskChanged(0);
    //this.projectService.changeSelectedProject(projectId);
    this.selectedProjectSubject.next(projectId);
  }
  
}
