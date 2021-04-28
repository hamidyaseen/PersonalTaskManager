import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Task } from '../../models/task';
import { ProjectsService } from '../../projects/projects.service';
import { HandleErrorService } from '../../services/handle-error.service';
import { StateTypeService } from '../state-type.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit
{
  private subCreateTask: Subscription | undefined;

  constructor(private taskService: TaskService,  private projectService: ProjectsService,
    private taskStatesService: StateTypeService,  private fb: FormBuilder,
    private location: Location, private handleError: HandleErrorService) {
  }
  
  public Projects$ = this.projectService.Projects$
    .pipe(
      catchError(this.handleError.handleError('get project error.', []))
    );

  public taskStates$ = this.taskStatesService.stateTypes$
    .pipe(
      catchError(this.handleError.handleError('get project error.', []))
    );

  public taskForm: FormGroup = this.fb.group({
    title: [''],
    description: ['', Validators.required],
    stateTypeId: [1],
    dueDate: [''],
    remindDate: [''],
    categoryId: ['1'],
    projectId: [''],
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.subCreateTask = this.taskService.createTask(this.taskForm.value as Task).subscribe(
      next => {
        this.subCreateTask?.unsubscribe();
        this.goBack();
      },
      err => console.log(`created task is ${err}`)
    );
  }

  bStateDisabled: boolean = true;
  goBack(): void {
    this.location.back()
  }
}
