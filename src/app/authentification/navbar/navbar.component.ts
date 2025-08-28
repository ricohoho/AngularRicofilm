import { Component } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import {DialogService, DynamicDialogRef} from "primeng/dynamicdialog";
import {MenuItem, MessageService} from "primeng/api";
import {StorageService} from "../../_services/storage.service";
import {RedirectService} from "../../_services/redirect.service";
import {environment} from "../../../environments/environment";
import { Subscription } from 'rxjs';
import {NavbarsService} from "../../_services/navbars.service";
import { ImageModule } from 'primeng/image'; // Import du module PrimeNG Image
import { ToolbarModule } from 'primeng/toolbar';
import { FilmService } from '../../film.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})

export class NavbarComponent {

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

  subscription: Subscription;

  selectedButton: number = 1; // Initialiser pour que le premier bouton soit sélectionné par défaut 

  constructor(private authService: AuthService,private storageService: StorageService,private redirectService: RedirectService,private navbarsService: NavbarsService, private messageService: MessageService, private filmService: FilmService) {
    //Inscription a l'observable d'un service, lui meme est mis a jour par un composant, login.component par exemple
    //Si le login a réussi reussi  alors on solicite le service NavbarsService avec la methode refreshComponent(), qui déclenche de son coté la methide refrsh du composant NavBar !!
    this.subscription = this.navbarsService.getRefreshObservable().subscribe(() => {
      this.refresh();
    });
  }

  
  

  selectButton(buttonNumber: number) {
    this.selectedButton = buttonNumber; // Met à jour l'état en fonction du bouton cliqué
  }

  //metode Refresh declenché par l'observalbe
  refresh() {
    // Mettez ici la logique de rafraîchissement de votre composant
    console.log('refresh NavBarr !!! ');
    console.log('refresh NavBarr !!! '+this.navbarsService.isLoggedIn_NavBar);
    this.isLoggedIn = this.navbarsService.isLoggedIn_NavBar;
   //Mise a jour des infos : nom user er roles
    if (this.isLoggedIn) {
      this.getLocalUser();
    }
  }

  ngOnInit() {
    this.path_image=environment.PATH_IMAGE+'/ricofilmlogo.gif';
    this.url_home=environment.URL_HOME;

    this.isLoggedIn = this.storageService.isLoggedIn();
    //Mise a jour des infos : nom user er roles
    if (this.isLoggedIn) {
      this.getLocalUser();
    }
  }

  //Get info user stocké en local
  getLocalUser() {
    const user = this.storageService.getUser();
    this.roles = user.roles;
    this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
    this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');
    this.username = user.username;
  }

  goLogin(): void {
    console.log('login:debut');
    this.redirectService.goLogin()
  }

  goRegister():void {
    console.log('login:goRegister');
    this.redirectService.goRegister()
  }

  //deconexion
  logout(): void {
    console.log('logout:debut');

    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();
        //window.location.reload();
        console.log('logout:avant goHome')
        //this.redirectService.goHome();
        this.isLoggedIn=false;
        //l'apple de goHome2() ne fonctonn pas tj ... curieux ...
        this.goHome2();
        
      },
      error: err => {
        console.log('erreur logout',err);
      }
    });

  }



  //Provoque  l'affichage de de la liste des films
  affichelist():void {
    //this.router.navigate(['/ricofilmA']);
    //EF 20250820 ajout url de searchFilm
    this.redirectService.goSearchFilm();
  }


  afficheAnnuaire():void {
    console.log('afficheAnnuaire()');
    this.redirectService.goAnnuaire();
  }

  goHome2():void {
    console.log('goHome2()');
    this.redirectService.goHome2(); 
  }

  goProfile():void {
    console.log('goProfile()');
    this.redirectService.goProfile();
  }

  sync(): void {
    console.log('sync()');
    this.filmService.sync().subscribe(
      (response) => {
        this.messageService.add({
          severity: 'success',
          summary: response.message,
          detail: `Créés: ${response.created}, Mis à jour: ${response.updated}, Total: ${response.total}`,
        });
      },
      (error) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error',
          detail: 'Sync failed',
        });
      }
    );
  }
}
