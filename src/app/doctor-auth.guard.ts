// doctor-auth.guard.ts
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from './services/auth.service'; // You need to implement this service to check the user's role

@Injectable({
  providedIn: 'root',
})
export class DoctorAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    if (this.authService.isUserDoctor()) {
      return true;
    } else {
      // Redirect to a different page or show an error message
      this.router.navigate(['/login']);
      return false;
    }
  }
}
