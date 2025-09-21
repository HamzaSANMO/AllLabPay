import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { AuditLogComponent } from './audit-log.component';
import { UsersManagementComponent } from './users-management.component';

@NgModule({
  declarations: [
    AuditLogComponent,
    UsersManagementComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    AuditLogComponent,
    UsersManagementComponent
  ]
})
export class AdminModule { }
