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

import { SharedModule } from './../shared/shared.module';

import { TpGradesComponent } from './tp-grades.component';
import { CreateTpComponent } from './create-tp/create-tp.component';
import { ScheduleTpComponent } from './schedule-tp/schedule-tp.component';
import { TpManagementComponent } from './tp-management/tp-management.component';
import { PaymentTrackingComponent } from './payment-tracking/payment-tracking.component';
import { ResultsPublicationComponent } from './results-publication/results-publication.component';
import { TeacherMobileNavComponent } from './teacher-mobile-nav/teacher-mobile-nav.component';
import { TeacherProfileComponent } from './teacher-profile/teacher-profile.component';

const routes: Routes = [
  { path: 'tps', component: TpManagementComponent },
  { path: 'tps/create', component: CreateTpComponent },
  { path: 'tps/:tpId/schedule', component: ScheduleTpComponent },
  { path: 'tps/:tpId/grades', component: TpGradesComponent },
  { path: 'payments', component: PaymentTrackingComponent },
  { path: 'results', component: ResultsPublicationComponent },
  { path: 'profile', component: TeacherProfileComponent },
  { path: '', redirectTo: 'tps', pathMatch: 'full' }
];

@NgModule({
  declarations: [
    TpGradesComponent,
    CreateTpComponent,
    ScheduleTpComponent,
    TpManagementComponent,
    PaymentTrackingComponent,
    ResultsPublicationComponent,
    TeacherMobileNavComponent,
    TeacherProfileComponent
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
    TpGradesComponent,
    CreateTpComponent,
    ScheduleTpComponent,
    TpManagementComponent,
    PaymentTrackingComponent,
    ResultsPublicationComponent,
    TeacherMobileNavComponent,
    TeacherProfileComponent
  ]
})
export class TeacherModule { }
