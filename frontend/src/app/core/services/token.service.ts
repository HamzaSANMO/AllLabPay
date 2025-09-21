import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
  private readonly TOKEN_KEY = 'auth_token';
  private readonly TOKEN_EXPIRY_KEY = 'token_expiry';

  setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
    
    // Définir l'expiration (24h par défaut)
    const expiry = new Date();
    expiry.setHours(expiry.getHours() + 24);
    localStorage.setItem(this.TOKEN_EXPIRY_KEY, expiry.toISOString());
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  removeToken(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.TOKEN_EXPIRY_KEY);
  }

  hasValidToken(): boolean {
    const token = this.getToken();
    if (!token) return false;

    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiry) return false;

    return new Date(expiry) > new Date();
  }

  isTokenExpired(): boolean {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    if (!expiry) return true;

    return new Date(expiry) <= new Date();
  }

  getTokenExpiry(): Date | null {
    const expiry = localStorage.getItem(this.TOKEN_EXPIRY_KEY);
    return expiry ? new Date(expiry) : null;
  }
}
