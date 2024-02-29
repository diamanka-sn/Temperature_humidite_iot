import { TestBed } from '@angular/core/testing';

import { MilieuServiceService } from './milieu-service.service';

describe('MilieuServiceService', () => {
  let service: MilieuServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MilieuServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
