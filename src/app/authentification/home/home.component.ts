import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { GalleriaModule } from 'primeng/galleria';
import { FilmService } from '../../film.service';
import { HttpResponse } from "@angular/common/http";
import { Ifilm } from '../../ifilm';
import { environment } from '../../../environments/environment';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MessageService } from 'primeng/api';
import { FilmdetailComponent } from '../../filmdetail/filmdetail.component';
import { StorageService } from '../../_services/storage.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [DialogService, MessageService]
})
export class HomeComponent implements OnInit, OnDestroy {

  title = 'GFG';

  films: any[] = [];
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

  currentIndex = 0;
  isAutoPlaying = true;
  private autoPlayInterval: any;
  ref: DynamicDialogRef;

  constructor(
    private dataService: FilmService, 
    private router: Router,
    public dialogService: DialogService,
    private messageService: MessageService,
    private storageService: StorageService
  ) {}

  ngOnInit(): void {
  this.dataService.getFilmMenuImage("").subscribe(
      (res: HttpResponse<any>) => {        
        this.films = res.body;
        console.log('getFilmMenuImage Debut');   
        
        // Parcours de la liste des films pour afficher backdrop_path
        this.films.forEach(film => {
          console.log('backdrop_path:', film.backdrop_path+'/'+film.poster_path);
        });
        
        this.startAutoPlay();
      },
      error => {
        console.error('HomeComponent Erreur reçue: ' + error);  
      }
    );
  }

  ngOnDestroy(): void {
    this.stopAutoPlay();
  }

  nextSlide(): void {
    if (this.films && this.films.length > 0) {
      this.currentIndex = (this.currentIndex + 1) % this.films.length;
    }
  }

  prevSlide(): void {
    if (this.films && this.films.length > 0) {
      this.currentIndex = (this.currentIndex - 1 + this.films.length) % this.films.length;
    }
  }

  setSlide(index: number): void {
    this.currentIndex = index;
  }

  startAutoPlay(): void {
    this.isAutoPlaying = true;
    if (!this.autoPlayInterval) {
      this.autoPlayInterval = setInterval(() => this.nextSlide(), 6000);
    }
  }
 
  stopAutoPlay(): void {
    this.isAutoPlaying = false;
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
      this.autoPlayInterval = null;
    }
  }

  goToSearch(): void {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/searchfilm']);
  }

  goToSearchAI(): void {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    this.router.navigate(['/searchfilm'], { queryParams: { ia: true } });
  }

  get currentFilm(): any {
    if (this.films && this.films.length > 0) {
      return this.films[this.currentIndex] as any;
    }
    return null;
  }

  getBackdropUrl(film: any): string {
    if (!film) return '';
    const path = film.backdrop_path && film.backdrop_path !== 'null' ? film.backdrop_path : film.poster_path;
    return 'https://image.tmdb.org/t/p/original/' + path;
  }

  showFilmPopUp(id: string): void {
    if (!this.storageService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    if (!id) return;
    
    let searchIndex = this.films.findIndex((FILM) => FILM._id == id);
    if (searchIndex === -1) return;

    this.ref = this.dialogService.open(FilmdetailComponent, {
      data : this.films[searchIndex],
      header: this.films[searchIndex].title,
      width: '70%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((detail_click) => {
      if (typeof detail_click !== 'undefined') {
        this.messageService.add({severity: 'info', summary: 'Film sélectionné', detail: detail_click});
        this.router.navigate(['/searchfilm'], { queryParams: { q: detail_click } });
      }
    });
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
