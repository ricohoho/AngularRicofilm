import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {FilmService} from "../film.service";
import {environment} from "../../environments/environment";
import {catchError, retry, tap} from "rxjs/operators";

//const API_URL = 'http://localhost:8080/api/test/';


@Injectable({
  providedIn: 'root',
})
export class UserService {

  private REST_API_USER_SERVER = environment.REST_API_USER_SERVER_SELECT;
  private RESP_API = environment.REST_API;

  constructor(private httpClient: HttpClient) {}

  public handleError(error: HttpErrorResponse): any  {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      //Server side Erreur
      if (error.status === 403) {
        errorMessage = 'Accès refusé. Vous n\'avez pas la permission d\'accéder à cette ressource.';
      } else {
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      return throwError(errorMessage);
    }
  }



  //Urls de test ====
  getPublicContent(): Observable<any> {
    return this.httpClient.get(this.RESP_API + 'all', { responseType: 'text' });
  }
  getUserBoard(): Observable<any> {
    return this.httpClient.get(this.RESP_API + 'user', { responseType: 'text' });
  }
  getModeratorBoard(): Observable<any> {
    return this.httpClient.get(this.RESP_API + 'mod', { responseType: 'text' });
  }
  getAdminBoard(): Observable<any> {
    return this.httpClient.get(this.RESP_API + 'admin', { responseType: 'text' });
  }
  //====


  //Renvoi la liste des USERS
  public getUserList(): Observable<any>{
    console.log("user.service.getUserList");
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_USER_SERVER_SELECT: ' + environment.REST_API_USER_SERVER_SELECT);

    let params1 = new HttpParams();

    return this.httpClient.get(this.REST_API_USER_SERVER,
      {  headers : headers1, observe: 'response'}).pipe(
      retry(3), catchError(this.handleError),
      tap(res => {
          console.log('Retour de getFilmSelect ');
        }
      )
    );

  }
}
