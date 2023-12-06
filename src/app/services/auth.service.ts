import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private authTokenKey = 'authToken';
  private apiUrl = 'http://localhost:8000'; // Replace with your API UR
  register(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/doctors/register`, userData);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    localStorage.setItem('type', 'doctors');
    return this.http.post(`${this.apiUrl}/doctors/login`, credentials);
  }
  isUserDoctor():boolean{
    return localStorage.getItem('type') === 'doctors';
  } 
  logout(): void { 
    localStorage.removeItem('authToken');
    localStorage.removeItem('type');
  localStorage.removeItem('User');
  }
  constructor(private http: HttpClient) {}

 

}
