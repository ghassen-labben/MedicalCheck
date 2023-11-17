import { animate, sequence, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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

  onChange() {
    this.checkboxChecked = !this.checkboxChecked;
setTimeout(() => {
  this.hideElement = true;
}, 500);    

  }
  

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
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
  }

  onSubmit() {
    // Handle form submission
    console.log('Form submitted!', this.formStat.value);
  }
  
  appointments:any [] = [
    {
      time: '10:00 AM',
      doctor: 'Dr. Smith',
      purpose: 'General Checkup',
    },
    {
      time: '02:30 PM',
      doctor: 'Dr. Johnson',
      purpose: 'Dental Cleaning',
    },
    // Add more appointments as needed
  ];

  open(v:boolean){
    this.chatOpen=v;
  }
  notifications: string[] = [
    'Notification 1',
    'Notification 2',
    'Notification 3',
    'Notification 4',
    'Notification 5',
  ];
  openNotification(){
    this.notificationOpened=!this.notificationOpened;
  }
  

  toggleNotificationList() {
    this.notificationOpened = !this.notificationOpened;
  }
}
