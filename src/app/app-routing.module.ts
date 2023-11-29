// app-routing.module.ts

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';
import { SignupComponent } from './signup/signup.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { LoginPatientComponent } from './login-patient/login-patient.component';
import { DoctorAuthGuard } from './doctor-auth.guard';
import { PatientAuthGuard } from './patient-auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  {
  path: 'doctors',canActivate: [DoctorAuthGuard],
  children: [
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DoctorDashboardComponent },
    { path: 'profile', component: ProfileComponent },
    // Add other doctor-related routes as needed
  ]},
  {
  path: 'patients', canActivate: [PatientAuthGuard],
  children: [
    { path: 'register', component: SignupPatientComponent },
    { path: 'login', component: LoginPatientComponent },
    {path:'dashboard',component:PatientDashboardComponent},// About route
    { path: 'profile', component: ProfileComponent },
  ]},
  { path: 'search', component: SearchDoctorsComponent },
  { path: '**', redirectTo: '' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
