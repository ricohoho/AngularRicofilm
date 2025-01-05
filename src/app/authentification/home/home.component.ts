import { Component } from '@angular/core'
import { GalleriaModule } from 'primeng/galleria';
import {FilmService} from '../../film.service';
import {HttpResponse} from "@angular/common/http";
import {Ifilm, Iproduction_companies, IRICO_FICHIER} from '../../ifilm'
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'GFG';


  films: any[] ;

  
  responsiveOptions: any[] = [
  
    {
      breakpoint: '1024px',
      numVisible: 5
    },
    {
      breakpoint: '768px',
      numVisible: 5
    },
    {
      breakpoint: '560px',
      numVisible: 5
    }
  ];

constructor(private dataService: FilmService ) {}

 ngOnInit(): void {
  this.dataService.getFilmMenuImage("").subscribe(
      (res: HttpResponse<any>) => {        
        this.films = res.body;
        console.log('getFilmMenuImage Debut');                
      },
      error => {
        console.error('userLis.composant : Erreur reçue: ' + error);  
      }
    );
  }
/*
  ngOnInit2() :void {
    this.dataService.getImages().then(data=>(this.films = data));
  }
*/
  //REnvoi le metteur en scene !
  getDirector(film : Ifilm ): string {
    let  searchIndex = film.credits.crew.findIndex((FILM) => FILM.job=='Director');
    return film.credits.crew[searchIndex].name;
  }

}
