import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthService {
  private authTokenKey = 'authToken';
  private apiUrl = 'http://localhost:8000'; // Replace with your API UR
  register(userData: any): Observable<any> {
    console.log(userData);
    return this.http.post(`${this.apiUrl}/patients/register`, userData);
  }
  login(credentials: { email: string; password: string }): Observable<any> {
    localStorage.setItem('type', 'patients');
    return this.http.post(`${this.apiUrl}/patients/login`, credentials);
  }
  isUserPatient():boolean{
    return localStorage.getItem('type') === 'patients';
  } 
  constructor(private http: HttpClient) {}
}
