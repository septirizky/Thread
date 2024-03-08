import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { environment } from '../environment';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private url = `${environment.apiBaseUrl}/users`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.url);
  }

  getUser(id: number): Observable<User> {
    const url = `${this.url}/${id}`;
    return this.http.get<User>(url);
  }

  addUser(user: User): Observable<User> {
    return this.http
      .post<User>(this.url, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('register')));
  }

  updateUser(user: User): any {
    return this.http
      .put(this.url, user, this.httpOptions)
      .pipe(catchError(this.handleError<User>('updateUser')));
  }

  deleteUser(user: User): Observable<User> {
    const url = `${this.url}/${user.user_id}`;
    return this.http
      .delete<User>(url, this.httpOptions)
      .pipe(
        catchError(this.handleError<User>('deleteUser id=${user.user_id}'))
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
