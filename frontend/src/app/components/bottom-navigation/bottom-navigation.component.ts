import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-bottom-navigation',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-4 py-2 z-50">
      <div class="flex justify-around items-center max-w-md mx-auto">
        <a 
          routerLink="/dashboard" 
          routerLinkActive="text-primary-600"
          class="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary-600 transition-colors"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"></path>
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 5a2 2 0 012-2h4a2 2 0 012 2v2H8V5z"></path>
          </svg>
          <span class="text-xs">Accueil</span>
        </a>

        <a 
          routerLink="/payments" 
          routerLinkActive="text-primary-600"
          class="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary-600 transition-colors"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"></path>
          </svg>
          <span class="text-xs">Paiements</span>
        </a>

        <a 
          routerLink="/profile" 
          routerLinkActive="text-primary-600"
          class="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-primary-600 transition-colors"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
          </svg>
          <span class="text-xs">Profil</span>
        </a>

        <button 
          (click)="logout()"
          class="flex flex-col items-center py-2 px-3 text-gray-500 hover:text-red-600 transition-colors"
        >
          <svg class="w-6 h-6 mb-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
          </svg>
          <span class="text-xs">Déconnexion</span>
        </button>
      </div>
    </nav>
  `,
  styles: []
})
export class BottomNavigationComponent {
  constructor(private authService: AuthService) {}

  logout(): void {
    this.authService.logout();
  }
}