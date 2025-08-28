import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpParams, HttpHeaders} from '@angular/common/http';
//import { Http, RequestOptions } from '@angular/common/http'

import {Observable, throwError} from 'rxjs';
import {catchError, retry, tap} from 'rxjs/operators';
import {environment} from '../environments/environment';
import {Irequest} from "./irequest";
import { Ifilm } from './ifilm';

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
  private REST_API_FILM_SERVER = environment.REST_API_FILM_SERVER;
  private REST_API_REQUEST_SERVER = environment.REST_API_REQUEST_SERVER;
  private REST_API_FILM_SERVER_SELECT = environment.REST_API_FILM_SERVER_SELECT;
  private REST_HOST = environment.REST_HOST;
  public constructor(private httpClient: HttpClient) { }

  public handleError(error: HttpErrorResponse): any  { //} Observable<never> {
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

    return this.httpClient.get(this.REST_HOST+this.REST_API_FILM_SERVER, optionRequete1).pipe(retry(3), catchError(this.handleError));
  }



  //Renvoi la liste des films avec toutes les infos (utilisé dans la liste pricipales)
  // utilise les paraetre de filtrage et de pagination et de tri
  public getFilm( skip: number, filmname: string, rows: number, sort= 'UPDATE_DB_DATE', sortsens= -1): Observable<any>{
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_SERVER: ' + environment.REST_API_FILM_SERVER);

    let params1 = new HttpParams();
    params1 = params1.append('skip', skip.toString() );
    params1 = params1.append('filmname', filmname );
    params1 = params1.append('limit', rows.toString() );

    params1 = params1.append('sort', sort);
    params1 = params1.append('sortsens', sortsens );

    // const optionRequete1 = { headers : headers1 , params : params1 };

    return this.httpClient.get(this.REST_HOST+this.REST_API_FILM_SERVER,
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


 //renvoi les film (juste le titre) : utilisé pour la recherche avec completion !
  public getFilmSelect( infoAffiche:string): Observable<any>{
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_FILM_SERVER_SELECT: ' + environment.REST_API_FILM_SERVER_SELECT);

    let params1 = new HttpParams();
    params1 = params1.append('infoAffiche', infoAffiche.toString() );


    // const optionRequete1 = { headers : headers1 , params : params1 };

    return this.httpClient.get(this.REST_HOST+this.REST_API_FILM_SERVER_SELECT,
      {params: params1,  headers : headers1, observe: 'response'}).pipe(
      retry(3), catchError(this.handleError),
      tap(res => {
          console.log('Retour de getFilmSelect ');
        }
      )
    );
  }


  //renvoi les liens des images des n dernier film ajoutés  : 2024/08/25
  public getFilmMenuImage( infoAffiche:string): Observable<any>{
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    console.log('environment.REST_API_FILM_SERVER_SELECT: ' + environment.REST_API_FILM_MENU_IMAGE);

    let params1 = new HttpParams(); 
    params1 = params1.append('infoAffiche', infoAffiche.toString() );

    // const optionRequete1 = { headers : headers1 , params : params1 };

    return this.httpClient.get(this.REST_HOST+environment.REST_API_FILM_MENU_IMAGE,
      {params: params1,  headers : headers1, observe: 'response'}).pipe(
      retry(3), catchError(this.handleError),
      tap(res => {
          console.log('Retour de getFilmSelect ');
        }
      )
    );
  }
/*
  public getImages() {
    //return Promise.resolve(this.getFilmMenuImage("getImage"));
    return Promise.resolve(this.getData());
 }

 getData() {
  return [
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria1s.jpg',
          alt: 'Description for Image 1',
          title: 'Title 1'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria2s.jpg',
          alt: 'Description for Image 2',
          title: 'Title 2'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria3s.jpg',
          alt: 'Description for Image 3',
          title: 'Title 3'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria4s.jpg',
          alt: 'Description for Image 4',
          title: 'Title 4'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria5s.jpg',
          alt: 'Description for Image 5',
          title: 'Title 5'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria6s.jpg',
          alt: 'Description for Image 6',
          title: 'Title 6'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria7s.jpg',
          alt: 'Description for Image 7',
          title: 'Title 7'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria8s.jpg',
          alt: 'Description for Image 8',
          title: 'Title 8'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria9s.jpg',
          alt: 'Description for Image 9',
          title: 'Title 9'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria10s.jpg',
          alt: 'Description for Image 10',
          title: 'Title 10'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria11s.jpg',
          alt: 'Description for Image 11',
          title: 'Title 11'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria12s.jpg',
          alt: 'Description for Image 12',
          title: 'Title 12'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria13s.jpg',
          alt: 'Description for Image 13',
          title: 'Title 13'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria14s.jpg',
          alt: 'Description for Image 14',
          title: 'Title 14'
      },
      {
          itemImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15.jpg',
          thumbnailImageSrc: 'https://primefaces.org/cdn/primeng/images/galleria/galleria15s.jpg',
          alt: 'Description for Image 15',
          title: 'Title 15'
      }
  ];
}
  */

  public sync(): Observable<any> {
    return this.httpClient.post<any>('/api/sync', {});
  }
}


