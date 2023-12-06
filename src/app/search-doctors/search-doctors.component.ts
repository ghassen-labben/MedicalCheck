import { Component, Input, OnInit } from '@angular/core';
import { DoctorService } from '../services/doctor.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';
import { ActivatedRoute } from '@angular/router';
import { TestBed } from '@angular/core/testing';
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrls: ['./search-doctors.component.scss'],
  animations: [
    trigger('buttonAnimation', [
      state('inactive', style({
        backgroundColor: 'transparent',
        color: '#333',
      })),
      state('active', style({
        backgroundColor: '#4CAF50',
        color: '#fff',
      })),
      transition('inactive => active', animate('300ms ease-in')),
      transition('active => inactive', animate('300ms ease-out')),
    ]),
    trigger('fadeInOut', [
        transition(':enter', [
          style({ opacity: 0 }),
          animate('500ms', style({ opacity: 1 })),
        ]),
      ]),
  
    
  ]
  
})
export class SearchDoctorsComponent implements OnInit {
  type=localStorage.getItem('type') || '';
  selectedSpeciality: string | null = 'all';
  isClicked = false;
  @Input() selectedReview: number = 5; // Default value, adjust as needed
  filterBySpeciality(speciality: string) {
    if(speciality=="all")
    {
      this.selectedSpeciality='all';
      this.doctors=this.doctorsfinal;
      return;
    }
  this.doctors=this.doctorsfinal.filter((doctor:any) => { 
    this.selectedSpeciality = speciality;
    if(doctor.specialization==speciality)
    {
      console.log(doctor); 
      console.log("salaaaaaaaaaaaaaaaaaam")
      return doctor;
    }
  }
  );

  }
  doctors: any;
specialities:any;
  meetingForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private meetingService: MeetingService,
    private doctorService: DoctorService ,
    private route: ActivatedRoute 
  ) { }
  doctorsfinal:any;
user=JSON.parse(localStorage.getItem('User') || '{}');
  ngOnInit(): void {
    this.getDoctors();
    this.meetingForm = this.formBuilder.group({
      date_time: ['', Validators.required],
      purpose: ['', Validators.required],
      doctor: [''], // You may need to get the doctor's ID from somewhere
      patient: [this.user.id], // You may need to get the patient's ID from somewhere
      status: ['pending']
    });
    
  }

  
  
  modelOpen = false;
  openModal(id: string) {
    this.meetingForm.controls['doctor'].setValue(id);
    console.log(this.doctors);
    this.modelOpen = true;
  }
  term="";
  closeModal() {
    this.modelOpen = false;
  }
 loadImage(doc:any)
 {
  let image=`http://localhost:8000/uploads/users/avatars/${doc.avatar}`;
  return image;
 }
  // Add a method to submit the form
  saveMeeting(): void {
    this.closeModal();
    if (this.meetingForm.valid) {
      console.log('Meeting form data:', this.meetingForm.value);
      this.meetingService.createMeeting(this.meetingForm.value).subscribe(
        (response: any) => {
          // Handle successful creation
          console.log('Meeting created successfully:', response);
          // Optionally, close the modal or do something else
        },
        (error: any) => {
          // Handle error
          console.error('Error creating meeting:', error);
        }
      );
    }
  }
  getDoctors(): void {
    this.doctorService.getAllDoctors()
      .subscribe(
        (doctors: any) => {
          this.route.queryParams.subscribe(params => {
            const governorate = params['governorate'];
            const specialty = params['specialty'];
            console.log(specialty,governorate);
            if(governorate!==undefined && specialty!==undefined) 
    {
// Filter the doctors based on the query parameters
this.doctorService.getDoctorByGovAndSpec( governorate, specialty).subscribe( 
  (response: any) => {
    console.log(response);
    this.doctors=response;
    this.doctorsfinal=this.doctors;

  },
  (error) => {
    console.error('Request error:', error);
  }
);
}
else
{
  this.doctors = doctors;
  if(specialty!==undefined)
  this.doctors=this.doctors.filter((doctor:any) => {
    if(doctor.specialization==specialty)
    {
      console.log(doctor); 
      return doctor;
    }
  });
  if(governorate!==undefined)
  {
    this.doctors=this.doctors.filter((doctor:any) => {
      if(doctor.governorat==governorate)
      {
        console.log(doctor); 
        return doctor;
      }
    });
  }


  this.doctorsfinal=this.doctors;



}
this.specialities=new Set(this.doctors.map((doctor:any) => doctor.specialization));
console.log(this.specialities);
    }
    );   
        },
        (error) => {
          console.error('Error fetching doctors:', error);
          // Handle the error as needed
        }
      );
  }
}
