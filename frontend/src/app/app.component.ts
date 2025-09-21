import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100">
      <!-- Header -->
      <header class="bg-white shadow-sm border-b border-green-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">FAST UAC</h1>
                <p class="text-sm text-green-600">Gestion des Travaux Pratiques</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content -->
      <main class="flex-1">
        <router-outlet></router-outlet>
      </main>
    </div>
  `,
  styles: []
})
export class AppComponent {
  constructor() {}
}
