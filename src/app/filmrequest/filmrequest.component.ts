import { Component, OnInit, Input } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Ifilm } from "../ifilm";
import { RadioButtonModule } from 'primeng/radiobutton';
import { Irequest } from "../irequest";
import { UserService } from "../_services/user.service";
import { Iuser } from "../iuser";


@Component({
  selector: 'app-filmrequest',
  templateUrl: './filmrequest.component.html',
  styleUrls: ['./filmrequest.component.css']
})
export class FilmrequestComponent implements OnInit {

  cols_fichier: any;
  film: Ifilm;
  username: string = "";
  choixRicoFichier: number = 0;
  irequest: Irequest;

  constructor(public dialogService: DynamicDialogRef, public config: DynamicDialogConfig, public userService: UserService) { }

  ngOnInit(): void {
    this.film = this.config.data;
    this.userService.getLocalUser();
    this.username = this.userService.username;
    this.cols_fichier = [
      { field: 'serveur_name', header: 'serveur' },
      { field: 'insertDate', header: 'Date' },
      { field: 'path', header: 'Chemin' },
      { field: 'file', header: 'fichier' },
      { field: 'size', header: 'Taille' }
    ];
  }


  creationRequest(): void {
    console.log("creationRequest()" + this.choixRicoFichier);
    this.irequest = {
      //_id:'',
      id: this.film.id,
      file: this.film.RICO_FICHIER[this.choixRicoFichier].file,
      path: this.film.RICO_FICHIER[this.choixRicoFichier].path,
      size: this.film.RICO_FICHIER[this.choixRicoFichier].size,
      username: this.username,
      title: this.film.title,
      serveur_name: this.film.RICO_FICHIER[this.choixRicoFichier].serveur_name,
      status: 'AFAIRE',
    }
    this.dialogService.close(this.irequest);
  }

  transformeDateTimeToDate(date: string): string {
    let dateComponents = date.substring(0, 10);
    return dateComponents;
  }


}
