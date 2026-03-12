import { Injectable, inject } from '@angular/core';
import { Router, CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthService } from 'src/app/auth/infraestructure/services/auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuardChild implements CanActivateChild {
  private router = inject(Router);
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

    const token = this.authService.getToken()    
    if (token) {
      const { roles } = route.data;

      return true;
    }
    this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
    return false;
  }
}
