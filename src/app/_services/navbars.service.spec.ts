import { TestBed } from '@angular/core/testing';

import { NavbarsService } from './navbars.service';

describe('NavbarsService', () => {
  let service: NavbarsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavbarsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
