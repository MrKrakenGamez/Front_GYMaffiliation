import { HttpErrorResponse, HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth';
import { environment } from '../../../environments/environment';

/**
 * - Adjunta el Bearer token a cada request hacia nuestra API.
 * - Si la respuesta es 401, intenta un refresh una sola vez y reintenta
 *   la request original. Si el refresh también falla, cierra sesión.
 */
export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);

  const isApiRequest = req.url.startsWith(environment.apiUrl);
  const isAuthEndpoint = req.url.includes('/auth/login') || req.url.includes('/auth/refresh');

  const token = authService.getAccessToken();
  const authReq = isApiRequest && token && !isAuthEndpoint
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status !== 401 || !isApiRequest || isAuthEndpoint) {
        return throwError(() => error);
      }

      return authService.refresh().pipe(
        switchMap((refreshed) => {
          if (!refreshed) {
            authService.forceLocalLogout();
            return throwError(() => error);
          }
          const newToken = authService.getAccessToken();
          const retryReq = req.clone({ setHeaders: { Authorization: `Bearer ${newToken}` } });
          return next(retryReq);
        })
      );
    })
  );
};