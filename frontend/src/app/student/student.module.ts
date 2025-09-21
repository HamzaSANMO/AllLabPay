import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { PaymentsComponent } from './payments.component';
import { RegistrationsComponent } from './registrations.component';

@NgModule({
  declarations: [
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
    PaymentsComponent,
    RegistrationsComponent
  ]
})
export class StudentModule { }
