import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PatientAuthService } from '../services/patient-auth.service';
@Component({
  selector: 'app-signup-patient',
  templateUrl: './signup-patient.component.html',
  styleUrls: ['./signup-patient.component.scss']
})
export class SignupPatientComponent {
  imagePreview: string | ArrayBuffer | null = null;
  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: PatientAuthService, private router: Router) {
  }
  tunisianGovernorates:any;

  ngOnInit() {
    
  this.tunisianGovernorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Beja", "Jendouba",
    "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabes", "Medenine", "Tataouine", "Gafsa",
    "Sfax", "Tozeur", "Kebili"
  ];
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(3)]],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      governorat: ['', Validators.required],
      gender: ['', Validators.required],
      avatar: [],
      latitude: [''], // Initialize with an empty string, will be updated later
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
    console.log(formValue);
    this.authService.register(formValue).subscribe((data) => { 
      console.log(data);
      if (data) {
        console.log("salam");
        this.router.navigate(['/patients/login']);
        console.log("success");
      } else {
        // Show an error
        console.error(data);
      }

  });
    
  
}  
}
