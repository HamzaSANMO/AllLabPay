import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { TokenService } from './token.service';
import { Router } from '@angular/router';

export interface User {
  id: number;
  email: string;
  matricule: string;
  role: 'STUDENT' | 'TEACHER' | 'ADMIN';
  nom: string;
  prenom: string;
  filiere?: string;
  niveau?: string;
}

export interface LoginRequest {
  email: string;
  matricule: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: any = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private router: Router
  ) {
    this.loadUserFromToken();
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/login`, credentials)
      .pipe(
        tap(response => {
          this.tokenService.setToken(response.token);
          this.currentUserSubject.next(response.user);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  isAuthenticated(): boolean {
    return this.tokenService.hasValidToken() && !!this.currentUserSubject.value;
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  getCurrentUserRole(): string {
    return this.currentUserSubject.value?.role || '';
  }

  private loadUserFromToken(): void {
    if (this.tokenService.hasValidToken()) {
      // Optionnel: recharger les informations utilisateur depuis le serveur
      this.http.get<User>(`${environment.apiUrl}/auth/me`).subscribe({
        next: (user) => this.currentUserSubject.next(user),
        error: () => this.logout()
      });
    }
  }

  refreshToken(): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${environment.apiUrl}/auth/refresh`, {});
  }
}
