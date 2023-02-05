import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmrequestComponent } from './filmrequest.component';

describe('FilmrequestComponent', () => {
  let component: FilmrequestComponent;
  let fixture: ComponentFixture<FilmrequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmrequestComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmrequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
