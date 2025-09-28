import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GradeService, Grade } from '../../services/grade.service';
import { AuthService } from '../../services/auth.service';
import { RoleService } from '../../services/role.service';
import { User } from '../../models/auth.model';

@Component({
  selector: 'app-grades',
  templateUrl: './grades.component.html',
  styleUrls: ['./grades.component.css']
})
export class GradesComponent implements OnInit {
  currentUser: User | null = null;
  isLoading = true;
  grades: Grade[] = [];
  averageGrade = 0;
  totalGrades = 0;
  
  // Filtres
  selectedFiliere = '';
  selectedNiveau = '';
  searchTerm = '';
  
  // Options de filtrage
  filieres: any[] = [];
  niveaux: any[] = [];

  constructor(
    private gradeService: GradeService,
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
        this.loadGrades();
      }
    });
  }

  loadGrades(): void {
    this.isLoading = true;
    
    // Charger les notes de l'utilisateur
    this.gradeService.getUserGrades().subscribe({
      next: (grades) => {
        this.grades = grades;
        this.isLoading = false;
        this.loadFilterOptions();
        this.calculateAverage();
      },
      error: (error) => {
        console.error('Erreur lors du chargement des notes:', error);
        this.isLoading = false;
      }
    });

    // Charger la moyenne
    this.gradeService.getUserAverageGrade().subscribe({
      next: (averageData) => {
        this.averageGrade = averageData.average;
        this.totalGrades = averageData.totalGrades;
      },
      error: (error) => {
        console.error('Erreur lors du chargement de la moyenne:', error);
      }
    });
  }

  loadFilterOptions(): void {
    // Extraire les filières et niveaux uniques des notes
    const filiereSet = new Set();
    const niveauSet = new Set();
    
    this.grades.forEach(grade => {
      // Note: Les grades n'ont pas directement filière/niveau, on pourrait les récupérer via le TP
      // Pour l'instant, on utilise les données de l'utilisateur
      if (this.currentUser?.filiere) {
        filiereSet.add(JSON.stringify(this.currentUser.filiere));
      }
      if (this.currentUser?.niveau) {
        niveauSet.add(JSON.stringify(this.currentUser.niveau));
      }
    });
    
    this.filieres = Array.from(filiereSet).map(f => JSON.parse(f as string));
    this.niveaux = Array.from(niveauSet).map(n => JSON.parse(n as string));
  }

  calculateAverage(): void {
    if (this.grades.length > 0) {
      const sum = this.grades.reduce((acc, grade) => acc + grade.grade, 0);
      this.averageGrade = sum / this.grades.length;
      this.totalGrades = this.grades.length;
    }
  }

  getGradeClass(grade: number): string {
    if (grade >= 16) return 'text-green-600 bg-green-100';
    if (grade >= 14) return 'text-blue-600 bg-blue-100';
    if (grade >= 12) return 'text-yellow-600 bg-yellow-100';
    if (grade >= 10) return 'text-orange-600 bg-orange-100';
    return 'text-red-600 bg-red-100';
  }

  getGradeText(grade: number): string {
    if (grade >= 16) return 'Excellent';
    if (grade >= 14) return 'Très bien';
    if (grade >= 12) return 'Bien';
    if (grade >= 10) return 'Passable';
    return 'Insuffisant';
  }

  formatDate(date: string | Date): string {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  }

  exportGrades(): void {
    // Simuler l'export des notes
    alert('Export des notes en cours...');
    // Ici vous pourriez implémenter la vraie logique d'export
  }

  navigateToDashboard(): void {
    this.router.navigate(['/student/dashboard']);
  }
}