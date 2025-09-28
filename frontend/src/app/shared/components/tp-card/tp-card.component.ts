import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TP {
  id: number;
  titre: string;
  description: string;
  matiere: string;
  filiere: string;
  niveau: string;
  dateLimite: string;
  status: 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  prix: number;
  placesDisponibles: number;
  placesTotales: number;
  enseignant: string;
}

import { OnInit } from '@angular/core';
@Component({
  selector: 'app-tp-card',


  template: `
    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700">
      <!-- Header avec badge de statut -->
      <div class="p-4 border-b border-gray-200 dark:border-gray-700">
        <div class="flex justify-between items-start mb-2">
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white line-clamp-2">
            {{ tp.titre }}
          </h3>
          <span 
            [class]="getStatusClass()"
            class="px-2 py-1 text-xs font-medium rounded-full">
            {{ getStatusText() }}
          </span>
        </div>
        
        <p class="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
          {{ tp.description }}
        </p>
      </div>

      <!-- Informations principales -->
      <div class="p-4 space-y-3">
        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253"></path>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ tp.matiere }}</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ tp.filiere }}</span>
          </div>
        </div>

        <div class="grid grid-cols-2 gap-3 text-sm">
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ tp.niveau }}</span>
          </div>
          
          <div class="flex items-center space-x-2">
            <svg class="w-4 h-4 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span class="text-gray-700 dark:text-gray-300">{{ tp.dateLimite | date:'dd/MM/yyyy' }}</span>
          </div>
        </div>

        <!-- Places et prix -->
        <div class="flex justify-between items-center pt-2 border-t border-gray-200 dark:border-gray-700">
          <div class="text-sm">
            <span class="text-gray-600 dark:text-gray-400">Places: </span>
            <span class="font-medium text-gray-900 dark:text-white">
              {{ tp.placesDisponibles }}/{{ tp.placesTotales }}
            </span>
          </div>
          <div class="text-lg font-bold text-green-600 dark:text-green-400">
            {{ tp.prix | currency:'XOF':'symbol':'1.0-0' }}
          </div>
        </div>

        <!-- Enseignant -->
        <div class="text-sm text-gray-600 dark:text-gray-400">
          <span>Enseignant: </span>
          <span class="font-medium">{{ tp.enseignant }}</span>
        </div>
      </div>

      <!-- Actions -->
      <div class="p-4 pt-0">
        <div class="flex space-x-2">
          <button 
            (click)="onView.emit(tp)"
            class="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            Voir détails
          </button>
          
          <button 
            *ngIf="tp.status === 'ACTIVE' && tp.placesDisponibles > 0"
            (click)="onRegister.emit(tp)"
            class="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors duration-200">
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .line-clamp-2 {
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
  `]
})
export class TpCardComponent {
  @Input() tp!: TP;
  @Output() onView = new EventEmitter<TP>();
  @Output() onRegister = new EventEmitter<TP>();

  getStatusClass(): string {
    switch (this.tp.status) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'INACTIVE':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'COMPLETED':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  }

  getStatusText(): string {
    switch (this.tp.status) {
      case 'ACTIVE':
        return 'Actif';
      case 'INACTIVE':
        return 'Inactif';
      case 'COMPLETED':
        return 'Terminé';
      default:
        return 'Inconnu';
    }
  }
}
