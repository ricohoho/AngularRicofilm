import { Component } from '@angular/core'
import { GalleriaModule } from 'primeng/galleria';
import {FilmService} from '../../film.service';
import {HttpResponse} from "@angular/common/http";
import {Ifilm, Iproduction_companies, IRICO_FICHIER} from '../../ifilm'
import { Observable } from 'rxjs';
import {environment} from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'GFG';


  films: any[] ;
  private REST_HOST = environment.REST_HOST;
  
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
        
        // Parcours de la liste des films pour afficher backdrop_path
        this.films.forEach(film => {
          console.log('backdrop_path:', film.backdrop_path+'/'+film.poster_path);
        });            
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


  getUrlResized(name: string) : string {
    return this.REST_HOST+'image/resize?url=https://image.tmdb.org/t/p/original/' + name+'&width=100&height=100'
  }

  //REnvoi le metteur en scene !
  getActors(film : Ifilm ): string {
    if (film.credits.cast.length == 0) {
      return "Aucun acteur";
    }
    if (film.credits.cast.length == 1) {
      return film.credits.cast[0].name;
    }
    if (film.credits.cast.length >= 1) {
      return film.credits.cast[0].name+','+film.credits.cast[1].name;
    }
    return "";
  }

}
