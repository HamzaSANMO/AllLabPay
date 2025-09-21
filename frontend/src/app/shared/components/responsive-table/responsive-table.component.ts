import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface TableColumn {
  key: string;
  label: string;
  sortable?: boolean;
  type?: 'text' | 'number' | 'date' | 'status' | 'action';
  width?: string;
}

export interface TableAction {
  label: string;
  icon: string;
  action: string;
  color?: string;
  disabled?: boolean | ((row: any) => boolean);
}

@Component({
  selector: 'app-responsive-table',


  template: `
    <div class="overflow-hidden">
      <!-- Desktop Table -->
      <div class="hidden md:block overflow-x-auto">
        <table class="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
          <thead class="bg-gray-50 dark:bg-gray-800">
            <tr>
              <th 
                *ngFor="let column of columns"
                [class]="getColumnClasses(column)"
                class="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                
                <div class="flex items-center space-x-1">
                  <span>{{ column.label }}</span>
                  <button 
                    *ngIf="column.sortable"
                    (click)="onSort.emit(column.key)"
                    class="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4"></path>
                    </svg>
                  </button>
                </div>
              </th>
            </tr>
          </thead>
          <tbody class="bg-white dark:bg-gray-900 divide-y divide-gray-200 dark:divide-gray-700">
            <tr 
              *ngFor="let row of data; trackBy: trackByFn"
              class="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200">
              
              <td 
                *ngFor="let column of columns"
                [class]="getCellClasses(column)"
                class="px-6 py-4 whitespace-nowrap text-sm">
                
                <ng-container [ngSwitch]="column.type">
                  <span *ngSwitchCase="'text'">{{ row[column.key] }}</span>
                  
                  <span *ngSwitchCase="'number'" class="font-medium">
                    {{ row[column.key] | number }}
                  </span>
                  
                  <span *ngSwitchCase="'date'" class="font-medium">
                    {{ row[column.key] | date:'dd/MM/yyyy' }}
                  </span>
                  
                  <span *ngSwitchCase="'status'" 
                        [class]="getStatusClasses(row[column.key])"
                        class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                    {{ getStatusText(row[column.key]) }}
                  </span>
                  
                  <div *ngSwitchCase="'action'" class="flex space-x-2">
                    <button 
                      *ngFor="let action of getRowActions(row)"
                      (click)="onAction.emit({ action: action.action, row: row })"
                      [disabled]="action.disabled"
                      [class]="getActionClasses(action)"
                      class="px-3 py-1 text-xs font-medium rounded-md transition-colors duration-200">
                      <svg class="w-4 h-4 inline mr-1" [innerHTML]="action.icon"></svg>
                      {{ action.label }}
                    </button>
                  </div>
                  
                  <span *ngSwitchDefault>{{ row[column.key] }}</span>
                </ng-container>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Mobile Cards -->
      <div class="md:hidden space-y-4">
        <div 
          *ngFor="let row of data; trackBy: trackByFn"
          class="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
          
          <div class="space-y-3">
            <ng-container *ngFor="let column of columns">
              <div *ngIf="column.type !== 'action'" class="flex justify-between items-start">
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  {{ column.label }}:
                </span>
                <div class="text-right">
                  <ng-container [ngSwitch]="column.type">
                    <span *ngSwitchCase="'text'">{{ row[column.key] }}</span>
                    
                    <span *ngSwitchCase="'number'" class="font-medium">
                      {{ row[column.key] | number }}
                    </span>
                    
                    <span *ngSwitchCase="'date'" class="font-medium">
                      {{ row[column.key] | date:'dd/MM/yyyy' }}
                    </span>
                    
                    <span *ngSwitchCase="'status'" 
                          [class]="getStatusClasses(row[column.key])"
                          class="inline-flex px-2 py-1 text-xs font-medium rounded-full">
                      {{ getStatusText(row[column.key]) }}
                    </span>
                    
                    <span *ngSwitchDefault>{{ row[column.key] }}</span>
                  </ng-container>
                </div>
              </div>
            </ng-container>
          </div>

          <!-- Actions for mobile -->
          <div *ngIf="getRowActions(row).length > 0" class="pt-3 border-t border-gray-200 dark:border-gray-700">
            <div class="flex flex-wrap gap-2">
              <button 
                *ngFor="let action of getRowActions(row)"
                (click)="onAction.emit({ action: action.action, row: row })"
                [disabled]="action.disabled"
                [class]="getActionClasses(action)"
                class="flex-1 px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200">
                <svg class="w-4 h-4 inline mr-2" [innerHTML]="action.icon"></svg>
                {{ action.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div 
        *ngIf="data.length === 0"
        class="text-center py-12">
        <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
        </svg>
        <h3 class="mt-2 text-sm font-medium text-gray-900 dark:text-white">Aucune donnée</h3>
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {{ emptyMessage || 'Aucun élément à afficher pour le moment.' }}
        </p>
      </div>
    </div>
  `,
  styles: []
})
export class ResponsiveTableComponent {
  @Input() columns: TableColumn[] = [];
  @Input() data: any[] = [];
  @Input() actions: TableAction[] = [];
  @Input() emptyMessage: string = '';
  @Output() onSort = new EventEmitter<string>();
  @Output() onAction = new EventEmitter<{ action: string; row: any }>();

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  getColumnClasses(column: TableColumn): string {
    let classes = 'px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider';
    
    if (column.width) {
      classes += ` ${column.width}`;
    }
    
    return classes;
  }

  getCellClasses(column: TableColumn): string {
    let classes = 'px-6 py-4 whitespace-nowrap text-sm';
    
    if (column.type === 'action') {
      classes += ' text-right';
    }
    
    return classes;
  }

  getStatusClasses(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'actif':
        return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
      case 'inactive':
      case 'inactif':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
      case 'completed':
      case 'terminé':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
      case 'pending':
      case 'en attente':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-200';
    }
  }

  getStatusText(status: string): string {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'actif':
        return 'Actif';
      case 'inactive':
      case 'inactif':
        return 'Inactif';
      case 'completed':
      case 'terminé':
        return 'Terminé';
      case 'pending':
      case 'en attente':
        return 'En attente';
      default:
        return status || 'Inconnu';
    }
  }

  getRowActions(row: any): TableAction[] {
    return this.actions.map(action => ({
      ...action,
      disabled: typeof action.disabled === 'function' ? action.disabled(row) : action.disabled
    }));
  }

  getActionClasses(action: TableAction): string {
    let classes = 'inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-white focus:outline-none focus:ring-2 focus:ring-offset-2 transition-colors duration-200';
    
    if (action.disabled) {
      classes += ' opacity-50 cursor-not-allowed';
      return classes;
    }

    switch (action.color) {
      case 'primary':
        classes += ' bg-blue-600 hover:bg-blue-700 focus:ring-blue-500';
        break;
      case 'success':
        classes += ' bg-green-600 hover:bg-green-700 focus:ring-green-500';
        break;
      case 'warning':
        classes += ' bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500';
        break;
      case 'danger':
        classes += ' bg-red-600 hover:bg-red-700 focus:ring-red-500';
        break;
      default:
        classes += ' bg-gray-600 hover:bg-gray-700 focus:ring-gray-500';
    }
    
    return classes;
  }
}
