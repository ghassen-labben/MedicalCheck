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
import { JitsiComponent } from './jitsi/jitsi.component';

const routes: Routes = [
  { path: '', component: HomeComponent },  
  
  {
  path: 'doctors',
  children: [
    { path: 'register', component: SignupComponent },
    { path: 'login', component: LoginComponent },
    { path: 'dashboard', component: DoctorDashboardComponent ,canActivate: [DoctorAuthGuard]},
    { path: 'profile', component: ProfileComponent ,canActivate: [DoctorAuthGuard]},
    
    // Add other doctor-related routes as needed
  ]},
  {
  path: 'patients',
  children: [
    { path: 'register', component: SignupPatientComponent },
    { path: 'login', component: LoginPatientComponent },
    {path:'dashboard',component:PatientDashboardComponent, canActivate: [PatientAuthGuard]},// About route
    { path: 'profile', component: ProfileComponent, canActivate: [PatientAuthGuard] },
  ]},
  { path: 'search', component: SearchDoctorsComponent },
{path:'meeting/:id', component:JitsiComponent},
  { path: '**', redirectTo: '' }, 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
