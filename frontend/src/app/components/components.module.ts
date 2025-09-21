import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TpListComponent } from './tp-list/tp-list.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';

@NgModule({
  declarations: [
    TpListComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    TpListComponent,
    NavBarComponent
  ]
})
export class ComponentsModule { }
