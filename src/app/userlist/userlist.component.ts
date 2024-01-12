import {Component, OnInit} from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import {HttpResponse} from "@angular/common/http";
import {UserService} from "../_services/user.service";
import {Iuser} from "../iuser";


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userListTotal : Iuser[] = [];
  cloneduser: { [s: string]: Iuser } = {};

  constructor(private dataService: UserService , private messageService: MessageService) {}

  ngOnInit(): void {
    //Initialisation de la liste de selection
    this.getUsers();

  }

  public getUsers(): void {
    console.log("userlit.composant.getUsers");
    this.dataService.getUserList().subscribe(
      (res: HttpResponse<any>) => {
        this.userListTotal = res.body;
      },
      error => {
        console.error('userLis.composant : Erreur reçue: ' + error);
        //if (error.indexOf('Accès refusé')>=0)  this.redirectService.goLogin();//  this.router.navigate(['/login']);
      }
    );
  }


  /*
  gestion du tableau Editable
   */
  onRowEditInit(user:Iuser) {
    console.log('user.username:'+user.username);
    this.cloneduser[user._id as string] = { ...user };
    console.log('this.cloneduser:'+this.cloneduser);
  }

  onRowEditSave(user: Iuser) {

    delete this.cloneduser[user._id as string];
    //Appel de sauvagrde
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User '+user.username+' is updated' });

  }

  onRowEditCancel(user: Iuser, index: number) {
    this.userListTotal[index] = this.cloneduser[user._id as string];
    delete this.cloneduser[user._id as string];
  }

}
