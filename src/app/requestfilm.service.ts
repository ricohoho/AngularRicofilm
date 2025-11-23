import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Irequest } from "./irequest";
import { catchError, retry, tap } from "rxjs/operators";
import { Observable, throwError } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RequestfilmService {

  private REST_API_REQUEST_SERVER = environment.REST_API_REQUEST_SERVER;
  private REST_HOST = environment.REST_HOST;

  public constructor(private httpClient: HttpClient) { }

  public createRequest(iresquest: Irequest) {
    //console.log('Debut createRequest 2: '+this.REST_API_REQUEST_SERVER);
    console.log('Debut createRequest iresquest.title: ' + iresquest.title);
    //return this.httpClient.post(this.REST_API_REQUEST_SERVER+'/add',
    let bodyString = JSON.stringify(iresquest); // Stringify payload
    let headers = new Headers({ 'Content-Type': 'application/json' }); // ... Set content type to JSON

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'POST')
      .append('Access-Control-Allow-Origin', '*');

    const httpOptions2 = {
      headers: headers1
    }

    console.log('Debut createRequest / AVANT post');

    return this.httpClient.post<Irequest>(this.REST_HOST + this.REST_API_REQUEST_SERVER + '/add', iresquest, httpOptions).subscribe(
      reponse => {
        console.log('Réponse du serveur : ', reponse);
      },
      erreur => {
        console.log('Erreur lors de la requête : ', erreur);
      }
    )

  }

  //Renvoi la liste des REQUESTS
  public getRequestList(): Observable<Irequest[]> {
    console.log("requestfilm.service.getRequestList");
    const headers1 = new HttpHeaders()
      .append('Content-Type', 'application/json')
      .append('Access-Control-Allow-Headers', 'Content-Type')
      .append('Access-Control-Allow-Methods', 'GET')
      .append('Access-Control-Allow-Origin', '*');

    let params1 = new HttpParams();

    return this.httpClient.get<Irequest[]>(
      this.REST_HOST + this.REST_API_REQUEST_SERVER + '/list',
      { headers: headers1 }
    ).pipe(
      retry(3),
      catchError(this.handleError),
      tap(res => {
        // 'return res;' ici ne sert à rien dans un tap
        console.log('Retour de getRequestList');
      })
    );

  }

  public deleteRequest(id: number): Observable<any> {
    console.log("requestfilm.service.deleteRequest id: " + id);
    return this.httpClient.delete(this.REST_HOST + this.REST_API_REQUEST_SERVER + '/delete/' + id)
      .pipe(
        catchError(this.handleError)
      );
  }

  public editRequest(request: Irequest): Observable<any> {
    console.log("requestfilm.service.editRequest");
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };
    return this.httpClient.post(this.REST_HOST + this.REST_API_REQUEST_SERVER + '/edit', request, httpOptions)
      .pipe(
        catchError(this.handleError)
      );
  }

  //synchro des requests
  public syncRequest(): Observable<any> {
    return this.httpClient.post<any>(this.REST_HOST + environment.REST_API + '/syncRequests', {});
  }

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




}
