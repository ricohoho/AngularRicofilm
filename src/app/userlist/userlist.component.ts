import {Component, OnInit} from '@angular/core';
import { MessageService, SelectItem } from 'primeng/api';
import { MultiSelectModule } from 'primeng/multiselect';
import {HttpResponse} from "@angular/common/http";
import {UserService} from "../_services/user.service";
import {Iuser} from "../iuser";
import {User} from "../user";
import { Role } from '../role';


@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.css']
})
export class UserlistComponent implements OnInit {

  userListTotal : Iuser[] = [];
  cloneduser: { [s: string]: Iuser } = {};
  //roles!: SelectItem[];
  roles: Role[] = [];



  constructor(private dataService: UserService , private messageService: MessageService) {}

  ngOnInit(): void {
    //Initialisation de la liste de selection
    this.getUsers();

    this.getRoles();
    /*
    this.roles = [
      { _id: '68139c28c17de0527d38e9bd', name: 'moderator' },
      { _id: '68139c28c17de0527d38e9be', name: 'admin' },
      { _id: '68139c28c17de0527d38e9bc', name: 'user' }
    ]*/
    console.log("fin inti userlist.component");
  
   }


 //init de la liste des Roles possible
  getRoles(): void {
    console.log("userlist.composant.getRoles");
    this.dataService.getRolesList().subscribe(
      (res: HttpResponse<any>) => {
        this.roles = res.body;
        console.log(this.roles);
      },
      error => {
        console.error('userLis.composant : Erreur reçue: ' + error);
      }
    );
  }

 //init de la liste des Users
  public getUsers(): void {
    console.log("userlist.composant.getUsers");
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
    console.log('-----------------onRowEditInit');
    console.log('user.username:'+user.username);
    console.log('user._id:'+user.id);
    this.cloneduser[user.id as string] = { ...user };
    console.log('this.cloneduser:'+this.cloneduser);
  }


  onRowEditSave(user: Iuser) {
    console.log('-----------------onRowEditSave');
    console.log(this.cloneduser);
    console.log('(user.username/_id:'+user.username+'/'+user.id);
    console.log('-----------------0');

  const rolesIds: string[] = (user.rolesObj || []).map(role => role._id);
    console.log('-----------------1');
    //On iondique rolesIds dans le champes roles (avant dernier param) pour associer l'array d'id au champs ROLE
    var userData : User = new User(user.id, user.username,user.email, user.rolesString,rolesIds, user.rolesObj, rolesIds,user.active);
    console.log('-----------------2');

    this.dataService.update(user.id,userData).subscribe(
      (result) => {
        // La mise à jour a réussi, faire quelque chose avec le résultat si nécessaire
        console.log('Mise à jour réussie :', result);
      },
      (error) => {
        // La mise à jour a échoué, gérer l'erreur ici
        console.error('Erreur lors de la mise à jour :', error);
      }
    );



    delete this.cloneduser[user.id as string];
    //Appel de sauvagrde
    this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User '+user.username+' is updated' });
  }

  onRowEditCancel(user: Iuser, index: number) {
    this.userListTotal[index] = this.cloneduser[user.id as string];
    delete this.cloneduser[user.id as string];
  }


  onCheckboxChange(item: any) {
    item.selected = !item.selected;
  }

}
