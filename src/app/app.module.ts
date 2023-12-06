import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { ProfileComponent } from './profile/profile.component';
import { Routes } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { NavComponent } from './nav/nav.component';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { DoctorDashboardComponent } from './doctor-dashboard/doctor-dashboard.component';
import { SignupPatientComponent } from './signup-patient/signup-patient.component';
import { LoginPatientComponent } from './login-patient/login-patient.component';
import { JitsiComponent } from './jitsi/jitsi.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchDoctorsComponent,
    MapComponent,
    SignupComponent,
    PatientDashboardComponent,
    ChatComponent,
    ProfileComponent,
    NavComponent,
    LoginComponent,
    DoctorDashboardComponent,
    SignupPatientComponent,
    LoginPatientComponent,
    JitsiComponent,
    


  ],
  imports: [
    FormsModule,
    LeafletModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpClientModule,
    
  ],
  providers: [],
  bootstrap: [AppComponent]
  
})
export class AppModule { }
