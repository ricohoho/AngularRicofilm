import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';
import {DialogService} from 'primeng/dynamicdialog';
import {DynamicDialogRef} from 'primeng/dynamicdialog';
import {MessageService} from 'primeng/api';
import {environment} from "../environments/environment";
import { RedirectService } from './_services/redirect.service';

import { StorageService } from './_services/storage.service';
import { AuthService } from './_services/auth.service';

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
  path_image: string;
  url_home:string;

  //Partie Authentification
  isLoggedIn = false;
  private roles: string[] = [];
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(public dialogService: DialogService, public messageService: MessageService, private authService: AuthService,private storageService: StorageService,private redirectService: RedirectService) {}

  ngOnInit() {
    this.path_image=environment.PATH_IMAGE;
    this.url_home=environment.URL_HOME;
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

    this.isLoggedIn = this.storageService.isLoggedIn();

    if (this.isLoggedIn) {
      const user = this.storageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      this.username = user.username;
    }


  }
/*
  show() {
    console.log('Show');
    this.ref = this.dialogService.open(FilmdetailComponent, {
      header: 'Choose a Product',
      width: '70%',
      contentStyle: {"max-height": "500px", "overflow": "auto"},
      baseZIndex: 10000
    });
  }
*/
  logout2(): void {
    console.log('logout:debut Vide')
  }

  logout(): void {
    console.log('logout:debut');

    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        //window.location.reload();
        console.log('logout:avant goHome')
        //this.redirectService.goHome();
      },
      error: err => {
        console.log(err);
      }
    });
  
  }

  affichelist():void {
    //this.router.navigate(['/ricofilmA']);
    this.redirectService.goHome();
  }

}
