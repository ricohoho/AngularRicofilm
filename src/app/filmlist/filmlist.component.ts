import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {SelectItem} from 'primeng/api';
import {FilmService} from'../film.service';
import { Table } from 'primeng/table';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {FilmdetailComponent} from  '../filmdetail/filmdetail.component';
import {Ifilm,Iproduction_companies} from '../ifilm'


@Component({
  selector: 'app-filmlist',
  templateUrl: './filmlist.component.html',
  styleUrls: ['./filmlist.component.scss'],
  providers: [DialogService, MessageService]
})
export class FilmlistComponent implements OnInit {

  films : Ifilm[] = [];
  //film;
  NbFilms = 0 ;
  filmname = '';
  rows = 12;
  sortKey: any;
  totalRecords = 5000;

  sortOptions: SelectItem[];
  sortOrder: number;
  sortField: string;


  ref: DynamicDialogRef;

  //constructor(private dataService: FilmService) {}
  constructor(private dataService: FilmService,public dialogService: DialogService, public messageService: MessageService) {}

  ngOnInit(): void {
    this.getRequest(0);

    this.sortOptions = [
      {label: 'title asc', value: 'title'},
      {label: 'title dsc ', value: '!title'},
      {label: 'Ajout asc', value: 'UPDATE_DB_DATE'},
      {label: 'Ajout dsc ', value: '!UPDATE_DB_DATE'}
    ];

  }

  convertDate(date_heure:string): string {
    let dateComponents = date_heure.substring(0,10);
    return dateComponents;
  }

  convertStringToNumber(chiefer:String ):number {
    let coiffure = +chiefer;
    return coiffure;
  }

  private getRequest(skip:number): void {
    this.dataService.getFilm(skip, this.filmname, this.rows , this.sortField, this.sortOrder).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res);
        this.films = res.body;
        this.NbFilms  =  this.convertStringToNumber(this.dataService.NbFilms);
        this.totalRecords=this.NbFilms;
      }
    );
  }

  // tslint:disable-next-line:typedef

  onSortChange(event: any): void {
    const value = event.value;
    console.log('onSortChange:' + event.value);
    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }

  // A chaque clique sur le images de paginations
  loadData(event:any): void {
    console.log(event.first); // First row offset
    console.log(event.rows); // Number of rows per page
    this.getRequest(event.first);
  }

  // Appel de la recherche depuis l'entete de la liste
  recherche(): void {
    console.log('recherche (' + this.filmname + ')');
    this.getRequest(0);
  }

  show(p_id:string) {
    console.log('Show'+p_id);
    //faut retrouver le bon film dans le tableau films
    let  searchIndex = this.films.findIndex((FILM) => FILM._id==p_id);
    console.log('searchIndex'+searchIndex);
    this.ref = this.dialogService.open(FilmdetailComponent, {
      data : this.films[searchIndex],
      header:this.films[searchIndex].title,
      width: '70%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });



    this.ref.onClose.subscribe(() =>{
        console.log('close');
        this.messageService.add({severity:'info', summary: 'Product Selected', detail: 'jojo'});
    });

  }

}
