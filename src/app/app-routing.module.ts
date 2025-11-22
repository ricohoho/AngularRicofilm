import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './authentification/register/register.component';
import { LoginComponent } from './authentification/login/login.component';
import { ProfileComponent } from './authentification/profile/profile.component';
import { HomeComponent } from './authentification/home/home.component';
import {AppComponent} from "./app.component";
import {FilmlistComponent} from "./filmlist/filmlist.component";
import {UserlistComponent} from "./userlist/userlist.component"
import { FilmrequestComponent } from './filmrequest/filmrequest.component';  
import { FilmrequestlistComponent } from './filmrequestlist/filmrequestlist.component';  

const routes: Routes = [
  { path: '', component: HomeComponent },
  {path: 'searchfilm', component: FilmlistComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'userlist', component: UserlistComponent },
  { path: 'request', component: FilmrequestComponent },
   { path: 'requestlist', component: FilmrequestlistComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
