import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TpService } from '../../services/tp.service';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { TP } from '../../models/tp.model';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-tp-list',
  templateUrl: './tp-list.component.html',
  styleUrls: ['./tp-list.component.css']
})
export class TpListComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  tps: TP[] = [];
  filteredTPs: TP[] = [];
  
  // Filtres
  selectedFiliere = '';
  selectedNiveau = '';
  searchTerm = '';
  
  // Options de filtrage
  filieres: any[] = [];
  niveaux: any[] = [];

  constructor(
    private tpService: TpService,
    private authService: AuthService,
    private roleService: RoleService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Vérifier que l'utilisateur est bien un étudiant
    if (!this.roleService.isStudent()) {
      this.router.navigate(['/']);
      return;
    }

    this.authService.authState$.subscribe(state => {
      this.currentUser = state.user;
      if (state.user) {
        this.loadTPs();
        this.loadFilterOptions();
      }
    });
  }

  loadTPs(): void {
    this.isLoading = true;
    
    if (this.currentUser?.filiere?.id) {
      this.tpService.getAvailableTPsByFiliere(this.currentUser.filiere.id).subscribe({
        next: (tps) => {
          this.tps = tps;
          this.filteredTPs = tps;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des TP:', error);
          this.isLoading = false;
        }
      });
    } else {
      // Charger tous les TP si pas de filière spécifique
      this.tpService.getAllTps().subscribe({
        next: (tps) => {
          this.tps = tps;
          this.filteredTPs = tps;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Erreur lors du chargement des TP:', error);
          this.isLoading = false;
        }
      });
    }
  }

  loadFilterOptions(): void {
    // Extraire les filières et niveaux uniques des TP
    const filiereSet = new Set();
    const niveauSet = new Set();
    
    this.tps.forEach(tp => {
      if (tp.filiere) {
        filiereSet.add(JSON.stringify(tp.filiere));
      }
      if (tp.niveau) {
        niveauSet.add(JSON.stringify(tp.niveau));
      }
    });
    
    this.filieres = Array.from(filiereSet).map(f => JSON.parse(f as string));
    this.niveaux = Array.from(niveauSet).map(n => JSON.parse(n as string));
  }

  applyFilters(): void {
    this.filteredTPs = this.tps.filter(tp => {
      const matchesFiliere = !this.selectedFiliere || tp.filiere?.id.toString() === this.selectedFiliere;
      const matchesNiveau = !this.selectedNiveau || tp.niveau?.id.toString() === this.selectedNiveau;
      const matchesSearch = !this.searchTerm || 
        tp.titre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        tp.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      
      return matchesFiliere && matchesNiveau && matchesSearch;
    });
  }

  onFiliereChange(): void {
    this.applyFilters();
  }

  onNiveauChange(): void {
    this.applyFilters();
  }

  onSearchChange(): void {
    this.applyFilters();
  }

  clearFilters(): void {
    this.selectedFiliere = '';
    this.selectedNiveau = '';
    this.searchTerm = '';
    this.filteredTPs = this.tps;
  }

  registerToTP(tpId: number): void {
    this.router.navigate(['/student/tps', tpId, 'register']);
  }

  viewTPDetails(tpId: number): void {
    this.router.navigate(['/student/tps', tpId]);
  }

  payForTP(tpId: number): void {
    this.router.navigate(['/student/payment', tpId]);
  }

  getStatusBadgeClass(status: string): string {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-100 text-green-800';
      case 'FULL':
        return 'bg-red-100 text-red-800';
      case 'CLOSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-blue-100 text-blue-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'AVAILABLE':
        return 'Disponible';
      case 'FULL':
        return 'Complet';
      case 'CLOSED':
        return 'Fermé';
      default:
        return status;
    }
  }

  formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'XOF',
      minimumFractionDigits: 0
    }).format(price);
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }
}