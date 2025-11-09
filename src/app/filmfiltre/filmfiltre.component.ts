import { Component, OnInit } from '@angular/core';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-filmfiltre',
  templateUrl: './filmfiltre.component.html',
  styleUrls: ['./filmfiltre.component.scss']
})
export class FilmfiltreComponent implements OnInit {

  filtre = {
    title: '',
    original_title: '',
    actor: '',
    director: '',
    status: ''
  };

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }

  lancerRecherche() {
    this.ref.close(this.filtre);
  }

}
