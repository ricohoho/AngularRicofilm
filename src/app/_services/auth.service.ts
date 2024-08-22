import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

//const AUTH_API = 'http://localhost:3000/api/auth/';
//const AUTH_API = 'http://localhost:4200/api/auth/';
const AUTH_API = '/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signin',
      {
        username,
        password,
      },
      httpOptions
    );
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.http.post(
      AUTH_API + 'signup',
      {
        username,
        email,
        password,
      },
      httpOptions
    );
  }

  logout(): Observable<any> {
    console.log('aut.service.logout()')
    console.log('URL:'+AUTH_API + 'signout')
    //return this.http.get(AUTH_API + 'signout', httpOptions);
    //return this.http.get(AUTH_API + 'dcnx', httpOptions);
    return this.http.get(AUTH_API + 'dcnx');
    //return this.http.get('http://localhost:4200/api/test/all');


  }
}
