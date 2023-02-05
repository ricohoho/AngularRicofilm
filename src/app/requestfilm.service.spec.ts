import { TestBed } from '@angular/core/testing';

import { RequestfilmService } from './requestfilm.service';

describe('RequestfilmService', () => {
  let service: RequestfilmService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RequestfilmService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
