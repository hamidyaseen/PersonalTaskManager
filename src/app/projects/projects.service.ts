import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators'
import { Project } from '../models/project';
import { HandleErrorService } from '../services/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService
{
  private baseUrl: string = '/api/projects';
  private httpOptions = { headers: new HttpHeaders({ 'content-type': 'application/json' }) };

  private projects: Project[] | undefined;

  //Note:- As this Observer is started/subscribe by async,
  // if the component is not started before the getProject, Projects$ observer is undefined.
  projects$: Observable<Project[]> = this.http.get<Project[]>(this.baseUrl)
    .pipe(
      tap(projects => (this.projects = projects, console.log(projects))),
      catchError(this.handleError.handleError<Project[]>("Get Projects", []))
  );

  constructor(private http: HttpClient, private handleError: HandleErrorService) { }

  public createProject(p: Project): Observable<Project> {
    return this.http.post<Project>(this.baseUrl, p, this.httpOptions).pipe(
      tap(proj => console.log(proj)),
      catchError(this.handleError.handleError<Project>('createProject'))
    )
  }
  public updateProject(project: Project): Observable<Project> {
    return this.http.put<Project>(this.baseUrl, project, this.httpOptions).pipe(
      tap(response => console.log(response))
    );
  }

  public getProject(id: string | null): Project | undefined {
    let project: Project | undefined;

    if (!id) return project;

    let idNo = parseInt(id);
    if (isNaN(idNo)) return project;

    if (this.projects && this.projects.length > 0)
      project = this.projects.find(project => project.id === idNo);

    return project;
  }
}
