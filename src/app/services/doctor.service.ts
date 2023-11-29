import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  private apiUrl = 'http://localhost:8000/doctors'; // Adjust the URL based on your server configuration

  constructor(private http: HttpClient) {}
  registerDoctor(doctorData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, doctorData).pipe(
      catchError((error) => {
        console.error('Error creating doctor:', error);
        return throwError('Internal Server Error');
      })
    );
  }
  getAllDoctors(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/`);
  }
}
