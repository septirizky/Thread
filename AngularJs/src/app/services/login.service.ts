import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private url = `${environment.apiBaseUrl}/login`;

  constructor(private http: HttpClient) {}

  login(obj: any): Observable<any> {
    return this.http.post(this.url, obj);
  }
}
