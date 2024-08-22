import { Iuser } from './iuser';
import { Role } from './role';

export class User  implements Iuser {
  constructor(id: string, username: string, email: string, rolesString: string, rolesIds : string[], rolesObj : Role[],roles : string[],active : boolean) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.rolesString = rolesString;
    this.rolesIds = rolesIds;
    this.rolesObj=rolesObj;
    //Utiliser pour encoyer au web service => ca met a jour les roles
    this.roles=roles;
    this.active=active;
  }
  id: string
  username : string;
  email : string;
  rolesString : string;
  rolesIds : string[];
  rolesObj : Role[];
  roles: string[];
  active : boolean;
}
