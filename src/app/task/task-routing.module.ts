import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../app-material/app-material.module';
import { TasksListComponent } from './tasks-list/tasks-list.component';
import { PanelComponent } from './panel/panel.component';
import { CommonModule } from '@angular/common';
import { TaskCreateComponent } from './task-create/task-create.component';
import { TaskEditComponent } from './task-edit/task-edit.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'tasks', component: TasksListComponent },
  { path: 'create-task', component: TaskCreateComponent },
  { path: 'edit-task', component: TaskEditComponent }
];

@NgModule({
  declarations: [
    PanelComponent,
    TasksListComponent,
    TaskCreateComponent,
    TaskEditComponent    
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
