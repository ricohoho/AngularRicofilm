import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {LazyLoadEvent, SelectItem} from 'primeng/api';
import {FilmService} from'../film.service';
import { Table } from 'primeng/table';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {FilmdetailComponent} from  '../filmdetail/filmdetail.component';
import {Ifilm, Iproduction_companies, IRICO_FICHIER} from '../ifilm'
import {FilmrequestComponent} from  '../filmrequest/filmrequest.component';
import {Irequest} from "../irequest";


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
  rows = 48; //nb_tow_per_page
  sortKey: any;
  totalRecords = 5000;
  displaySpinner=false;

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

 //Renvoi info sur PRENT_STREAMING
  public  getImageStremaning(present_streamin : boolean, type : string) : string {
    let retour='';
    if (present_streamin) {
      if (type=='contenu')
        retour = 'O';// '../../assets/images/ok.png';
      else
        retour='color:green';
    } else {
      if (type=='contenu')
        retour = 'X';//'../../assets/images/ko.png';
      else
        retour='color:red';
    }
    return retour;
  }
  private getRequest(skip:number): void {
    this.displaySpinner=true;
    this.dataService.getFilm(skip, this.filmname, this.rows , this.sortField, this.sortOrder).subscribe(
      (res: HttpResponse<any>) => {
        console.log(res);
        this.films = res.body;
        let present_streaming = false;
        for (const film of this.films) {
          for (const rico_fichier of film.RICO_FICHIER) {
            present_streaming = present_streaming || rico_fichier.serveur_name=='davic.mkdh.fr';
          }
          film.present_streaming=present_streaming;
        }
        this.NbFilms  =  this.convertStringToNumber(this.dataService.NbFilms);
        this.totalRecords=this.NbFilms;
        this.displaySpinner=false;
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
    console.log('loadData : event.first='+event.first); // First row offset
    console.log('loadData : event.rows='+event.rows); // Number of rows per page
    this.getRequest(event.first);
  }

  // Appel de la recherche depuis l'entete de la liste
  recherche(): void {
    console.log('recherche (' + this.filmname + ')');
    this.displaySpinner=true;
    this.getRequest(0);
  }


  loadData2(event :LazyLoadEvent):void {
    //event.first = First row offset
    //event.rows = Number of rows per page
    console.log("loadData2 event.first:"+event.first);
    console.log("loadData2 event.first:"+event.rows);
    let first : number;
    event.first ==undefined  ? first=0 : first=event.first;
    this.getRequest(first);
  }

  showRequestPopUp(p_id:string) {
    console.log('Show'+p_id)
    let  searchIndex = this.films.findIndex((FILM) => FILM._id==p_id);
    this.ref = this.dialogService.open(FilmrequestComponent, {
      data : this.films[searchIndex] ,
      header:this.films[searchIndex].title,
      width: '70%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });

    this.ref.onClose.subscribe((request : Irequest) =>{
      console.log('close')
      console.log('acteur_click'+ request.title);
      if (typeof request  === 'undefined') {
        console.log('Pas de request');
      } else {
        this.messageService.add({severity: 'info', summary: 'Film selectionnée', detail: request.title});
        //Appel creationd e request
        console.log('avant dataService.createRequest');
        this.dataService.createRequest(request);
      }
    });

  }
  showFilmPopUp(p_id:string) {
    console.log('Show'+p_id);
    //faut retrouver le bon film dans le tableau films
    let  searchIndex = this.films.findIndex((FILM) => FILM._id==p_id);
    console.log('searchIndex'+searchIndex);
    this.ref = this.dialogService.open(FilmdetailComponent, {
      data : this.films[searchIndex] ,
      header:this.films[searchIndex].title,
      width: '70%',
      contentStyle: {"max-height": "600px", "overflow": "auto"},
      baseZIndex: 10000
    });

    let dialogRef = this.dialogService.dialogComponentRefMap.get(this.ref);

    this.ref.onClose.subscribe((detail_click) =>{
        console.log('close')
        console.log('acteur_click'+ detail_click);
        if (typeof detail_click  === 'undefined') {
          console.log('Pas d acteur');
        } else {
          this.messageService.add({severity: 'info', summary: 'Film selectionnée', detail: detail_click});
          this.filmname = detail_click;
          this.recherche();
        }
    });

  }

}
