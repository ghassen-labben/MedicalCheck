// patient-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { PatientAuthService } from './services/patient-auth.service';

@Injectable({
  providedIn: 'root',
})
export class PatientAuthGuard implements CanActivate {
  constructor(private authService: PatientAuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isUserPatient()) {
      return true;
    } else {
      // Redirect to a different page or show an error message
      this.router.navigate(['/patient/login']);
      return false;
    }
  }
}
