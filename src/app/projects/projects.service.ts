import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, combineLatest } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators'
import { Project } from '../models/project';
import { HandleErrorService } from '../services/handle-error.service';

@Injectable({
  providedIn: 'root'
})
export class ProjectsService
{
  // for requests to an `api` base URL that gets
  // GET api/projects?name=^j  / / 'j' is a regex; returns heroes whose name starting with 'j' or 'J'

  private baseUrl: string = '/api/projects';
  private httpOptions = { headers: new HttpHeaders({ 'content-type': 'application/json' }) };

  projectSelectionSubject = new BehaviorSubject<number>(0);
  public projectSelection$ = this.projectSelectionSubject.asObservable();

  //private projects: Project[] | undefined;

  //Note:- As this Observer is started/subscribe by async,
  // if the component is not started before the getProject, Projects$ observer is undefined.
  Projects$: Observable<Project[]> = this.http.get<Project[]>(this.baseUrl)
    .pipe(
      //tap(projects => (this.projects = projects, console.log(projects))),
      tap(projects => projects? console.log(projects):''),
      catchError(this.handleError.handleError<Project[]>("Get Projects", []))
  );

  project$ = combineLatest([this.Projects$, this.projectSelection$])
    .pipe(
      map(([projects, projectSelectedId]) => projects.find(project => project.id === projectSelectedId)),
      tap(project => console.log(`selected project is ${project}`))
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

  //public getProject(id: string | null): Project | undefined {
  //  let project: Project | undefined;

  //  if (!id) return project;

  //  let idNo = parseInt(id);
  //  if (isNaN(idNo)) return project;

  //  if (this.projects && this.projects.length > 0)
  //    project = this.projects.find(project => project.id === idNo);

  //  return project;
  //}
  public changeSelectedProject(id: number): void {
    this.projectSelectionSubject.next(id);
  }
}
