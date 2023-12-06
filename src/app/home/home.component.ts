import { animate, state, style, transition, trigger } from '@angular/animations';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Component, HostListener, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    trigger('scrollAnimation', [
      state('show', style({
        opacity: 1,
        transform: 'translateY(0)',
      })),
      state('hide', style({
        opacity: 0,
        transform: 'translateY(-100%)',
      })),
      transition('show <=> hide', animate('1s ease-in-out')),
    ]),
  ],
})
export class HomeComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private http: HttpClient, private router: Router,    private route: ActivatedRoute
    ) {}
  authToken = localStorage.getItem('authToken') || '';
   headers = new HttpHeaders().set('Authorization', `Bearer ${this.authToken}`);
   searchForm!: FormGroup;

  ngOnInit(): void {
  
    let type=localStorage.getItem('type') || '';
      this.http.get(`http://localhost:8000/${type}/current`, {headers: this.headers }).subscribe(
        (response: any) => {
       localStorage.setItem('User', JSON.stringify(response));},
        (error) => {
          console.error('Request error:', error);
        }
      );    

    
    console.log("sss");
    this.searchForm = this.formBuilder.group({
      governorate: [this.tunisianGovernorates[0]], // Initial value can be set here
      specialty: [this.specialitesMedecins[0]]   // Initial value can be set here
    });
    console.log("sss");

  }
  onSubmit() {
    const formValues = this.searchForm.value;
    console.log("sss2");
    console.log(formValues);

 // Navigate to /search and pass form values as query parameters
 this.router.navigate(['/search'], {
  queryParams: {
    governorate: formValues.governorate,
    specialty: formValues.specialty
  }
});
  }
  cardAnimationState = 'hide';

  @HostListener('window:scroll', ['$event'])
  onScroll() {
    this.cardAnimationState = 'show';
  }
 
   tunisianGovernorates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte", "Beja", "Jendouba",
    "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid", "Gabes", "Medenine", "Tataouine", "Gafsa",
    "Sfax", "Tozeur", "Kebili"
  ];
   specialitesMedecins = [
    "Cardiologie",
    "dentist",
    "Dermatology",
    "Gastro-entérologie",
    "Gynécologie",
    "Hématologie",
    "Médecine interne",
    "Neurologie",
    "Ophtalmologie",
    "Orthopédie",
    "Oto-rhino-laryngologie (ORL)",
    "Pédiatrie",
    "Psychiatrie",
    "Radiologie",
    "Urologie",
   
  ];
  filterBySpeciality(sp: any){
    this.router.navigate(['/search'], {
      queryParams: {
        specialty: sp
      }
    });
  }
  filterByGovernorate(gov: any){
    this.router.navigate(['/search'], {
      queryParams: {
        governorate: gov
      }
    });
  }
}
