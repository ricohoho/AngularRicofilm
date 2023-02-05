import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
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

import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { FilmrequestComponent } from './filmrequest/filmrequest.component';
import {RadioButtonModule} from "primeng/radiobutton";





@NgModule({
  declarations: [
    AppComponent,
    FilmlistComponent,
    FilmdetailComponent,
    FilmrequestComponent
  ],
  imports: [
    BrowserModule,
    //RouterModule,
    BrowserAnimationsModule,
    RouterModule.forRoot([
        {path:'',component: AppComponent},
        { path: 'ricofilmA', component: FilmlistComponent }
    ]),
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
    RadioButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
