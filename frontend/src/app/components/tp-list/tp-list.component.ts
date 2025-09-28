import { Component, OnInit } from '@angular/core';
import { TpService } from '../../services/tp.service';
import { RegistrationService } from '../../services/registration.service';
import { AuthService } from '../../services/auth.service';
import { TP, TPRegistration } from '../../models/tp.model';
import { Registration } from '../../services/registration.service';

@Component({
  selector: 'app-tp-list',
  standalone: true,
  templateUrl: './tp-list.component.html',
})
export class TpListComponent implements OnInit {
  tps: TP[] = [];
  filteredTps: TP[] = [];
  userRegistrations: TPRegistration[] = [];
  isLoading = false;

  // Pagination
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 10;

  constructor(
    private tpService: TpService,
    private registrationService: RegistrationService,
    public authService: AuthService
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
        this.totalPages = Math.ceil(this.filteredTps.length / this.itemsPerPage);
        this.isLoading = false;
      },
      error: (err) => {
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  loadUserRegistrations(): void {
    this.registrationService.getUserRegistrations().subscribe({
      next: (regs: Registration[]) => {
        this.userRegistrations = regs.map(r => ({
          id: r.id || 0,
          tpId: r.tpId,
          studentId: r.userId,
          status: r.status,
          createdAt: r.registrationDate || new Date(),
          updatedAt: r.registrationDate || new Date()
        }));
      }
    });
  }

  filterTps(filiere: string, niveau: string, status: string, search: string): void {
    this.filteredTps = this.tps.filter(tp => {
      const matchFiliere = !filiere || tp.filiere === filiere;
      const matchNiveau = !niveau || tp.niveau === niveau;
      const matchStatus = !status || tp.status === status;
      const matchSearch = !search || tp.title.toLowerCase().includes(search.toLowerCase());
      return matchFiliere && matchNiveau && matchStatus && matchSearch;
    });
    this.currentPage = 1;
    this.totalPages = Math.ceil(this.filteredTps.length / this.itemsPerPage);
  }

  isRegistered(tpId: number): boolean {
    return this.userRegistrations.some(reg => reg.tpId === tpId);
  }

  register(tpId: number): void {
    this.registrationService.registerToTp(tpId).subscribe({
      next: () => {
        this.loadUserRegistrations();
        this.loadTps();
      }
    });
  }
}
