import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { HttpBackend, HttpClient } from '@angular/common/http';
import { HttpEventType } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  imagePreview: string | ArrayBuffer | null = null;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
  }


  specialitesMedecins = [
    "Cardiologie",
    "dentist",
    "Dermatology",
    "Gastro-entérologie",
    "Gynécologie",
    "Hématologie",
    "Médecine interne",
    "Neurologie",
    "Ophtalmologie",
    "Orthopédie",
    "Oto-rhino-laryngologie (ORL)",
    "Pédiatrie",
    "Psychiatrie",
    "Radiologie",
    "Urologie",
   
  ];

  tunisianGovernorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Beja", "Jendouba",
    "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabes", "Medenine", "Tataouine", "Gafsa",
    "Sfax", "Tozeur", "Kebili"
  ];
  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      avatar: [],
      latitude: [''],
      governorat:['Tunis'],
      specialization:['dentist'], // Initialize with an empty string, will be updated later
      longitude: [''], // Initialize with an empty string, will be updated later
    });

    this.getGeolocation();
  }

  getGeolocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // Update latitude and longitude in the form
          this.registerForm.patchValue({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Geolocation error:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }
 
  onFileChange(event: any) {
    const file = <File>event.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);

    }
  }onSubmit() {
    // Get the form value
    const formValue = this.registerForm.value;
    this.authService.register(formValue).subscribe((data) => { 
      console.log(data);
      if (data) {
        // Redirect to login page
        //this.router.navigate(['/login']);
        this.router.navigate(['/doctors/login']);
        console.log("success");
      } else {
        // Show an error
        console.error(data);
      }

  });
    
  
}  
}