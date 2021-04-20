import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { StateType } from '../models/stateType';
import { HandleErrorService } from '../services/handle-error.service';


@Injectable({
  providedIn: 'root'
})
export class StateTypeService {

  public stateTypes$: Observable<StateType[]> = this.http.get<StateType[]>('api/stateTypes').pipe(
    // confirm
    tap((states: StateType[]) => (states.length<=0) ? console.log('states look empty.'): ''),
    catchError(this.handleError.handleError('get Task state types', []))
  );

  constructor(private http: HttpClient, private handleError: HandleErrorService) { }
}
