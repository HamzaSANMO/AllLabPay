import { Component, OnInit } from '@angular/core';
import { TpService } from '../../services/tp.service';
import { GradeService } from '../../services/grade.service';
import { MatSnackBar } from '@angular/material/snack-bar';

interface TPWithGrades {
  id: number;
  title: string;
  status: string;
  totalStudents: number;
  gradedStudents: number;
  canPublish: boolean;
  published: boolean;
  averageGrade?: number;
  highestGrade?: number;
  lowestGrade?: number;
}

@Component({
  selector: 'app-results-publication',
  templateUrl: './results-publication.component.html',
  styleUrls: ['./results-publication.component.css']
})
export class ResultsPublicationComponent implements OnInit {
  tps: TPWithGrades[] = [];
  isLoading = true;
  searchTerm = '';
  filteredTPs: TPWithGrades[] = [];

  constructor(
    private tpService: TpService,
    private gradeService: GradeService,
    private snackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.loadTPsWithGrades();
  }

  loadTPsWithGrades(): void {
    this.isLoading = true;
    this.tpService.getTeacherTPs().subscribe({
      next: (tps) => {
        // Simuler les données de notes pour l'instant
        // Dans une vraie application, vous appelleriez le service de notes pour chaque TP
        this.tps = tps.map(tp => {
          const totalStudents = Math.floor(Math.random() * 20) + 5; // Simuler le nombre d'étudiants
          const gradedStudents = Math.floor(totalStudents * (0.3 + Math.random() * 0.7)); // Simuler les notes saisies
          const canPublish = gradedStudents === totalStudents && totalStudents > 0;
          
          // Simuler les statistiques de notes
          let averageGrade, highestGrade, lowestGrade;
          if (gradedStudents > 0) {
            averageGrade = Math.round((10 + Math.random() * 10) * 10) / 10;
            highestGrade = Math.round((15 + Math.random() * 5) * 10) / 10;
            lowestGrade = Math.round((5 + Math.random() * 5) * 10) / 10;
          }

          return {
            id: tp.id,
            title: tp.title,
            status: tp.status,
            totalStudents,
            gradedStudents,
            canPublish,
            published: Math.random() > 0.5, // Simuler si publié ou non
            averageGrade,
            highestGrade,
            lowestGrade
          };
        });
        
        this.filteredTPs = this.tps;
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
    this.filteredTPs = this.tps.filter(tp => 
      tp.title.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  onSearchChange(): void {
    this.filterTPs();
  }

  publishResults(tpId: number): void {
    const tp = this.tps.find(t => t.id === tpId);
    if (!tp) return;

    if (confirm(`Êtes-vous sûr de vouloir publier les résultats pour "${tp.title}" ?\n\nCette action rendra les résultats visibles par tous les étudiants inscrits.`)) {
      // Simuler la publication des résultats
      // Dans une vraie application, vous appelleriez this.gradeService.publishResults(tpId)
      setTimeout(() => {
        tp.published = true;
        this.snackBar.open('Résultats publiés avec succès', 'Fermer', { duration: 3000 });
      }, 1000);
    }
  }

  unpublishResults(tpId: number): void {
    const tp = this.tps.find(t => t.id === tpId);
    if (!tp) return;

    if (confirm(`Êtes-vous sûr de vouloir retirer la publication des résultats pour "${tp.title}" ?\n\nLes étudiants ne pourront plus voir leurs résultats.`)) {
      // Simuler le retrait de publication
      // Dans une vraie application, vous appelleriez this.gradeService.unpublishResults(tpId)
      setTimeout(() => {
        tp.published = false;
        this.snackBar.open('Publication des résultats retirée', 'Fermer', { duration: 3000 });
      }, 1000);
    }
  }

  generatePDF(tpId: number): void {
    const tp = this.tps.find(t => t.id === tpId);
    if (!tp) return;

    // Simuler la génération de PDF
    this.snackBar.open(`Génération du PDF pour "${tp.title}" en cours...`, 'Fermer', { duration: 3000 });
    
    // Dans une vraie application, vous appelleriez this.gradeService.generatePDF(tpId)
    setTimeout(() => {
      // Simuler le téléchargement du PDF
      const blob = new Blob(['PDF simulé'], { type: 'application/pdf' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `resultats_${tp.title.replace(/\s+/g, '_')}.pdf`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      this.snackBar.open('PDF généré et téléchargé avec succès', 'Fermer', { duration: 3000 });
    }, 2000);
  }

  getCompletionPercentage(tp: TPWithGrades): number {
    if (tp.totalStudents === 0) return 0;
    return Math.round((tp.gradedStudents / tp.totalStudents) * 100);
  }

  getCompletionColor(tp: TPWithGrades): string {
    const percentage = this.getCompletionPercentage(tp);
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 75) return 'bg-yellow-500';
    if (percentage >= 50) return 'bg-orange-500';
    return 'bg-red-500';
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

  getPublishedStatusColor(published: boolean): string {
    return published ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800';
  }

  getPublishedStatusText(published: boolean): string {
    return published ? 'Publié' : 'Non publié';
  }
}