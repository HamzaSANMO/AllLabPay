import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ScheduleService } from '@app/services/schedule.service';
import { TpService } from '@app/services/tp.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TP } from '@app/models/tp.model';
import { ScheduleTPDto } from '@app/models/schedule.model';

@Component({
  selector: 'app-schedule-tp',
  templateUrl: './schedule-tp.component.html',
  styleUrls: ['./schedule-tp.component.css']
})
export class ScheduleTpComponent implements OnInit {
  scheduleForm: FormGroup;
  tp: TP | null = null;
  tpId: number = 0;
  isLoading = false;
  rooms = ['Salle 101', 'Salle 102', 'Salle 103', 'Salle 104', 'Salle 105'];

  constructor(
    private fb: FormBuilder,
    private scheduleService: ScheduleService,
    private tpService: TpService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {
    this.scheduleForm = this.fb.group({
      tpId: ['', Validators.required],
      scheduledDate: ['', Validators.required],
      numberOfGroups: [1, [Validators.required, Validators.min(1)]],
      maxStudentsPerGroup: [10, [Validators.required, Validators.min(1)]],
      groups: this.fb.array([])
    });
  }

  ngOnInit(): void {
    this.tpId = Number(this.route.snapshot.paramMap.get('tpId'));
    if (this.tpId) {
      this.loadTP();
      this.scheduleForm.patchValue({ tpId: this.tpId });
      this.onNumberOfGroupsChange();
    }
  }

  loadTP(): void {
    this.tpService.getTpById(this.tpId).subscribe({
      next: (tp) => {
        this.tp = tp;
        this.scheduleForm.patchValue({
          maxStudentsPerGroup: Math.ceil(tp.currentStudents / 2)
        });
      },
      error: (error) => {
        console.error('Erreur lors du chargement du TP:', error);
        this.snackBar.open('Erreur lors du chargement du TP', 'Fermer', { duration: 3000 });
      }
    });
  }

  get groupsArray(): FormArray {
    return this.scheduleForm.get('groups') as FormArray;
  }

  onNumberOfGroupsChange(): void {
    const numberOfGroups = this.scheduleForm.get('numberOfGroups')?.value || 1;
    const groupsArray = this.scheduleForm.get('groups') as FormArray;
    
    // Vider le tableau existant
    while (groupsArray.length !== 0) {
      groupsArray.removeAt(0);
    }
    
    // Ajouter les nouveaux groupes
    for (let i = 0; i < numberOfGroups; i++) {
      const group = this.fb.group({
        groupNumber: [i + 1, Validators.required],
        startTime: ['', Validators.required],
        endTime: ['', Validators.required],
        room: ['', Validators.required]
      });
      groupsArray.push(group);
    }
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      this.isLoading = true;
      const scheduleData: ScheduleTPDto = this.scheduleForm.value;
      
      // Convertir les dates
      if (scheduleData.scheduledDate) {
        scheduleData.scheduledDate = new Date(scheduleData.scheduledDate);
      }
      
      // Convertir les heures pour chaque groupe
      scheduleData.groups.forEach((group: any) => {
        if (group.startTime) {
          group.startTime = new Date(group.startTime);
        }
        if (group.endTime) {
          group.endTime = new Date(group.endTime);
        }
      });
      
      this.scheduleService.scheduleTP(scheduleData).subscribe({
        next: (schedules) => {
          this.snackBar.open(`${schedules.length} créneaux programmés avec succès!`, 'Fermer', { duration: 3000 });
          this.router.navigate(['/teacher/dashboard']);
        },
        error: (error) => {
          console.error('Erreur lors de la programmation:', error);
          this.snackBar.open('Erreur lors de la programmation', 'Fermer', { duration: 3000 });
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/teacher/dashboard']);
  }

  addGroup(): void {
    const numberOfGroups = this.scheduleForm.get('numberOfGroups')?.value || 1;
    this.scheduleForm.patchValue({ numberOfGroups: numberOfGroups + 1 });
    this.onNumberOfGroupsChange();
  }

  removeGroup(): void {
    const numberOfGroups = this.scheduleForm.get('numberOfGroups')?.value || 1;
    if (numberOfGroups > 1) {
      this.scheduleForm.patchValue({ numberOfGroups: numberOfGroups - 1 });
      this.onNumberOfGroupsChange();
    }
  }
}
