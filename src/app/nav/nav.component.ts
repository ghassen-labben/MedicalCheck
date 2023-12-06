import { Component, OnInit } from '@angular/core';
import { HomeComponent } from '../home/home.component';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
  constructor( private http: HttpClient,private authService:AuthService)
{}
authToken = localStorage.getItem('authToken') || '';
headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
  User: any;
  image:any;
  typeUser=localStorage.getItem('type');
  showDropdown=false;
  ngOnInit(): void {
    let type=localStorage.getItem('type') || '';
      this.http.get(`http://localhost:8000/${type}/current`, {headers: this.headers }).subscribe(
        (response: any) => {
       localStorage.setItem('User', JSON.stringify(response));},
        (error) => {
          console.error('Request error:', error);
        }
      );    

    this.User = JSON.parse(localStorage.getItem('User') || 'null');
    this.image=`http://localhost:8000/uploads/users/avatars/${this.User.avatar}`;

    console.log(localStorage.getItem('User'));
    if (this.User == null || this.User == undefined) {
      
      console.log("null");
      this.User = null;
    }
    console.log(this.User);
  }// Add these properties to your component class
// Add these properties and methods to your component class
// Example properties for the mobile menu
showMobileMenu: boolean = false;

// Example method to toggle the mobile menu
toggleMobileMenu() {
  this.showMobileMenu = !this.showMobileMenu;
}

// Example method to close the mobile menu
closeMobileMenu() {
  this.showMobileMenu = false;
}
logout(){
  this.authService.logout();
  this.ngOnInit();
}
// Example properties and methods for the dropdowns
showSignInDropdown: boolean = false;
showSignUpDropdown: boolean = false;

toggleDropdown(type: string) {
  if (type === 'signIn') {
    this.showSignInDropdown = !this.showSignInDropdown;
    this.showSignUpDropdown = false;
  } else if (type === 'signUp') {
    this.showSignUpDropdown = !this.showSignUpDropdown;
    this.showSignInDropdown = false;
  }
}
isOpen: boolean = false;

toggleDropdown2() {
    this.isOpen = !this.isOpen;
}

closeDropdown() {
    this.isOpen = false;
}

}
