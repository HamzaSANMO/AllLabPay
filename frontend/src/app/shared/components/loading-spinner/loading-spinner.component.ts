import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-loading-spinner',


  template: `
    <div 
      *ngIf="show"
      class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white dark:bg-gray-800 rounded-lg p-6 flex flex-col items-center space-y-4">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <p class="text-gray-700 dark:text-gray-300 font-medium">{{ message || 'Chargement...' }}</p>
      </div>
    </div>
  `,
  styles: []
})
export class LoadingSpinnerComponent {
  @Input() show: boolean = false;
  @Input() message: string = '';
}
