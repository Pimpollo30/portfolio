import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './services/auth.service';
import { catchError, map, of } from 'rxjs';

export const AuthGuard: CanActivateFn = (route, state) => {
    const authService = inject(AuthService);
    const router = inject(Router);
    return authService.getDetails().pipe(
      map(res => res.success),
      catchError(() => {
        router.navigate(['login']);
        return of(false);
      })
    );
};
