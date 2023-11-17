import { Component, Input } from '@angular/core';

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
}
