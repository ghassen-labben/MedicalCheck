import { Component, Input } from '@angular/core';
import { DoctorService } from '../services/doctor.service';

@Component({
  selector: 'app-search-doctors',
  templateUrl: './search-doctors.component.html',
  styleUrls: ['./search-doctors.component.scss']
})
export class SearchDoctorsComponent {
  
  selectedSpeciality: string | null = null;
  isClicked = false;
  @Input() selectedReview: number = 5; // Default value, adjust as needed
  filterBySpeciality(speciality: string) {
    if(this.selectedSpeciality === speciality){
      this.selectedSpeciality=null;
    }
    else
    this.selectedSpeciality = speciality;
  
    console.log('Filter by speciality:', this.selectedSpeciality);
    // Add logic to filter doctors based on the selected speciality
  }
  doctors: any=this.getDoctors();
  
  constructor(private doctorService: DoctorService) { }

  ngOnInit(): void {
    this.getDoctors();
  }

  getDoctors(): void {
    this.doctorService.getAllDoctors()
      .subscribe(
        (doctors: any) => {
          this.doctors = doctors;
          console.log(doctors);
        },
        (error) => {
          console.error('Error fetching doctors:', error);
          // Handle the error as needed
        }
      );
  }
}
