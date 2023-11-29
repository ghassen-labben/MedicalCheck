import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router, Event } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'MedicalCheck2';

  shouldShowNav: boolean = true;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event: Event) => event instanceof NavigationEnd))
      .subscribe((event: Event) => {
        // Explicitly cast event to NavigationEnd
        const navEnd = event as NavigationEnd;
        this.shouldShowNav = !['/register', '/login'].includes(navEnd.url);
      });
  }
}
