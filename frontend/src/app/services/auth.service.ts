import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { map, catchError, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { RegisterDto, LoginDto, JwtResponse, User, AuthState } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly API_URL = 'http://localhost:8080/api/auth';
  
  private authStateSubject = new BehaviorSubject<AuthState>({
    user: null,
    token: null,
    isAuthenticated: false
  });
  
  public authState$ = this.authStateSubject.asObservable();

  constructor(
    private http: HttpClient,
    private router: Router
  ) {
    this.loadStoredAuth();
  }

  private loadStoredAuth(): void {
    const token = localStorage.getItem('auth_token');
    const userStr = localStorage.getItem('auth_user');
    
    if (token && userStr) {
      try {
        const user = JSON.parse(userStr);
        this.authStateSubject.next({
          user,
          token,
          isAuthenticated: true
        });
      } catch (error) {
        this.clearAuth();
      }
    }
  }

  register(registerData: RegisterDto): Observable<any> {
    return this.http.post(`${this.API_URL}/register`, registerData).pipe(
      catchError(this.handleError)
    );
  }

  login(loginData: LoginDto): Observable<any> {
  return this.http.post<any>(`${this.API_URL}/login`, loginData).pipe(
    tap((response: any) => {
      console.log("Réponse brute du backend:", response);

      // ⚡️ Adapte selon la structure de ton backend
      const token = response.token || response.accessToken;
      const user = response.user || { username: response.username };

      if (token) {
        this.storeAuth(token, user);
        this.router.navigate(['/dashboard']);
      }
    }),
    catchError(this.handleError)
  );
}


  logout(): void {
    this.clearAuth();
    this.router.navigate(['/']);
  }

  private storeAuth(token: string, user: any): void {
    localStorage.setItem('auth_token', token);
    localStorage.setItem('auth_user', JSON.stringify(user));

    this.authStateSubject.next({
      user,
      token,
      isAuthenticated: true
    });
  }

  private clearAuth(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('auth_user');
    
    this.authStateSubject.next({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }

  private handleError(error: any): Observable<never> {
    let errorMessage = 'Une erreur est survenue';
    
    if (error.error) {
      errorMessage = error.error;
    } else if (error.message) {
      errorMessage = error.message;
    }
    
    return throwError(() => new Error(errorMessage));
  }

  getToken(): string | null {
    return this.authStateSubject.value.token;
  }

  isAuthenticated(): boolean {
    return this.authStateSubject.value.isAuthenticated;
  }

  getCurrentUser(): User | null {
    return this.authStateSubject.value.user;
  }

  // Méthode pour ajouter le token aux headers des requêtes
  getAuthHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  // Méthode pour rafraîchir les informations utilisateur
  refreshUserInfo(): Observable<any> {
    return this.http.get(`${this.API_URL}/me`, { headers: this.getAuthHeaders() }).pipe(
      tap((response: any) => {
        if (response && response.user) {
          const currentState = this.authStateSubject.value;
          this.authStateSubject.next({
            ...currentState,
            user: response.user
          });
          localStorage.setItem('auth_user', JSON.stringify(response.user));
        }
      }),
      catchError(this.handleError)
    );
  }
}
