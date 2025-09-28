import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './../shared/shared.module';

// Composants réutilisables
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { TpListComponent } from './tp-list/tp-list.component';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports: [
   
  ]
})
export class ComponentsModule { }
