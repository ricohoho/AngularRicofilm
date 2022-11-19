import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilmdetailComponent } from './filmdetail.component';

describe('FilmdetailComponent', () => {
  let component: FilmdetailComponent;
  let fixture: ComponentFixture<FilmdetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilmdetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FilmdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
