import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TokenService } from '../services/token.service';
import { NotificationService } from '../services/notification.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private notificationService: NotificationService
  ) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage = 'Une erreur est survenue';

        if (error.error instanceof ErrorEvent) {
          // Erreur côté client
          errorMessage = error.error.message;
        } else {
          // Erreur côté serveur
          switch (error.status) {
            case 401:
              errorMessage = 'Session expirée. Veuillez vous reconnecter.';
              this.tokenService.removeToken();
              this.router.navigate(['/auth/login']);
              break;
            case 403:
              errorMessage = 'Accès refusé. Vous n\'avez pas les permissions nécessaires.';
              break;
            case 404:
              errorMessage = 'Ressource non trouvée.';
              break;
            case 500:
              errorMessage = 'Erreur serveur. Veuillez réessayer plus tard.';
              break;
            default:
              errorMessage = error.error?.message || `Erreur ${error.status}: ${error.statusText}`;
          }
        }

        this.notificationService.showError(errorMessage);
        return throwError(() => error);
      })
    );
  }
}
