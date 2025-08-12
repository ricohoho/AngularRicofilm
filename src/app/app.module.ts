import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import {RouterModule} from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Composant
import { AppComponent } from './app.component';
import { FilmlistComponent } from './filmlist/filmlist.component';

import { ToolbarModule } from 'primeng/toolbar'
import { ButtonModule } from 'primeng/button';
import { SplitButtonModule } from 'primeng/splitbutton';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import {TableModule} from 'primeng/table';
import {DialogModule} from 'primeng/dialog';
import { HttpClientModule } from '@angular/common/http';
import {InputText, InputTextModule} from 'primeng/inputtext';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { ToastModule } from 'primeng/toast';
import {FilmdetailComponent} from "./filmdetail/filmdetail.component";
import { CommonModule } from '@angular/common';
import {CarouselModule} from 'primeng/carousel';
import {MultiSelectModule} from 'primeng/multiselect';
import { ImageModule } from 'primeng/image'; // Import du module PrimeNG Image

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FilmrequestComponent } from './filmrequest/filmrequest.component';
import {RadioButtonModule} from "primeng/radiobutton";

import { YouTubePlayerModule } from '@angular/youtube-player';
import { VideoPlayerComponent } from './video-player/video-player.component';
import {AutoCompleteModule} from "primeng/autocomplete";

import { LoginComponent } from './authentification/login/login.component';
import { RegisterComponent } from './authentification/register/register.component';
import { ProfileComponent } from './authentification/profile/profile.component';


import { httpInterceptorProviders } from './_helpers/http.interceptor';
import { HomeComponent } from './authentification/home/home.component';
import { UserlistComponent } from './userlist/userlist.component';
import { NavbarComponent } from './authentification/navbar/navbar.component';

import { GalleriaModule } from 'primeng/galleria';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { CardModule } from 'primeng/card';



@NgModule({
  declarations: [
    AppComponent,
    FilmlistComponent,
    FilmdetailComponent,
    FilmrequestComponent,
    VideoPlayerComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    HomeComponent,
    UserlistComponent,
    NavbarComponent
  ],
    imports: [
      AppRoutingModule,
        BrowserModule,
        BrowserAnimationsModule,
        RouterModule,
        ToolbarModule,
        ButtonModule,
        SplitButtonModule,
        DataViewModule,
        DropdownModule,
        FormsModule,
        TableModule,
        DialogModule,
        HttpClientModule,
        InputTextModule,
        DynamicDialogModule,
        ToastModule,
        CommonModule,
        CarouselModule,
        ProgressSpinnerModule,
        RadioButtonModule,
        YouTubePlayerModule,
        AutoCompleteModule,
        MultiSelectModule,
        ImageModule,
        GalleriaModule,
        BrowserAnimationsModule,
        AvatarModule,
        AvatarGroupModule,
        CardModule  
    ],
  providers: [httpInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
