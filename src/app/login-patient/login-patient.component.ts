import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientAuthService } from '../services/patient-auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login-patient',
  templateUrl: './login-patient.component.html',
  styleUrls: ['./login-patient.component.scss']
})
export class LoginPatientComponent {
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder,private router: Router,private authService: PatientAuthService,private http: HttpClient) {}


  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }
  onSubmit(): void {
    console.log(this.loginForm.value);
    if (this.loginForm.valid) {
      const data = this.loginForm.value;
     this.authService.login(data).subscribe( 
        (response: any) => {
          const token = response.token;
          localStorage.setItem('authToken', token);
          localStorage.setItem('type', 'patients');
          this.router.navigate(['/']);
      
        },
        (error: any) => {
          console.error('Login error:', error);
      
        }
      );
    }      
  }

}
