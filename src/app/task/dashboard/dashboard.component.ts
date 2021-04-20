import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Project } from '../../models/project';
import { Task } from '../../models/task';
import { ProjectsService } from '../../projects/projects.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private daysSubject = new BehaviorSubject<number>(7);
  private daysActions$ = this.daysSubject.asObservable();

  public Days$: Observable<number[]> = of([1, 3, 7, 14, 21, 30, 90]);
  public selected = 7;

  //public Projects$ = combineLatest([this.taskService.tasks_SP$, this.projectService.projects$, this.daysActions$])
  //  .pipe(
  //    map(([tasks, projects, days]) => {
  //      const startDT = new Date(); const endDT = new Date();
  //      endDT.setDate(startDT.getDate() + days);

  //      console.log(`For ${days} days, Total ${tasks.length} tasks`);

  //      tasks = tasks.map(task => ({ ...task, dueDT: new Date(task.dueDate) } as Task));
  //      //tasks = tasks.filter((task: Task) => ((task.dueDT >= startDT) && (task.dueDT <= endDT)));

  //      return projects.map(project =>
  //        ({
  //          ...project,
  //          dueTasksCount: tasks.filter((task: Task): boolean =>
  //            (task.dueDT !== undefined) ?
  //              ((task.projectId === project.id) && (task.dueDT >= startDT) && (task.dueDT <= endDT)) : false
  //          ).length
  //        } as Project)
  //      );

  //    }),
  //    tap(projects => {
  //      console.log(`${projects.length} projects.`);
  //      //projects.forEach(project => console.log(`${project.name} project has ${project.dueTasksCount}.`));
  //    })
  //);

  public Projects$ = combineLatest([this.taskService.tasks_SP$, this.projectService.projects$, this.daysActions$])
    .pipe(
      map(([tasks, projects, days]) => {
        const startDT = new Date();
        const endDT = new Date();
        endDT.setDate(startDT.getDate() + days);
       
        const dueTasks = tasks.filter(task => {
          let dueDT = new Date(task.dueDate);
          return ((dueDT >= startDT) && (dueDT <= endDT));
        });

        return projects.map(project =>
          ({
              ...project,
              dueTasksCount: (dueTasks.length > 0) ? dueTasks.filter(task => (task.projectId === project.id)).length : 0,
              dueTasksPercent: (dueTasks.length > 0) ? Math.round((dueTasks.filter(task => (task.projectId === project.id)).length * 100) / dueTasks.length) : 0
            } as Project)
          );
      }),
      tap(projects => {
        console.log(`${projects.length} projects.`);
        //projects.forEach(project => console.log(`${project.name} project has ${project.dueTasksCount}.`));
      })
    );

  constructor(private taskService: TaskService, private projectService: ProjectsService) { }

  ngOnInit(): void { }

  onSelected(): void {
    this.daysSubject.next(this.selected);
  }
}
