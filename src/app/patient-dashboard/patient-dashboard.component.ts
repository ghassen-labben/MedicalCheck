import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MeetingService } from '../services/meeting.service';
import { HttpClient } from '@angular/common/http';
import { PatientAuthService } from '../services/patient-auth.service';

@Component({
  selector: 'app-patient-dashboard',
  templateUrl: './patient-dashboard.component.html',
  styleUrls: ['./patient-dashboard.component.scss'],
  animations: [
    trigger('changeColorAndDestroy', [
      state('unchecked', style({ backgroundColor: 'white' })),
      state('checked', style({ backgroundColor: '#A6FF96', transform: 'scale(1)', opacity: 1 })),
      transition('unchecked => checked', [
        style({ backgroundColor: 'white' }),
        animate('300ms ease-in-out', style({ backgroundColor: '#A6FF96' })),
        sequence([
          animate('300ms ease-in-out', style({ transform: 'scale(0.5)', opacity: 0 })),
        ]),
      ]),
    ]),
    trigger('fadeInOut', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [style({ opacity: 0 }), animate(300)]),
      transition('* => void', animate(300, style({ opacity: 0 }))),
    ]),
  
  ],
})
export class PatientDashboardComponent {
  checkboxChecked: boolean = false; 
   hideElement:boolean = false;
   respiratoryRateValue: number=100;
   formStat!: FormGroup;
   chatOpen=false;notificationOpened=false;


   get heartRateCondition(): boolean {
    let heartRateValue =  this.formStat.get('heartRate')?.value || 0;
    return heartRateValue >= 60 && heartRateValue <= 100;
  }

  get temperatureCondition(): boolean {
    const temperatureValue = this.formStat.get('temperature')?.value || 0;
    return temperatureValue < 36.1 || temperatureValue > 37.2;
  }

  get bloodPressureCondition(): boolean {
    const systolicBloodPressureValue = this.formStat.get('systolicBloodPressure')?.value;
    const diastolicBloodPressureValue = this.formStat.get('diastolicBloodPressure')?.value;
    return systolicBloodPressureValue != null && systolicBloodPressureValue > 120 || diastolicBloodPressureValue != null && diastolicBloodPressureValue > 80;
  }

  get respiratoryRateCondition(): boolean {
    const respiratoryRateValue = this.formStat.get('respiratoryRate')?.value;
    return respiratoryRateValue != null && respiratoryRateValue < 12 || respiratoryRateValue != null && respiratoryRateValue > 20;
  }



  constructor(private fb: FormBuilder,private meetingservice:MeetingService,private http:HttpClient,private patientService:PatientAuthService) {}
user=JSON.parse(localStorage.getItem('User') || '{}');
hideElements:any;

  ngOnInit() {

    console.log(this.user.id);
    console.log(this.user);
    this.patientService.getOrdenances(this.user.id).subscribe((data)=>{ 
      this.ordenances=data;
      this.isChecked= Array(this.ordenances.length).fill(false);
      this.hideElements= Array(this.ordenances.length).fill(true);
    });
    this.meetingservice.getAllMeetingsByPatient(this.user.id).subscribe((data)=>{ 
      this.appointments=data;
    }
    );
    this.formStat = this.fb.group({
      heartRate: [80, [Validators.min(0)]],
      temperature: [36, [Validators.min(0)]],
      systolicBloodPressure: [100, [Validators.min(0)]],
      diastolicBloodPressure: [0, [Validators.min(0)]],
      respiratoryRate: [100, [Validators.min(0)]],
    });

    // Subscribe to form value changes
    this.formStat.valueChanges.subscribe((values) => {
      console.log('Form values changed:', values);
    });
    
    this.http.get(`http://localhost:8000/notifications/Patient/${this.user.id}`).subscribe( 
      (response: any) => {
        console.log(response);
        this.notifications=response;
        this.notifications=this.notifications.sort((a:any,b:any)=>{
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        }
        );
      
      },
      (error) => {
        console.error('Request error:', error);
      }
    );
  }
  ordenances:any;

  onSubmit() {
    // Handle form submission
    console.log('Form submitted!', this.formStat.value);
  }
  // Assuming you have an array 'ordenances' in your component

  appointments:any ;

  open(v:boolean){
    this.chatOpen=v;
  }
  notifications: any;
  openNotification(){
    this.notificationOpened=!this.notificationOpened;
  }
  loadImage(doc:any)
  {
   let image=`http://localhost:8000/uploads/users/avatars/${doc.avatar}`;
   return image;
  }
  isChecked!: boolean[] ;

  onChange(index: number): void {
    this.isChecked[index] = !this.isChecked[index];
    setTimeout(() => { 
      this.hideElements[index]=!this.hideElements[index];
    } 
    , 600);
  }
  
  toggleNotificationList() {
    this.notificationOpened = !this.notificationOpened;
  }
  getAnimationState(index: number): string {
    console.log(index);
    return this.isChecked[index] ? 'checked' : 'unchecked';
  }
  
}
