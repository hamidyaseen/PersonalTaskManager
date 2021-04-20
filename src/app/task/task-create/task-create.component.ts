import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Task } from '../../models/task';
import { ProjectsService } from '../../projects/projects.service';
import { StateTypeService } from '../state-type.service';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-task-create',
  templateUrl: './task-create.component.html',
  styleUrls: ['./task-create.component.css']
})
export class TaskCreateComponent implements OnInit {

  constructor(private taskService: TaskService,
    private projectService: ProjectsService,
    private taskStatesService: StateTypeService,
    private fb: FormBuilder,
    private location: Location
  ) { }
  // confirm
  public Projects$ = this.projectService.projects$.pipe();
  public taskStates$ = this.taskStatesService.stateTypes$.pipe();


  public taskForm: FormGroup = this.fb.group({
    title: [''],
    description: ['', Validators.required],
    stateTypeId: [1],
    dueDate: [''],
    remindDate: [''],
    categoryId: ['1'],
    projectId: [''],
    //bStateDisabled: ['true']
  });

  ngOnInit(): void {
  }

  onSubmit(): void {
    console.log(this.taskForm.value);
    this.taskService.createTask(this.taskForm.value as Task).subscribe(
      next => this.goBack(),
      err => console.log(`created task is ${err}`)
    );
  }

  bStateDisabled: boolean = true;
  goBack(): void {
    this.location.back()
  }
}
