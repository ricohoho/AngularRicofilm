import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
//import { Http, RequestOptions } from '@angular/common/http'

import { Observable, throwError } from 'rxjs';
import { catchError, retry, tap } from 'rxjs/operators';
import { environment } from '../environments/environment';
import { Irequest } from "./irequest";
import { Ifilm } from './ifilm';
import { ColdObservable } from 'rxjs/internal/testing/ColdObservable';

@Injectable({
  providedIn: 'root'
})
export class FilmService {

  //constructor() { }

  public NbFilms: String;


  private REST_API_FILM_SERVER = environment.REST_API_FILM_SERVER;
  private REST_API = environment.REST_API;
  private REST_API_REQUEST_SERVER = environment.REST_API_REQUEST_SERVER;
  private REST_API_FILM_SERVER_SELECT = environment.REST_API_FILM_SERVER_SELECT;
  private REST_HOST = environment.REST_HOST;
  public constructor(private httpClient: HttpClient) { }

  public handleError(error: HttpErrorResponse): any { //} Observable<never> {
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
      //      window.alert(errorMessage);
      return throwError(errorMessage);
    }
  }

  public sendGetRequest(): Observable<any> {
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

    const optionRequete1 = { headers: headers1 };

    return this.httpClient.get(this.REST_HOST + this.REST_API_FILM_SERVER, optionRequete1).pipe(retry(3), catchError(this.handleError));
  }


  async wakeUpBackend(): Promise<void> {
    try {
      console.log('Waking up backend...');
      if (this.REST_HOST.includes("onrender")) {
        await this.httpClient.get('https://ricofilm-ia.onrender.com/').toPromise();
      } else {
        console.log("Pas utilisé car pas sur render");
      }
    } catch (e) {
      // Ignorer l'erreur, le but est juste de réveiller
      console.log('Backend wake-up request sent. Exception ' + e);
    }
  }
  //Renvoi la liste des films avec toutes les infos (utilisé dans la liste pricipales)
  // utilise les paraetre de filtrage et de pagination et de tri
  public getFilm(skip: number, filmname: string, rows: number, sort = 'UPDATE_DB_DATE', sortsens = -1, filter: any = {}): Observable<any> {
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_SERVER: ' + environment.REST_API_FILM_SERVER);

    let params1 = new HttpParams();
    params1 = params1.append('skip', skip.toString());
    params1 = params1.append('limit', rows.toString());
    params1 = params1.append('sort', sort);
    params1 = params1.append('sortsens', sortsens);

    if (filter && Object.keys(filter).length > 0) {
      for (const key in filter) {
        if (filter.hasOwnProperty(key) && filter[key] !== null && filter[key] !== '') {
          params1 = params1.append(key, filter[key]);
        }
      }
    } else {
      params1 = params1.append('filmname', filmname);
    }

    // const optionRequete1 = { headers : headers1 , params : params1 };

    return this.httpClient.get(this.REST_HOST + this.REST_API_FILM_SERVER,
      { params: params1, headers: headers1, observe: 'response' }).pipe(
        retry(3), catchError(this.handleError),
        tap(res => {
          let _NbFilm = res.headers.get('NbFilms');
          if (_NbFilm == null) _NbFilm = "0";
          this.NbFilms = _NbFilm;
          console.log('Nb Film : ' + this.NbFilms);
        }
        )
      );
  }


  //renvoi les film (juste le titre) : utilisé pour la recherche avec completion !
  public getFilmSelect(infoAffiche: string): Observable<any> {
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_FILM_SERVER_SELECT: ' + environment.REST_API_FILM_SERVER_SELECT);

    let params1 = new HttpParams();
    params1 = params1.append('infoAffiche', infoAffiche.toString());


    // const optionRequete1 = { headers : headers1 , params : params1 };

    return this.httpClient.get(this.REST_HOST + this.REST_API_FILM_SERVER_SELECT,
      { params: params1, headers: headers1, observe: 'response' }).pipe(
        retry(3), catchError(this.handleError),
        tap(res => {
          console.log('Retour de getFilmSelect ');
        }
        )
      );
  }


  //renvoi les liens des images des n dernier film ajoutés  : 2024/08/25
  public getFilmMenuImage(infoAffiche: string): Observable<any> {
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_FILM_SERVER_SELECT: ' + environment.REST_API_FILM_MENU_IMAGE);

    let params1 = new HttpParams();
    params1 = params1.append('infoAffiche', infoAffiche.toString());

    // const optionRequete1 = { headers : headers1 , params : params1 };

    return this.httpClient.get(this.REST_HOST + environment.REST_API_FILM_MENU_IMAGE,
      { params: params1, headers: headers1, observe: 'response' }).pipe(
        retry(3), catchError(this.handleError),
        tap(res => {
          console.log('Retour de getFilmSelect ');
        }
        )
      );
  }


  public sync(): Observable<any> {
    return this.httpClient.post<any>(this.REST_HOST + environment.REST_API + '/syncFilms', {});
  }

  public addFilm(film: Ifilm): Observable<any> {
    const headers = new HttpHeaders()
      .append('Content-Type', 'application/json');

    return this.httpClient.post<any>(this.REST_HOST + 'films/add', film, { headers })
      .pipe(
        catchError(this.handleError)
      );
  }

  public getDownloadUrl(film: Ifilm): string {
    const filename = film.title + '.avi';
    return `${this.REST_HOST}emby/download/${film.original_title}/${filename}`;
  }

  public getStreamUrl(film: Ifilm): string {
    return `${this.REST_HOST}emby/stream/${film.original_title}`;
  }
}
