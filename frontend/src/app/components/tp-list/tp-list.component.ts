import { Component, OnInit } from '@angular/core';
import { TpService } from '../../services/tp.service';
import { RegistrationService } from '../../services/registration.service';
import { AuthService } from '../../services/auth.service';
import { TP, TPRegistration } from '../../models/tp.model';
import { Registration } from '../../services/registration.service';

@Component({
  selector: 'app-tp-list',
  template: `
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h2 class="text-2xl font-bold text-gray-900">Travaux Pratiques</h2>
        <div class="flex space-x-3">
          <button
            (click)="refreshTps()"
            class="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200 flex items-center"
          >
            <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Actualiser
          </button>
        </div>
      </div>

      <!-- Filtres -->
      <div class="mb-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <select
          [(ngModel)]="selectedFiliere"
          (change)="filterTps()"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Toutes les filières</option>
          <option value="INFO">Informatique</option>
          <option value="MAT">Mathématiques</option>
          <option value="PHY">Physique</option>
        </select>

        <select
          [(ngModel)]="selectedNiveau"
          (change)="filterTps()"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Tous les niveaux</option>
          <option value="L1">Licence 1</option>
          <option value="L2">Licence 2</option>
          <option value="L3">Licence 3</option>
          <option value="M1">Master 1</option>
          <option value="M2">Master 2</option>
        </select>

        <select
          [(ngModel)]="selectedStatus"
          (change)="filterTps()"
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">Tous les statuts</option>
          <option value="ACTIVE">Actif</option>
          <option value="INACTIVE">Inactif</option>
          <option value="COMPLETED">Terminé</option>
        </select>

        <input
          type="text"
          [(ngModel)]="searchTerm"
          (input)="filterTps()"
          placeholder="Rechercher un TP..."
          class="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
      </div>

      <!-- Liste des TPs -->
      <div class="space-y-4">
        <div
          *ngFor="let tp of filteredTps"
          class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200"
        >
          <div class="flex justify-between items-start">
            <div class="flex-1">
              <h3 class="text-lg font-semibold text-gray-900 mb-2">{{ tp.title }}</h3>
              <p class="text-gray-600 mb-3">{{ tp.description }}</p>
              
              <div class="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <span class="font-medium text-gray-700">Filière:</span>
                  <span class="ml-2 text-gray-600">{{ tp.filiere }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Niveau:</span>
                  <span class="ml-2 text-gray-600">{{ tp.niveau }}</span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Statut:</span>
                  <span
                    class="ml-2 px-2 py-1 rounded-full text-xs font-medium"
                    [ngClass]="{
                      'bg-green-100 text-green-800': tp.status === 'ACTIVE',
                      'bg-red-100 text-red-800': tp.status === 'INACTIVE',
                      'bg-blue-100 text-blue-800': tp.status === 'COMPLETED'
                    }"
                  >
                    {{ getStatusLabel(tp.status) }}
                  </span>
                </div>
                <div>
                  <span class="font-medium text-gray-700">Places:</span>
                  <span class="ml-2 text-gray-600">{{ tp.maxStudents - tp.currentStudents }}/{{ tp.maxStudents }}</span>
                </div>
              </div>
            </div>

            <div class="ml-4 flex flex-col space-y-2">
              <button
                *ngIf="!isRegistered(tp.id) && tp.status === 'ACTIVE' && (tp.maxStudents - tp.currentStudents) > 0"
                (click)="registerToTp(tp.id)"
                [disabled]="isLoading"
                class="bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <span *ngIf="!isLoading">S'inscrire</span>
                <span *ngIf="isLoading">Inscription...</span>
              </button>
              
              <button
                *ngIf="isRegistered(tp.id)"
                (click)="unregisterFromTp(tp.id)"
                [disabled]="isLoading"
                class="bg-red-600 hover:bg-red-700 disabled:bg-gray-400 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                <span *ngIf="!isLoading">Se désinscrire</span>
                <span *ngIf="isLoading">Désinscription...</span>
              </button>

              <button
                (click)="viewTpDetails(tp.id)"
                class="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-200"
              >
                Voir détails
              </button>
            </div>
          </div>
        </div>

        <!-- Message si aucun TP -->
        <div
          *ngIf="filteredTps.length === 0"
          class="text-center py-8 text-gray-500"
        >
          <svg class="w-16 h-16 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
          <p class="text-lg">Aucun travail pratique trouvé</p>
          <p class="text-sm">Essayez de modifier vos filtres ou de rafraîchir la liste</p>
        </div>
      </div>

      <!-- Pagination -->
      <div *ngIf="totalPages > 1" class="mt-6 flex justify-center">
        <nav class="flex space-x-2">
          <button
            (click)="previousPage()"
            [disabled]="currentPage === 1"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Précédent
          </button>
          
          <span
            *ngFor="let page of getPageNumbers()"
            (click)="goToPage(page)"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium cursor-pointer"
            [ngClass]="{
              'bg-green-600 text-white border-green-600': page === currentPage,
              'text-gray-700 hover:bg-gray-50': page !== currentPage
            }"
          >
            {{ page }}
          </span>
          
          <button
            (click)="nextPage()"
            [disabled]="currentPage === totalPages"
            class="px-3 py-2 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Suivant
          </button>
        </nav>
      </div>
    </div>
  `,
  styles: []
})
export class TpListComponent implements OnInit {
  tps: TP[] = [];
  filteredTps: TP[] = [];
  userRegistrations: TPRegistration[] = [];
  isLoading = false;
  
