import { Component, OnInit, Input } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {Ifilm, Iproduction_companies, IVIDEO_RESULTS} from '../ifilm';
import {environment} from "../../environments/environment";
import { YouTubePlayerModule } from '@angular/youtube-player';
import { FilmService } from '../film.service';
//import {VideoPlayerComponent} from  '../video-player/video-player.component';



@Component({
  selector: 'app-filmdetail',
  templateUrl: './filmdetail.component.html',
  styleUrls: ['./filmdetail.component.scss']
})

export class FilmdetailComponent implements OnInit {
  _id ="";
  film : Ifilm ;
  ricoFichier : IVIDEO_RESULTS;
  responsiveOptions : any;
  cols_fichier : any;
  path_image : string;
  //private REST_API_SERVER = environment.REST_API_SERVER;
  acteur_click : string;
  isLoading: boolean = true;

  videoId : string = "";

 
  constructor(
    public dialogService: DynamicDialogRef,
    public config: DynamicDialogConfig,
    public youtubePlayer: YouTubePlayerModule,
    private filmService: FilmService
  ) {}

  getDirector(): string {
    if (this.film.credits.crew.length==0 ) return ""
    let  searchIndex = this.film.credits.crew.findIndex((FILM) => FILM.job=='Director');
    return this.film.credits.crew[searchIndex].name;
  }

  transformeDateTimeToDate(date : string):string {
    if (!date) return "";
    let dateComponents = date.substring(0,10);
    return dateComponents;
  }

  getUPDATE_DB_DATE(): string {
    return this.transformeDateTimeToDate(this.film.UPDATE_DB_DATE)
  }

  selectActeur(acteur : string) {
    console.log("MuClose(debut)" + acteur);

      this.acteur_click = acteur;
      this.dialogService.close(acteur);

  }


  ngOnInit(): void {
    this.film=this.config.data;
    
    // Fetch full film details
    console.log("Chargement du film: "+this.film._id);
    if (this.film._id) {
      this.isLoading = true;
      this.filmService.getFilmById(this.film._id).subscribe(
        (fullFilm) => {
          // Merge rich data into the existing film object
          this.film = { ...this.film, ...fullFilm };
          this.initDisplayData();
          this.isLoading = false;
        },
        (err) => {
          console.error('Error fetching film details', err);
          this.initDisplayData(); // Fallback to what we have
          this.isLoading = false;
        }
      );
    } else {
      this.initDisplayData();
      this.isLoading = false;
    }
  }

  initDisplayData(): void {
    // Ajoute la propriété genres si elle n'existe pas
    if (!this.film.genres || this.film.genres.length==0) {
      this.film.genres = [];
    } else 
      console.log("Data4: "+this.film.genres[0].name);

    if (!this.film.credits) {
      this.film.credits = {cast: [], crew: []};
    }
      
    //Chemin des images
    this.path_image=environment.PATH_IMAGE;
    console.log("this.path_image: "+this.path_image);

    //Rccuperation de l'id Ypoutube de la bande annonce
    if (this.film.videos && this.film.videos.results.length>0)
      this.videoId=this.film.videos.results[0].key;

    this.cols_fichier = [
      { field: 'serveur_name', header: 'serveur' },
      { field: 'insertDate', header: 'Date' },
      { field: 'path', header: 'Chemin' },
      { field: 'file', header: 'fichier' },
      { field: 'size', header: 'Taille' }
    ];

    this.responsiveOptions = [
      {
        breakpoint: '1024px',
        numVisible: 3,
        numScroll: 3
      },
      {
        breakpoint: '768px',
        numVisible: 2,
        numScroll: 2
      },
      {
        breakpoint: '560px',
        numVisible: 1,
        numScroll: 1
      }
    ];


  }

  download() {
    const url = this.filmService.getDownloadUrl(this.film);
    window.open(url, '_blank');
  }

  stream() {
    const url = this.filmService.getStreamUrl(this.film);
    const newWindow = window.open('', '_blank');
    if (newWindow) {
      const title = this.film?.title ? this.film.title.replace(/"/g, '&quot;') : 'Streaming';
      const html = `
        <!DOCTYPE html>
        <html style="height: 100%; background: black; margin: 0;">
        <head>
          <meta charset="utf-8">
          <title>${title}</title>
        </head>
        <body style="height: 100%; margin: 0; display: flex; align-items: center; justify-content: center;">
          <video width="100%" height="100%" controls autoplay name="media">
            <source src="${url}">
            Votre navigateur ne supporte pas la balise vidéo.
          </video>
        </body>
        </html>
      `;
      newWindow.document.write(html);
      newWindow.document.close();
    } else {
      // Fallback si le navigateur bloque les pop-ups
      window.open(url, '_blank');
    }
  }

  demanderFilmPourStreaming() {
    // On ferme la fenêtre actuelle en envoyant un "mot-clé" et l'ID du film
    this.dialogService.close('request:' + this.film._id);
  }

  demanderFilmNonPresent() {
    // On ferme la fenêtre actuelle en envoyant un "mot-clé" et l'ID du film
    this.dialogService.close('status:' + this.film._id);
  }

  copyStreamUrl() {
    const url = this.filmService.getStreamUrl(this.film);
    navigator.clipboard.writeText(url).then(() => {
      alert('Lien de streaming copié dans le presse-papiers');
    }, (err) => {
      console.error('Erreur lors de la copie du lien : ', err);
    });
  }
}
