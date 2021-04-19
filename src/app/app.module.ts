import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ProjectsModule } from './projects/projects.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMomoryDataService } from './services/in-momory-data.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,HttpClientModule,
    ProjectsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    
    HttpClientInMemoryWebApiModule.forRoot(InMomoryDataService, { dataEncapsulation: false })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
