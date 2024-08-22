import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { StorageService } from '../../_services/storage.service';
import { RedirectService } from '../../_services/redirect.service';
import {UserService} from '../../_services/user.service';
import {HttpResponse} from "@angular/common/http";
import {NavbarsService} from "../../_services/navbars.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService,private redirectService: RedirectService,private userService:UserService,private navbarsService: NavbarsService) {}

  ngOnInit(): void {
    //Si on est logué renvoi vers la page HOME
    //On est logue si
    // 1) isLoggedIn == true (presence de token en localstorage)
    // 2) appel  getUserBoard sans erreur (avec passage du tocken)
    console.log('login.component.ngOnInit');
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      //On test si l'appel du WebService getUserBoard est autorisé
      this.userService.getUserBoard().subscribe(
        (res: HttpResponse<any>) => {
          console.log('login.component.ngOnInit getUserBoard()');
          this.roles = this.storageService.getUser().roles;
          //EF===========================  si loggué on redirige vers la home page
          this.redirectService.goHome();
          console.log('login.component.ngOnInit isLoggedIn redirect');
        },
        error => {
          //================ Acces non autorisé => redirection vers LOGIN ==============
          console.log('login.component.ngOnInit error'+error);
          //this.storageService.clean();
          //if (error.indexOf('404')>=0) {
            console.log('login.component.ngOnInit erreur 404');
            this.isLoggedIn = false;
          //}
        }
      )

      /*
      this.isLoggedIn = true;
      if (this.isLoggedIn) {
        console.log('login.component.ngOnInit isLoggedIn redirect');
        this.roles = this.storageService.getUser().roles;
        //EF si loggué on redirige vers la home page
        //this.redirectService.goHome();
      }
       */
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        //this.reloadPage();
        this.navbarsService.refreshComponent(true);
        this.redirectService.goHome2();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }
}
