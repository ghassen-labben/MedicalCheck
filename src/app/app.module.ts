import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SearchDoctorsComponent } from './search-doctors/search-doctors.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SearchDoctorsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