  // Filtres
  selectedFiliere = '';
  selectedNiveau = '';
  selectedStatus = '';
  searchTerm = '';
  
  // Pagination
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  constructor(
    private tpService: TpService,
    private registrationService: RegistrationService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadTps();
    this.loadUserRegistrations();
  }

  loadTps(): void {
    this.isLoading = true;
    this.tpService.getAllTps().subscribe({
      next: (tps) => {
        this.tps = tps;
        this.filteredTps = [...tps];
        this.totalPages = Math.ceil(this.tps.length / this.itemsPerPage);
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des TPs:', error);
        this.isLoading = false;
        alert('Erreur lors du chargement des travaux pratiques');
      }
    });
  }

  loadUserRegistrations(): void {
    this.registrationService.getUserRegistrations().subscribe({
      next: (registrations: Registration[]) => {
        // Convertir les Registration en TPRegistration
        this.userRegistrations = registrations.map(reg => ({
          id: reg.id || 0,
          tpId: reg.tpId,
          studentId: reg.userId, // Utiliser userId comme studentId
          status: reg.status,
          createdAt: reg.registrationDate || new Date(),
          updatedAt: reg.registrationDate || new Date()
        }));
      },
      error: (error) => {
        console.error('Erreur lors du chargement des inscriptions:', error);
      }
    });
  }

  filterTps(): void {
    this.filteredTps = this.tps.filter(tp => {
      const matchesFiliere = !this.selectedFiliere || tp.filiere === this.selectedFiliere;
      const matchesNiveau = !this.selectedNiveau || tp.niveau === this.selectedNiveau;
      const matchesStatus = !this.selectedStatus || tp.status === this.selectedStatus;
      const matchesSearch = !this.searchTerm || 
        tp.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tp.description.toLowerCase().includes(this.searchTerm.toLowerCase());

      return matchesFiliere && matchesNiveau && matchesStatus && matchesSearch;
    });

    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredTps.length / this.itemsPerPage);
  }

  isRegistered(tpId: number): boolean {
    return this.userRegistrations.some(reg => reg.tpId === tpId);
  }

  registerToTp(tpId: number): void {
    this.isLoading = true;
    this.registrationService.registerToTp(tpId).subscribe({
      next: (registration: Registration) => {
        this.isLoading = false;
        // Convertir et ajouter l'inscription
        const tpRegistration: TPRegistration = {
          id: registration.id || 0,
          tpId: registration.tpId,
          studentId: registration.userId,
          status: registration.status,
          createdAt: registration.registrationDate || new Date(),
          updatedAt: registration.registrationDate || new Date()
        };
        this.userRegistrations.push(tpRegistration);
        this.loadTps(); // Recharger pour mettre à jour le nombre de places
      alert('Inscription réussie !');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur lors de l\'inscription:', error);
        alert('Erreur lors de l\'inscription: ' + error.message);
      }
    });
  }

  unregisterFromTp(tpId: number): void {
    const registration = this.userRegistrations.find(reg => reg.tpId === tpId);
    if (!registration) return;

    this.isLoading = true;
    this.registrationService.unregisterFromTp(registration.id!).subscribe({
      next: () => {
        this.isLoading = false;
        this.userRegistrations = this.userRegistrations.filter(reg => reg.tpId !== tpId);
        this.loadTps(); // Recharger pour mettre à jour le nombre de places
        alert('Désinscription réussie !');
      },
      error: (error) => {
        this.isLoading = false;
        console.error('Erreur lors de la désinscription:', error);
        alert('Erreur lors de la désinscription: ' + error.message);
      }
    });
  }

  viewTpDetails(tpId: number): void {
    // Navigation vers la page de détails du TP
    console.log('Voir détails du TP:', tpId);
  }

  refreshTps(): void {
    this.loadTps();
    this.loadUserRegistrations();
  }

  getStatusLabel(status: string): string {
    const statusLabels: { [key: string]: string } = {
      'ACTIVE': 'Actif',
      'INACTIVE': 'Inactif',
      'COMPLETED': 'Terminé'
    };
    return statusLabels[status] || status;
  }

  // Méthodes de pagination
  getPageNumbers(): number[] {
    const pages: number[] = [];
    const start = Math.max(1, this.currentPage - 2);
    const end = Math.min(this.totalPages, this.currentPage + 2);
    
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    
    return pages;
  }

  goToPage(page: number): void {
    this.currentPage = page;
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}