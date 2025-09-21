import { Component, OnInit } from '@angular/core';
import {HttpResponse} from '@angular/common/http';
import {LazyLoadEvent, SelectItem} from 'primeng/api';
import {FilmService} from'../film.service';
import {RequestfilmService} from'../requestfilm.service';
import { Table } from 'primeng/table';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {FilmdetailComponent} from  '../filmdetail/filmdetail.component';
import {Ifilm, Iproduction_companies, IRICO_FICHIER} from '../ifilm'
import {FilmrequestComponent} from  '../filmrequest/filmrequest.component';
import {Irequest} from "../irequest";
//import { Router } from '@angular/router';
import { RedirectService } from '../_services/redirect.service';


@Component({
  selector: 'app-filmlist',
  templateUrl: './filmlist.component.html',
  styleUrls: ['./filmlist.component.scss'],
  providers: [DialogService]
})
export class FilmlistComponent implements OnInit {

  films : Ifilm[] = [];

  //Varible permetant la recherche autocomplete
  //=> 1 ere version chargé au démarrage :
  filmselectionTotal : any[] = [];
  //=> le film selectioné dans l'autocomplete :
  filmselectione:any;
  //=> les films filtré a chaque frappe:
  filmselectfiltered: any[];

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
  constructor(private dataService: FilmService,private dataserviceRequest : RequestfilmService,public dialogService: DialogService, public messageService: MessageService,private redirectService: RedirectService) {}

  ngOnInit(): void {
    this.getRequest(0);

    this.sortOptions = [
      {label: 'title asc', value: 'title'},
      {label: 'title dsc ', value: '!title'},
      {label: 'Ajout asc', value: 'UPDATE_DB_DATE'},
      {label: 'Ajout dsc ', value: '!UPDATE_DB_DATE'}
    ];

    //Initialisation de la liste de selection
    this.getFilmSelect("original_title");

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

  //Renvoi la liste de tout les films en json réduit avec juste l'info : infoAffiche comme ( original_titrel ou acteur ...)
  //si la mehode renvoi une erreur contenant 'Accès refusé' on redirige vers la page de login
  public getFilmSelect(infoAffiche:string): void {
    console.log('getFilmSelect debut');
    this.dataService.getFilmSelect(infoAffiche).subscribe(
      (res: HttpResponse<any>) => {
        console.log('getFilmSelect Pos1');
        this.filmselectionTotal = res.body;
      },
      error => {
        console.log('getFilmSelect Pos2');
        console.log(error);
        console.error('filmlist.composant : Erreur reçue: ' + error);
        //if (error.indexOf('Accès refusé')>=0)  this.redirectService.goLogin();//  this.router.navigate(['/login']);
        //if (error.indexOf('401')>=0) {
          console.log('erreur 401');

          this.redirectService.goLogin();
        //}//  this.router.navigate(['/login']);
      }
      );
  }

  //fct appele a chaque caractere saisie dans l'AutoComplete
  public  filterFilmSelect(event:any) {
      //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
      let filtered : any[] = [];
      let query = event.query;
      console.log("filterFilmSelect(query)"+query);

      for(let i = 0; i < this.filmselectionTotal.length; i++) {
        let item = this.filmselectionTotal[i];
        if (item.original_title.toLowerCase().indexOf(query.toLowerCase()) == 0) {
          filtered.push(item);
        }
      }
      console.log("filterFilmSelect(): filtered.length:"+filtered.length);
      this.filmselectfiltered = filtered;
  }


  //Renvoi la liste des Films a afficher dans la liste principales
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
        //SI dans la champs de recherche il y a ia: on supprime le "ia:"
        if (this.filmname.indexOf('ia:')==0)
          this.filmname=this.filmname.substring(3);
        if (this.filmname.indexOf('ia2:')==0)
          this.filmname=this.filmname.substring(4);
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
    console.log('loadData() : event.first='+event.first); // First row offset
    console.log('loadData)( : event.rows='+event.rows); // Number of rows per page
    this.getRequest(event.first);
  }


// Appel de la recherche depuis l'entete de la liste
  rechercheIA(): void {
    console.log('rechercheIA() (' + this.filmname + ')');
    this.displaySpinner=true;
    this.filmname='ia2:'+this.filmname;
    this.getRequest(0);
}

  // Appel de la recherche depuis l'entete de la liste
  recherche(): void {
    console.log('recherche() (' + this.filmname + ')');
    this.displaySpinner=true;
    this.getRequest(0);
  }
  //Recherche appelé a partir de l'autocomplete
  rechercheSelect() {
    console.log('rechercheSelect() ()'+this.filmselectione);
    if (typeof this.filmselectione =='string')
      this.filmname=this.filmselectione;
    else
      this.filmname=this.filmselectione.original_title;
    this.recherche();
  }


  loadData2(event :LazyLoadEvent):void {
    //event.first = First row offset
    //event.rows = Number of rows per page
    console.log("loadData2() event.first:"+event.first);
    console.log("loadData2() event.first:"+event.rows);
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
        console.log('avant dataService.createRequest'+request.title+'/'+request.id+'/'+request.serveur_name+'/'+request.id+'/'+request.file+'/'+request.status+'/'+request.username+'/'+request.size+'/'+request.path
        );
        //this.dataService.createRequest(request);
        this.dataserviceRequest.createRequest(request);

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
