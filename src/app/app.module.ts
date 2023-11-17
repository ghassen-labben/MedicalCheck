import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';
import { MapComponent } from './map/map.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { PatientDashboardComponent } from './patient-dashboard/patient-dashboard.component';
import { ChatComponent } from './chat/chat.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchDoctorsComponent,
    MapComponent,
    SignupComponent,
    PatientDashboardComponent,
    ChatComponent
  ],
  imports: [
    FormsModule,
    LeafletModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
