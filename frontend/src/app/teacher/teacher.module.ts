import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { TpGradesComponent } from './tp-grades.component';
import { CreateTpComponent } from './create-tp/create-tp.component';
import { ScheduleTpComponent } from './schedule-tp/schedule-tp.component';

const routes: Routes = [
  { path: 'create-tp', component: CreateTpComponent },
  { path: 'schedule-tp/:tpId', component: ScheduleTpComponent }
];

@NgModule({
  declarations: [
    TpGradesComponent,
    CreateTpComponent,
    ScheduleTpComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCardModule,
    MatIconModule
  ],
  exports: [
    TpGradesComponent
  ]
})
export class TeacherModule { }
