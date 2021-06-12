import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AppMaterialModule } from '../app-material/app-material.module';
import { AnalyserComponent } from './analyser.component';

const routes: Routes = [
  { path: 'analyse', component: AnalyserComponent }
];

@NgModule({
  declarations: [ AnalyserComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    AppMaterialModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]  
})
export class DataAnalyserRoutingModule { }
