import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HandleErrorService } from '../services/handle-error.service';
import { ProjectsService } from './projects.service';

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.css']
})
export class ProjectsComponent implements OnInit {

  public message$: Observable<string> | undefined;
  public displayedColumns: string[] = ['name', 'type', 'descrip', 'extra'];

  public projects$ = this.projectService.projects$.pipe(
    tap(projects => console.log(`${projects.length} porjects exists`)),
    catchError(this.handleError.handleError('get Projects', []))    
  );   

  constructor(private projectService: ProjectsService, private handleError: HandleErrorService) { }

  ngOnInit(): void { }

}
