import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { DoctorService } from '../services/doctor.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;


  constructor(private fb: FormBuilder,private router: Router,private authService: AuthService,private http: HttpClient) {}


  
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }  // Function to handle form submission
  onSubmit(): void {
    // Check if the form is valid
    if (this.loginForm.valid) {
      // Extract form data
      const data = this.loginForm.value;

      // Call the login method from the authentication service
      this.authService.login(data).subscribe(
        // Successful login response
        (response: any) => {
          // Extract the authentication token from the response
          const token = response.token;

          // Log the token to the console (you might want to remove this in production)
          console.log(response.token);

          // Save the authentication token and user type in local storage
          localStorage.setItem('authToken', token.toString());
          localStorage.setItem('type', 'doctors');

          // Navigate to the home route after successful login
          this.router.navigate(['/']);
        },
        // Error handling for login failure
        (error: any) => {
          console.error('Login error:', error);
        }
      );
    }
  }
}
