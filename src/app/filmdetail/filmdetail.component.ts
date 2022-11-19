import { Component, OnInit, Input } from '@angular/core';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {DynamicDialogConfig} from 'primeng/dynamicdialog';
import {Ifilm,Iproduction_companies} from '../ifilm';


@Component({
  selector: 'app-filmdetail',
  templateUrl: './filmdetail.component.html',
  styleUrls: ['./filmdetail.component.scss']
})

export class FilmdetailComponent implements OnInit {
  _id ="";
  film : Ifilm ;
  responsiveOptions : any;

  constructor( public dialogService: DynamicDialogRef,public config: DynamicDialogConfig) {}

  getDirector(): string {
    let  searchIndex = this.film.credits.crew.findIndex((FILM) => FILM.job=='Director');
    return this.film.credits.crew[searchIndex].name;
  }

  getUPDATE_DB_DATE(): string {
    let  UPDATE_DB_DATE =this.film.UPDATE_DB_DATE;
    let dateComponents = UPDATE_DB_DATE.substring(0,10);
    return dateComponents;
  }

  ngOnInit(): void {
    console.log("Data: " +  JSON.stringify(this.config));
    console.log("Data: "+this.config.data.title);
    this.film=this.config.data;
    console.log("Data: "+this.film.title);
    console.log("Data: "+this.film.genres[0].name);

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
