import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {FilmdetailComponent} from './filmdetail/filmdetail.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [DialogService, MessageService]
})
export class AppComponent {
  title = 'AngularRicoFilm';
  items: MenuItem[];
  ref: DynamicDialogRef;

  constructor(public dialogService: DialogService, public messageService: MessageService) {}

  ngOnInit() {
    this.items = [
      {
        label: 'Update',
        icon: 'pi pi-refresh'
      },
      {
        label: 'Delete',
        icon: 'pi pi-times'
      },
      {
        label: 'Angular Website',
        icon: 'pi pi-external-link',
        url: 'http://angular.io'
      },
      {
        label: 'Router',
        icon: 'pi pi-upload',
        routerLink: '/fileupload'
      }
    ];


  }

  show() {
    console.log('Show');
    this.ref = this.dialogService.open(FilmdetailComponent, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }
}
