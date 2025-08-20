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
    console.log('goLogin()');
    this.router.navigate(['/login']);
  }

  goRegister(): void {
    console.log('goRegister()');
    this.router.navigate(['/register']);
  }

  goHome(): void {
    this.router.navigate([this.url_home]);
  }

  goHome2(): void {
    this.router.navigate(['/' ]);
  }

  goAnnuaire(): void {
    console.log('goAnnuaire()');
    this.router.navigate(['/userlist' ]);
  }

  goProfile():void {
    console.log('goProfile()');
    this.router.navigate(['/profile' ]);
    
  }

  //Ajout URL de recherhe de film : goSearchFilm
  goSearchFilm(): void {
    console.log('goSearchFilm()');
    this.router.navigate(['/searchfilm' ]);
  }

}
