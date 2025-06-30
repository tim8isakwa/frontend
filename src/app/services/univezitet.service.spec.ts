import { TestBed } from '@angular/core/testing';

import { UnivezitetService } from './univezitet.service';

describe('UnivezitetService', () => {
  let service: UnivezitetService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnivezitetService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
