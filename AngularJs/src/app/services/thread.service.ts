import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError, of } from 'rxjs';
import { Thread } from '../interfaces/thread';

@Injectable({
  providedIn: 'root',
})
export class ThreadService {
  private url = `${environment.apiBaseUrl}/threads`;

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  constructor(private http: HttpClient) {}

  getThreads(): Observable<Thread[]> {
    return this.http.get<Thread[]>(this.url);
  }

  getThread(id: number): Observable<Thread> {
    const url = `${this.url}/${id}`;
    return this.http.get<Thread>(url);
  }

  addThread(thread: Thread): Observable<Thread> {
    return this.http
      .post<Thread>(this.url, thread, this.httpOptions)
      .pipe(catchError(this.handleError<Thread>('addThread')));
  }

  updateThread(thread: Thread): any {
    return this.http
      .put(this.url, thread, this.httpOptions)
      .pipe(catchError(this.handleError<Thread>('updateThread')));
  }

  deleteThread(thread: Thread): Observable<Thread> {
    const url = `${this.url}/${thread.thread_id}`;
    return this.http
      .delete<Thread>(url, this.httpOptions)
      .pipe(
        catchError(
          this.handleError<Thread>('deleteThread id=${thread.thread_id}')
        )
      );
  }

  private handleError<T>(operation = 'operation', result?: T): any {
    return (error: any): Observable<T> => {
      console.error(error);
      return of(result as T);
    };
  }
}
