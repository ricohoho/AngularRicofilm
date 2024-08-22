import { Role } from './role';

export interface Iuser {
  id: string
   username : string;
   email : string;
   rolesString : string;
  rolesIds : string[]
  rolesObj : Role[];
  //Utiliser pour encoyer au web service => ca met a jour les roles
  roles  : string[]
  active : boolean;
};
