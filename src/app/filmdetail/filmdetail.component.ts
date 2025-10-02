import { Component, OnInit, Input } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {Ifilm, Iproduction_companies, IVIDEO_RESULTS} from '../ifilm';
import {environment} from "../../environments/environment";
import { YouTubePlayerModule } from '@angular/youtube-player';
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

  videoId : string = "";

 
  constructor( public dialogService: DynamicDialogRef,public config: DynamicDialogConfig,public youtubePlayer: YouTubePlayerModule) {}

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
    console.log("Data1: " +  JSON.stringify(this.config));
    console.log("Data2: "+this.config.data.title);
    this.film=this.config.data;
    console.log("Data3: "+this.film.title);
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


}
