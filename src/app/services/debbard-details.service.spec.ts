import { TestBed } from '@angular/core/testing';

import { DebbardDetailsService } from './debbard-details.service';

describe('DebbardDetailsService', () => {
  let service: DebbardDetailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DebbardDetailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
