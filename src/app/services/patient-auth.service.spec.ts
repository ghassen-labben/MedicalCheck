import { TestBed } from '@angular/core/testing';

import { PatientAuthService } from './patient-auth.service';

describe('PatientAuthService', () => {
  let service: PatientAuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PatientAuthService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
