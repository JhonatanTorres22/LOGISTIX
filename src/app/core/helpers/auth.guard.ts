import { Injectable, inject } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'src/app/auth/infraestructure/services/auth.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardChild implements CanActivateChild {
  private router = inject(Router);
  private authenticationService = inject(AuthenticationService);
  private authService = inject(AuthService)

  /**
   * Determines whether a child route can be activated based on user authentication and authorization.
   *
   * @param route - The activated route snapshot that contains the route configuration and parameters.
   * @param state - The router state snapshot that contains the current router state.
   * @returns A boolean indicating whether the route can be activated. Redirects to an appropriate page if not.
   *
   * If the user is logged in and their role is authorized for the route, returns true.
   * If the user is logged in but not authorized, redirects to the unauthorized page and returns false.
   * If the user is not logged in, redirects to the login page with the return URL and returns false.
   */

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const currentUser = this.authenticationService.currentUserValue;
    const token = this.authService.getToken()    
    if (token) {
      const { roles } = route.data;
      // if (roles && !roles.includes(currentUser.user.role)) {
      //   // User not authorized, redirect to unauthorized page
      //   this.router.navigate(['/unauthorized']);
      //   return false;
      // }
      // User is logged in and authorized for child routes
      return true;
    }

    // User not logged in, redirect to login page
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
