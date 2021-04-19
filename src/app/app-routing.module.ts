import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DesktopComponent } from './desktop/desktop.component';
import { CommonModule } from '@angular/common';
import { AppMaterialModule } from './app-material/app-material.module';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'desktop', component: DesktopComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }];

@NgModule({
  declarations: [HomeComponent, AboutComponent, PageNotFoundComponent, DesktopComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    AppMaterialModule],
  exports: [
    RouterModule,
    AppMaterialModule
  ]  
})
export class AppRoutingModule { }
