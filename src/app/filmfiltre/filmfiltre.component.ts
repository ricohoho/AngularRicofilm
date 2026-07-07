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
    status: '',
    present_streaming: false,
    searchBothTitles: false
  };

  constructor(public ref: DynamicDialogRef) { }

  ngOnInit(): void {
  }

  onToggleSearchBothTitles(checked: boolean) {
    this.filtre.searchBothTitles = checked;
    if (checked) {
      this.filtre.original_title = '';
    }
  }

  lancerRecherche() {
    const payload: any = { ...this.filtre };
    if (!payload.present_streaming) {
      delete payload.present_streaming;
    }
    if (payload.searchBothTitles) {
      payload.titles = payload.title;
      delete payload.title;
      delete payload.original_title;
    }
    delete payload.searchBothTitles;
    this.ref.close(payload);
  }

}
