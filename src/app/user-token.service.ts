import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class UserTokenService {

  private serviceUrl = 'http://localhost:3000/api/user';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  registerNewUser(): Observable<UserRegistration> {
    const url = `${this.serviceUrl}/token/register`;
    return this.http.post<UserRegistration>(url, null, this.httpOptions)
      .pipe(
        catchError(this.handleError<UserRegistration>(`Error: registerNewUser`))
      );
  }

  getUserProfile(token: String): Observable<UserRegistration> {
    const url = `${this.serviceUrl}/token/fetch`;
    return this.http.post<UserRegistration>(url, { token }, this.httpOptions)
      .pipe(
        catchError(this.handleError<UserRegistration>(`Error: getUserProfile token=${token}`))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}

export interface UserRegistration {
  token: String;
  profile: {
    registeredOn: Number;
  };
}
