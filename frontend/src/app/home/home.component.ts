import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  template: `
    <div class="min-h-screen bg-gradient-to-br from-white via-green-50 to-green-100">
      <!-- Navigation -->
      <nav class="bg-white shadow-sm border-b border-green-100">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex justify-between items-center h-16">
            <div class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-green-600 rounded-xl flex items-center justify-center">
                <span class="text-white font-bold text-xl">F</span>
              </div>
              <div>
                <h1 class="text-xl font-bold text-gray-900">FAST UAC</h1>
                <p class="text-sm text-green-600">Gestion des TPs</p>
              </div>
            </div>
            
            <div class="flex items-center space-x-4">
              <button 
                (click)="navigateToLogin()"
                class="px-6 py-2 text-green-600 hover:text-green-700 font-medium transition-colors duration-200">
                Connexion
              </button>
              <button 
                (click)="navigateToRegister()"
                class="px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-medium rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                S'inscrire
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Hero Section -->
      <div class="relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div class="text-center">
            <h1 class="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
              Gestion des
              <span class="text-green-600">Travaux Pratiques</span>
            </h1>
            <p class="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Plateforme moderne et intuitive pour la gestion des TPs, inscriptions, 
              paiements et évaluations. Simplifiez votre expérience académique.
            </p>
            <div class="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                (click)="navigateToLogin()"
                class="px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl">
                Commencer maintenant
              </button>
              <button 
                (click)="scrollToFeatures()"
                class="px-8 py-4 border-2 border-green-600 text-green-600 hover:bg-green-600 hover:text-white font-semibold rounded-xl transition-all duration-200">
                Découvrir les fonctionnalités
              </button>
            </div>
          </div>
        </div>
        
        <!-- Decorative Elements -->
        <div class="absolute top-0 right-0 -mt-4 -mr-4">
          <div class="w-96 h-96 bg-green-200 rounded-full opacity-20"></div>
        </div>
        <div class="absolute bottom-0 left-0 -mb-4 -ml-4">
          <div class="w-64 h-64 bg-green-300 rounded-full opacity-20"></div>
        </div>
      </div>

      <!-- Features Section -->
      <div id="features" class="py-20 bg-white">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="text-center mb-16">
            <h2 class="text-4xl font-bold text-gray-900 mb-4">
              Fonctionnalités principales
            </h2>
            <p class="text-xl text-gray-600">
              Tout ce dont vous avez besoin pour une gestion efficace des TPs
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <!-- Feature 1 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 5.477 5.754 5 7.5 5s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 19 16.5 19c-1.746 0-3.332-.523-4.5-1.253"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Gestion des TPs</h3>
              <p class="text-gray-600">Créez, gérez et suivez vos travaux pratiques avec une interface intuitive et moderne.</p>
            </div>

            <!-- Feature 2 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Inscriptions</h3>
              <p class="text-gray-600">Système d'inscription simplifié pour les étudiants avec suivi en temps réel.</p>
            </div>

            <!-- Feature 3 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Paiements</h3>
              <p class="text-gray-600">Gestion sécurisée des paiements avec intégration de multiples moyens de paiement.</p>
            </div>

            <!-- Feature 4 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Évaluations</h3>
              <p class="text-gray-600">Système d'évaluation complet avec notation et feedback personnalisé.</p>
            </div>

            <!-- Feature 5 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Rapports</h3>
              <p class="text-gray-600">Générez des rapports détaillés et des statistiques pour un suivi optimal.</p>
            </div>

            <!-- Feature 6 -->
            <div class="bg-white p-8 rounded-2xl shadow-lg border border-green-100 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div class="w-16 h-16 bg-green-100 rounded-xl flex items-center justify-center mb-6">
                <svg class="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="text-xl font-semibold text-gray-900 mb-3">Sécurité</h3>
              <p class="text-gray-600">Protection des données et authentification sécurisée pour tous les utilisateurs.</p>
            </div>
          </div>
        </div>
      </div>

      <!-- CTA Section -->
      <div class="py-20 bg-gradient-to-r from-green-600 to-green-700">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 class="text-4xl font-bold text-white mb-6">
            Prêt à commencer ?
          </h2>
          <p class="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Rejoignez des milliers d'étudiants et d'enseignants qui utilisent déjà 
            notre plateforme pour une gestion efficace des TPs.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              (click)="navigateToRegister()"
              class="px-8 py-4 bg-white text-green-600 hover:bg-green-50 font-semibold rounded-xl transition-all duration-200 transform hover:scale-105 shadow-lg">
              Créer un compte gratuit
            </button>
            <button 
              (click)="navigateToLogin()"
              class="px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-green-600 font-semibold rounded-xl transition-all duration-200">
              Se connecter
            </button>
          </div>
        </div>
      </div>

      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div class="flex items-center space-x-3 mb-4">
                <div class="w-8 h-8 bg-green-600 rounded-lg flex items-center justify-center">
                  <span class="text-white font-bold text-lg">F</span>
                </div>
                <span class="text-xl font-bold">FAST UAC</span>
              </div>
              <p class="text-gray-400">
                Plateforme moderne de gestion des travaux pratiques pour l'Université d'Abomey-Calavi.
              </p>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Fonctionnalités</h3>
              <ul class="space-y-2 text-gray-400">
                <li>Gestion des TPs</li>
                <li>Inscriptions</li>
                <li>Paiements</li>
                <li>Évaluations</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Support</h3>
              <ul class="space-y-2 text-gray-400">
                <li>Centre d'aide</li>
                <li>Contact</li>
                <li>Documentation</li>
                <li>FAQ</li>
              </ul>
            </div>
            
            <div>
              <h3 class="text-lg font-semibold mb-4">Légal</h3>
              <ul class="space-y-2 text-gray-400">
                <li>Conditions d'utilisation</li>
                <li>Politique de confidentialité</li>
                <li>Mentions légales</li>
              </ul>
            </div>
          </div>
          
          <div class="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 FAST UAC. Tous droits réservés.</p>
          </div>
        </div>
      </footer>
    </div>
  `,
  styles: [`
    .bg-gradient-to-br {
      background: linear-gradient(to bottom right, #ffffff, #f0fdf4, #dcfce7);
    }
  `]
})
export class HomeComponent {
  constructor(private router: Router) {}

  navigateToLogin(): void {
    this.router.navigate(['/auth/login']);
  }

  navigateToRegister(): void {
    this.router.navigate(['/auth/register']);
  }

  scrollToFeatures(): void {
    document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
  }
}
