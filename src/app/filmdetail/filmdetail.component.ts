import { Component, OnInit, Input } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {Ifilm,Iproduction_companies} from '../ifilm';
import {environment} from "../../environments/environment";



@Component({
  selector: 'app-filmdetail',
  templateUrl: './filmdetail.component.html',
  styleUrls: ['./filmdetail.component.scss']
})

export class FilmdetailComponent implements OnInit {
  _id ="";
  film : Ifilm ;
  responsiveOptions : any;
  cols_fichier : any;
  path_image : string;
  //private REST_API_SERVER = environment.REST_API_SERVER;
  acteur_click : string;

  constructor( public dialogService: DynamicDialogRef,public config: DynamicDialogConfig) {}

  getDirector(): string {
    let  searchIndex = this.film.credits.crew.findIndex((FILM) => FILM.job=='Director');
    return this.film.credits.crew[searchIndex].name;
  }

  transformeDateTimeToDate(date : string):string {
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
    console.log("Data: " +  JSON.stringify(this.config));
    console.log("Data: "+this.config.data.title);
    this.film=this.config.data;
    console.log("Data: "+this.film.title);
    console.log("Data: "+this.film.genres[0].name);

    this.path_image=environment.PATH_IMAGE;
    console.log("this.path_image: "+this.path_image);

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
