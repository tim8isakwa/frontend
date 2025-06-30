import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const requiredRoles = route.data?.['requiredRoles'] as string[] || [];

  if (authService.isLoggedIn() && authService.hasRole(requiredRoles)) {
    return true;
  }
  
  router.navigate(['/prijava']);
  return false;
};
