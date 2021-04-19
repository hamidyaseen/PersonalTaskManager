import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../app-material/app-material.module';
import { ProjectsComponent } from './projects.component';
import { ProjectCreateComponent } from './project-create/project-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ProjectEditComponent } from './project-edit/project-edit.component';

const routes: Routes = [
  { path: 'projects', component: ProjectsComponent },
  { path: 'project-create', component: ProjectCreateComponent },
  { path: 'project-edit/:id', component: ProjectEditComponent }          
];

@NgModule({
  declarations: [  ProjectsComponent, ProjectCreateComponent, ProjectEditComponent ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]  
})
export class ProjectsRoutingModule { }
