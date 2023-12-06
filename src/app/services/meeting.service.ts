import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MeetingService {
  private apiUrl = 'http://localhost:8000';  // Replace with your API endpoint

  constructor(private http: HttpClient) { }

  createMeeting(meeting: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });

    return this.http.post<any>(`${this.apiUrl}/meetings`, meeting, { headers }); 

  }
  getAllMeetingsByDoctor(id: any): Observable<any> { 
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });

    return this.http.get<any>(`${this.apiUrl}/meetings/doctor/${id}`, { headers });

  }
  getAllMeetingsByPatient(id: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });

    return this.http.get<any>(`${this.apiUrl}/meetings/patient/${id}`, { headers });

  }
  updateMeeting(id: any, meeting: any): Observable<any> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('authToken')}`
    });

    return this.http.put<any>(`${this.apiUrl}/meetings/${id}`, meeting, { headers });

  }

}
