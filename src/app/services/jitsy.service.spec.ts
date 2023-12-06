import { TestBed } from '@angular/core/testing';

import { JitsyService } from './jitsy.service';

describe('JitsyService', () => {
  let service: JitsyService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(JitsyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
