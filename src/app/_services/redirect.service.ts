import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class RedirectService {
  url_home:string; //'/ricofilmA'

  constructor(private router: Router) {
    this.url_home=environment.URL_HOME;
  }

  goLogin(): void {
    this.router.navigate(['/login']);
  }

  goHome(): void {
    this.router.navigate([this.url_home]);
  }



}
