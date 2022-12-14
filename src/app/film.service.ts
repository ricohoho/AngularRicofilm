import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  //constructor() { }


  public NbFilms: String  ;

  // private REST_API_SERVER = 'http://davic.mkdh.fr:3000/films/list';
  //local
  //private REST_API_SERVER = 'films/list';
  //prod
  //private REST_API_SERVER = 'ricofilm/films/list';
  //private REST_API_SERVER = 'http://localhost:3000/films/
  private REST_API_SERVER = environment.REST_API_SERVER;

  public constructor(private httpClient: HttpClient) { }

  public handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }

  public sendGetRequest(): Observable<any>{
    // return this.httpClient.get(this.REST_API_SERVER);
    // const options = { params: new HttpParams({fromString: '_page=1&_limit=20'}) };
    const optionRequete = {
      headers: new HttpHeaders({
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Origin': '*'
      })
    };
    //  Autre solution
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    const optionRequete1 = { headers : headers1 };

    return this.httpClient.get(this.REST_API_SERVER, optionRequete1).pipe(retry(3), catchError(this.handleError));
  }


  public getFilm( skip: number, filmname: string, rows: number, sort= 'UPDATE_DB_DATE', sortsens= -1): Observable<any>{
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_SERVER: ' + environment.REST_API_SERVER);

    let params1 = new HttpParams();
    params1 = params1.append('skip', skip.toString() );
    params1 = params1.append('filmname', filmname );
    params1 = params1.append('limit', rows.toString() );

    params1 = params1.append('sort', sort);
    params1 = params1.append('sortsens', sortsens );

    // const optionRequete1 = { headers : headers1 , params : params1 };

    return this.httpClient.get(this.REST_API_SERVER,
      {params: params1,  headers : headers1, observe: 'response'}).pipe(
      retry(3), catchError(this.handleError),
      tap(res => {
          let  _NbFilm = res.headers.get('NbFilms');
          if (_NbFilm == null)  _NbFilm="0";
          this.NbFilms = _NbFilm;
          console.log('Nb Film : ' + this.NbFilms);
        }
      )
    );
    /*
        return this.httpClient.get(this.REST_API_SERVER, optionRequete1).pipe(
          retry(3), catchError(this.handleError),
          tap(res => {
              console.log(res.headers.get('NbFilms'));
            }
          )
        );
     */

    /*
        return this.httpClient.get(this.REST_API_SERVER,
          {params: new HttpParams({fromString: '_page=1&_limit=20'}), observe: 'response'}).pipe(
          retry(3), catchError(this.handleError),
          tap(res => {
              console.log(res.headers.get('Link'));
              this.parseLinkHeader(res.headers.get('Link'));
            }
          )
        );
    */

  }

}
