import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

interface ErrorHandler<T> {
  (error: any): Observable<T>;
}

@Injectable({
  providedIn: 'root'
})
export class HandleErrorService {
  constructor() { }
  public handleError<T>(operation = 'operation', result?: T): ErrorHandler<T> {
    return (err: any): Observable<T> => {
      if (typeof err === 'string')
        console.log(`${operation}  failed : ${err}`);
      else if (typeof err === 'object' && err.body.error instanceof ErrorEvent)
        console.log(`${operation}  failed : ${err.body.error.message}`);
      else if (typeof err === 'object')
        console.log(`${operation}  failed : ${JSON.stringify(err)}`);
      else
        console.log(`${operation}  failed : ${err}`);
      return of(result as T);
    }
  }
}
