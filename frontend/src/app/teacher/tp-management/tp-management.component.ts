import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TpService } from '../../services/tp.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TP } from '../../models/tp.model';

@Component({
  selector: 'app-tp-management',
  templateUrl: './tp-management.component.html',
  styleUrls: ['./tp-management.component.css']
})
export class TpManagementComponent implements OnInit {
  tps: TP[] = [];
  isLoading = true;
  filteredTPs: TP[] = [];
  searchTerm = '';
  statusFilter = '';

  constructor(
    private tpService: TpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTPs();
  }

  loadTPs(): void {
    this.isLoading = true;
    this.tpService.getTeacherTPs().subscribe({
      next: (tps) => {
        this.tps = tps;
        this.filteredTPs = tps;
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Erreur lors du chargement des TP:', error);
        this.snackBar.open('Erreur lors du chargement des TP', 'Fermer', { duration: 3000 });
        this.isLoading = false;
      }
    });
  }

  filterTPs(): void {
    this.filteredTPs = this.tps.filter(tp => {
      const matchesSearch = tp.title.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
                           tp.description.toLowerCase().includes(this.searchTerm.toLowerCase());
      const matchesStatus = !this.statusFilter || tp.status === this.statusFilter;
      return matchesSearch && matchesStatus;
    });
  }

  onSearchChange(): void {
    this.filterTPs();
  }

  onStatusFilterChange(): void {
    this.filterTPs();
  }

  createNewTP(): void {
    this.router.navigate(['/teacher/tps/create']);
  }

  editTP(tpId: number): void {
    this.router.navigate(['/teacher/tps', tpId, 'edit']);
  }

  scheduleTP(tpId: number): void {
    this.router.navigate(['/teacher/tps', tpId, 'schedule']);
  }

  viewTPDetails(tpId: number): void {
    this.router.navigate(['/teacher/tps', tpId]);
  }

  manageGrades(tpId: number): void {
    this.router.navigate(['/teacher/tps', tpId, 'grades']);
  }

  deleteTP(tpId: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce TP ? Cette action est irréversible.')) {
      this.tpService.deleteTp(tpId).subscribe({
        next: () => {
          this.snackBar.open('TP supprimé avec succès', 'Fermer', { duration: 3000 });
          this.loadTPs();
        },
        error: (error) => {
          console.error('Erreur lors de la suppression:', error);
          this.snackBar.open('Erreur lors de la suppression du TP', 'Fermer', { duration: 3000 });
        }
      });
    }
  }

  publishTP(tpId: number): void {
    if (confirm('Êtes-vous sûr de vouloir publier ce TP ? Les étudiants pourront alors s\'inscrire.')) {
      const tp = this.tps.find(t => t.id === tpId);
      if (tp) {
        const updatedTP = { ...tp, status: 'PUBLISHED' as const };
        this.tpService.updateTP(tpId, updatedTP).subscribe({
          next: () => {
            this.snackBar.open('TP publié avec succès', 'Fermer', { duration: 3000 });
            this.loadTPs();
          },
          error: (error) => {
            console.error('Erreur lors de la publication:', error);
            this.snackBar.open('Erreur lors de la publication du TP', 'Fermer', { duration: 3000 });
          }
        });
      }
    }
  }

  getStatusColor(status: string): string {
    switch (status) {
      case 'DRAFT': return 'bg-gray-100 text-gray-800';
      case 'PUBLISHED': return 'bg-blue-100 text-blue-800';
      case 'ACTIVE': return 'bg-green-100 text-green-800';
      case 'INACTIVE': return 'bg-red-100 text-red-800';
      case 'COMPLETED': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  }

  getStatusText(status: string): string {
    switch (status) {
      case 'DRAFT': return 'Brouillon';
      case 'PUBLISHED': return 'Publié';
      case 'ACTIVE': return 'Actif';
      case 'INACTIVE': return 'Inactif';
      case 'COMPLETED': return 'Terminé';
      default: return status;
    }
  }

  canPublish(tp: TP): boolean {
    return tp.status === 'DRAFT';
  }

  canEdit(tp: TP): boolean {
    return tp.status === 'DRAFT' || tp.status === 'PUBLISHED';
  }

  canDelete(tp: TP): boolean {
    return tp.status === 'DRAFT';
  }

  canSchedule(tp: TP): boolean {
    return tp.status === 'PUBLISHED' || tp.status === 'ACTIVE';
  }

  canManageGrades(tp: TP): boolean {
    return tp.status === 'ACTIVE' || tp.status === 'COMPLETED';
  }
}