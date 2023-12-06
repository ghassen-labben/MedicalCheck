import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit  {
  profileForm!: FormGroup; // Declare profileForm as a FormGroup
  uploadProgress!: number;
  modelOpen=false;
  constructor(private formBuilder: FormBuilder,private http:HttpClient) {}
  ngOnInit(): void {
    this.User=JSON.parse(localStorage.getItem('User') || '{}');
    console.log(this.User.avatar); 
    this.image=`http://localhost:8000/uploads/users/avatars/${this.User.avatar}`;
  }
type=localStorage.getItem('type') || '';
 


  headers = { 'Authorization': `Bearer ${localStorage.getItem('authToken')}` };
image:any;
  User:any;
  isModalOpen = false;

  openModal() {
    this.modelOpen = true;
  }

  closeModal() {
    this.modelOpen = false;
  }
 
  name: string = '';
  email: string = '';
  selectedFile: File | null = null;

  handleFileInput(event: any) {
    // Handle file input changes and update the selectedFile property
    this.selectedFile = event.target.files?.[0] || null;
  }

  uploadFile() {
    // Create a FormData object to send the file and other form data
    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('email', this.email);
    if (this.selectedFile) {
      console.log(this.selectedFile,"ddd");
      formData.append('avatar', this.selectedFile, this.selectedFile.name);
    }

    // Replace the URL with your backend API endpoint
    const apiUrl = `http://localhost:8000/${this.type}/update`;
    
    // Make an HTTP request to upload the file and update the profile
    this.http.post(`${apiUrl}/${this.User.id}`, formData).subscribe(
      (response) => {
        console.log('Profile updated successfully:', response);
        localStorage.setItem('User', JSON.stringify(response));
        // Handle success, e.g., show a success message to the user
      },
      (error) => {
        console.error('Error updating profile:', error);
        // Handle error, e.g., show an error message to the user
      }
    );
    this.closeModal();
  }
  
}
