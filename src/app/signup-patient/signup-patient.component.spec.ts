import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupPatientComponent } from './signup-patient.component';

describe('SignupPatientComponent', () => {
  let component: SignupPatientComponent;
  let fixture: ComponentFixture<SignupPatientComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SignupPatientComponent]
    });
    fixture = TestBed.createComponent(SignupPatientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
