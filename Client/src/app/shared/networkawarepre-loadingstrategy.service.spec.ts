import { TestBed } from '@angular/core/testing';

import { NetworkawarepreLoadingstrategyService } from './networkawarepre-loadingstrategy.service';

describe('NetworkawarepreLoadingstrategyService', () => {
  let service: NetworkawarepreLoadingstrategyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NetworkawarepreLoadingstrategyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
