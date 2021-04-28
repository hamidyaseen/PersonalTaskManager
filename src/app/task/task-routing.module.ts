import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../app-material/app-material.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { PanelComponent } from './panel/panel.component';
import { CommonModule } from '@angular/common';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BarComponent } from '../bar/bar.component';
import { TaskListAltComponent } from './task-list-alt/task-list-alt.component';
import { TaskShellComponent } from './task-list-alt/task-shell.component';
import { TaskDetailComponent } from './task-list-alt/task-detail/task-detail.component';


const routes: Routes = [
  { path: 'tasks', component: TasksListComponent },
  { path: 'create-task', component: TaskCreateComponent },
  { path: 'edit-task', component: TaskEditComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'tasks/:alternate', component: TaskShellComponent }
];

@NgModule({
  declarations: [
    BarComponent,
    PanelComponent,
    TasksListComponent,
    TaskCreateComponent,
    TaskEditComponent,
    DashboardComponent,
    TaskListAltComponent,
    TaskDetailComponent,
    TaskShellComponent,    
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]  
})
export class TaskRoutingModule { }
