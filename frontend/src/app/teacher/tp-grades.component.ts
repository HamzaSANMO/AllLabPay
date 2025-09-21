import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GradeService } from '../services/grade.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-tp-grades',
  templateUrl: './tp-grades.component.html',
})
export class TpGradesComponent implements OnInit {
  tpId: number;
  grades: any[] = [];
  stats: any = {};
  gradeForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private gradeService: GradeService,
    private fb: FormBuilder
  ) {
    this.tpId = +this.route.snapshot.paramMap.get('tpId')!;
    this.gradeForm = this.fb.group({
      studentId: ['', Validators.required],
      note: ['', [Validators.required, Validators.min(0), Validators.max(20)]],
      commentaire: ['']
    });
  }

  ngOnInit() {
    this.loadGrades();
    this.loadStats();
  }

  loadGrades() {
    this.gradeService.getTpGrades(this.tpId).subscribe((data: any[]) => {
      this.grades = data;
    });
  }

  loadStats() {
    // Simuler les statistiques pour l'instant
    this.stats = {
      totalStudents: this.grades.length,
      averageGrade: this.grades.length > 0 ? 
        this.grades.reduce((sum: number, grade: any) => sum + grade.grade, 0) / this.grades.length : 0,
      highestGrade: this.grades.length > 0 ? Math.max(...this.grades.map((g: any) => g.grade)) : 0,
      lowestGrade: this.grades.length > 0 ? Math.min(...this.grades.map((g: any) => g.grade)) : 0
    };
  }

  onSubmit() {
    if (this.gradeForm.valid) {
      const gradeData = {
        registrationId: this.gradeForm.value.studentId || 1, // ID par défaut
        grade: this.gradeForm.value.note,
        comment: this.gradeForm.value.commentaire
      };

      this.gradeService.gradeTp({
        registrationId: gradeData.registrationId,
        grade: gradeData.grade,
        comment: gradeData.comment
      }).subscribe(() => {
        this.gradeForm.reset();
        this.loadGrades();
        this.loadStats();
      });
    }
  }

  downloadCSV() {
    // Simuler l'export CSV
    const csvContent = this.grades.map(grade => 
      `${grade.studentName || grade.studentId},${grade.grade},${grade.feedback || ''}`
    ).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `grades_tp_${this.tpId}.csv`;
    a.click();
  }

  downloadPDF() {
    // Simuler l'export PDF
    alert(`Export PDF pour le TP ${this.tpId} en cours...`);
    // Ici vous pourriez implémenter la vraie logique d'export PDF
  }
}
