import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TpService } from '@app/services/tp.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-create-tp',
  templateUrl: './create-tp.component.html',
  styleUrls: ['./create-tp.component.css']
})
export class CreateTpComponent implements OnInit {
  tpForm: FormGroup;
  isLoading = false;
  filieres: any[] = [];
  niveaux: any[] = [];
  matieres: any[] = [];

  constructor(
    private fb: FormBuilder,
    private tpService: TpService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {
    this.tpForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      matiereId: ['', Validators.required],
      prix: [0, [Validators.required, Validators.min(0)]],
      capacite: [1, [Validators.required, Validators.min(1)]],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      dueDate: ['', Validators.required],
      maxPoints: [20, [Validators.required, Validators.min(0)]],
      registrationFee: [0, [Validators.required, Validators.min(0)]],
      requirements: [''],
      materials: ['']
    });
  }

  ngOnInit(): void {
    // TODO: Charger les filières, niveaux et matières depuis le service
    this.loadFormData();
  }

  loadFormData(): void {
    // Simuler le chargement des données
    this.filieres = [
      { id: 1, nom: 'Informatique', code: 'INFO' },
      { id: 2, nom: 'Mathématiques', code: 'MATH' },
      { id: 3, nom: 'Physique', code: 'PHYS' }
    ];
    
    this.niveaux = [
      { id: 1, nom: 'Licence 1', code: 'L1' },
      { id: 2, nom: 'Licence 2', code: 'L2' },
      { id: 3, nom: 'Licence 3', code: 'L3' }
    ];
    
    this.matieres = [
      { id: 1, nom: 'Programmation Java', filiere: 'INFO', niveau: 'L2' },
      { id: 2, nom: 'Algèbre linéaire', filiere: 'MATH', niveau: 'L1' },
      { id: 3, nom: 'Mécanique quantique', filiere: 'PHYS', niveau: 'L3' }
    ];
  }

  onSubmit(): void {
    if (this.tpForm.valid) {
      this.isLoading = true;
      const tpData = this.tpForm.value;
      
      // Convertir les dates
      if (tpData.dateDebut) {
        tpData.dateDebut = new Date(tpData.dateDebut).toISOString().split('T')[0];
      }
      if (tpData.dateFin) {
        tpData.dateFin = new Date(tpData.dateFin).toISOString().split('T')[0];
      }
      if (tpData.dueDate) {
        tpData.dueDate = new Date(tpData.dueDate).toISOString().split('T')[0];
      }
      
      // Convertir les matériaux en tableau
      if (tpData.materials) {
        tpData.materials = tpData.materials.split(',').map((m: string) => m.trim()).filter((m: string) => m);
      }
      
      this.tpService.createTP(tpData).subscribe({
        next: (tp) => {
          this.snackBar.open('TP créé avec succès!', 'Fermer', { duration: 3000 });
          this.router.navigate(['/teacher/dashboard']);
        },
        error: (error) => {
          console.error('Erreur lors de la création du TP:', error);
          this.snackBar.open('Erreur lors de la création du TP', 'Fermer', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/teacher/dashboard']);
  }
}
