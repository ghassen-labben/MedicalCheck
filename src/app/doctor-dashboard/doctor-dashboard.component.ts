import { Component, OnInit } from '@angular/core';
import { MeetingService } from '../services/meeting.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-doctor-dashboard',
  templateUrl: './doctor-dashboard.component.html',
  styleUrls: ['./doctor-dashboard.component.scss']
})
export class DoctorDashboardComponent implements OnInit {
  constructor(private meetingService: MeetingService,private fb: FormBuilder,private http: HttpClient,private doctorService:DoctorService) {}
  meetings: any;
  ngOnInit(): void {
    this.prescriptionForm = this.fb.group({
      prescriptionDate: ['', Validators.required],
      prescribedMedications: ['', Validators.required],
      dosageInstructions: ['', Validators.required],
      prescriptionDuration: ['', Validators.required],
      specialInstructions: [''],
      doctor:JSON.parse(localStorage.getItem('User') || '{}').id,
      patient: [],
    });
   this.meetingService.getAllMeetingsByDoctor(JSON.parse(localStorage.getItem('User') || '{}').id).subscribe((data)=>{ 
      this.meetings=data;
      console.log(data);
    });
  }
  prescriptionForm!: FormGroup;

  updateMeeting(id: any, status: any) {
    this.meetingService.updateMeeting(id, { status }).subscribe((data) => {
      console.log(data); 
      this.ngOnInit();
    });
  }
 
  onSubmit(id:any) {
    if (this.prescriptionForm.valid) {
      // Make the HTTP POST request
      this.prescriptionForm.controls['patient'].setValue(id); 
      console.log(this.prescriptionForm.value);
      this.doctorService.addPrescription(this.prescriptionForm.value).subscribe(
        // Successful responses call the first callback.
        (response) => {
          console.log('Prescription added successfully.');
          // this.router.navigate(['/']);
        },
        // Errors will call this callback instead:
        (error) => {
          console.error('Error adding prescription!');
          console.error(error);
        }
      );
    }
  }

}
