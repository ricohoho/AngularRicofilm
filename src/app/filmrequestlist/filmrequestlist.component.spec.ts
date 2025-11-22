import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmrequestlistComponent } from './filmrequestlist.component';

describe('FilmrequestlistComponent', () => {
  let component: FilmrequestlistComponent;
  let fixture: ComponentFixture<FilmrequestlistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmrequestlistComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmrequestlistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
