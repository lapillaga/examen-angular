import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  url: string = environment.apiBaseUrl + 'users';
  constructor(private http: HttpClient) { }

  getUsers(name: string): Observable<User[]> {
    const params: HttpParams = new HttpParams()
      .set('name', name);
    return this.http.get<User[]>(this.url, {params});
  }

  getUser(id: string): Observable<User> {
    return this.http.get<User>(this.url + '/' + id);
  }

  addUser(user: any): Observable<void> {
    return this.http.post<void>(this.url, user);
  }

  updateUser(user: any): Observable<void> {
    const url = this.url + '/' + user.identificacion;
    return this.http.put<void>(url, user);
  }

  deleteUser(id: string): Observable<boolean> {
    const url = this.url + '/' + id;
    return this.http.delete<boolean>(url);
  }

  checkIdentificacionIsTaken(identificacion: string): Observable<boolean> {
    const url = this.url + '/exist-by-identificacion/' + identificacion;
    return this.http.get<boolean>(url);
  }

  checkEmailIsTaken(email: string): Observable<boolean> {
    const url = this.url + '/exist-by-email/' + email;
    return this.http.get<boolean>(url);
  }

  checkUsernameIsTaken(username: string): Observable<boolean> {
    const url = this.url + '/exist-by-username/' + username;
    return this.http.get<boolean>(url);
  }
}
