import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Composants étudiants uniquement
import { StudentDashboardComponent } from './student-dashboard/student-dashboard.component';
import { StudentLoginComponent } from './student-login/student-login.component';
import { StudentMobileNavComponent } from './student-mobile-nav/student-mobile-nav.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { PaymentFlowComponent } from './payment-flow/payment-flow.component';
import { GradesComponent } from './grades/grades.component';
import { PaymentsComponent } from './payments.component';
import { RegistrationsComponent } from './registrations.component';
import { TpListComponent } from './tp-list/tp-list.component';



// Modules partagés
import { SharedModule } from './../shared/shared.module';

@NgModule({
  declarations: [
    StudentDashboardComponent,
    StudentLoginComponent,
    StudentMobileNavComponent,
    StudentProfileComponent,
    PaymentFlowComponent,
    GradesComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    SharedModule

  ],
  exports: [
    StudentDashboardComponent,


  ]
})
export class StudentModule { }
