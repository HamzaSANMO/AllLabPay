import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { TpListComponent } from './tp-list/tp-list.component';
import { PaymentFlowComponent } from './payment-flow/payment-flow.component';
import { GradesComponent } from './grades/grades.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { StudentMobileNavComponent } from './student-mobile-nav/student-mobile-nav.component';
import { PaymentsComponent } from './payments.component';
import { RegistrationsComponent } from './registrations.component';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentLoginComponent,
    TpListComponent,
    PaymentFlowComponent,
    GradesComponent,
    StudentProfileComponent,
    StudentMobileNavComponent,
    PaymentsComponent,
    RegistrationsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    StudentDashboardComponent,
    StudentLoginComponent,
    TpListComponent,
    PaymentFlowComponent,
    GradesComponent,
    StudentProfileComponent,
    StudentMobileNavComponent,
    PaymentsComponent,
    RegistrationsComponent
  ]
})
export class StudentModule { }
