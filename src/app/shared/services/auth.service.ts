import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginResponse } from 'src/app/model/login';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url: string = environment.apiBaseUrl + 'login/';

  constructor(private http: HttpClient) { }

  login(body: any): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.url, body);
  }

  getUser(): User {
    const user = localStorage.getItem('user');
    // @ts-ignore
    return JSON.parse(user);
  }

  getToken(): string {
    return localStorage.getItem('token') || '';
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    return token != null;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
