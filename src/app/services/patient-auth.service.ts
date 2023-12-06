import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientAuthService {
  private authTokenKey = 'authToken';
  private apiUrl = 'http://localhost:8000'; 
  // Replace with your API UR
  token=localStorage.getItem('authToken') || '';
  headers = new HttpHeaders().set('Authorization', `Bearer ${this.token}`);
  patient=localStorage.getItem('User') || '';
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
  getOrdenances(id:any): Observable<any> { 
    return this.http.get<any>(`${this.apiUrl}/ordenances/patient/${id}`,{headers: this.headers }); 
  }
  constructor(private http: HttpClient) {}
}
