import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

// Composants partagés
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { NotificationToastComponent } from './components/notification-toast/notification-toast.component';
import { TpCardComponent } from './components/tp-card/tp-card.component';
import { ResponsiveTableComponent } from './components/responsive-table/responsive-table.component';
import { MobileNavComponent } from './components/mobile-nav/mobile-nav.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

// Directives
import { ClickOutsideDirective } from './directives/click-outside.directive';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';
import { SortPipe } from './pipes/sort.pipe';

@NgModule({
  declarations: [
    LoadingSpinnerComponent,
    NotificationToastComponent,
    TpCardComponent,
    ResponsiveTableComponent,
    MobileNavComponent,
    SidebarComponent,
    ClickOutsideDirective,
    FilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    LoadingSpinnerComponent,
    NotificationToastComponent,
    TpCardComponent,
    ResponsiveTableComponent,
    MobileNavComponent,
    SidebarComponent,
    ClickOutsideDirective,
    FilterPipe,
    SortPipe
  ]
})
export class SharedModule { }
