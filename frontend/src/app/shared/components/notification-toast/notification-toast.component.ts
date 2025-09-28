import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService, Notification } from '../../../core/services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notification-toast',


  template: `
    <div class="fixed top-4 right-4 z-50 space-y-2">
      <div 
        *ngFor="let notification of notifications"
        [class]="getNotificationClasses(notification)"
        class="max-w-sm w-full bg-white dark:bg-gray-800 shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden transform transition-all duration-300 ease-in-out">
        
        <div class="p-4">
          <div class="flex items-start">
            <div class="flex-shrink-0">
              <svg 
                *ngIf="notification.type === 'success'"
                class="h-6 w-6 text-green-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              
              <svg 
                *ngIf="notification.type === 'error'"
                class="h-6 w-6 text-red-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              
              <svg 
                *ngIf="notification.type === 'info'"
                class="h-6 w-6 text-blue-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              
              <svg 
                *ngIf="notification.type === 'warning'"
                class="h-6 w-6 text-yellow-400" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"></path>
              </svg>
            </div>
            
            <div class="ml-3 w-0 flex-1 pt-0.5">
              <p *ngIf="notification.title" class="text-sm font-medium text-gray-900 dark:text-white">
                {{ notification.title }}
              </p>
              <p class="text-sm text-gray-500 dark:text-gray-400">
                {{ notification.message }}
              </p>
            </div>
            
            <div class="ml-4 flex-shrink-0 flex">
              <button
                (click)="removeNotification(notification.id)"
                class="bg-white dark:bg-gray-800 rounded-md inline-flex text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                <span class="sr-only">Fermer</span>
                <svg class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: []
})
export class NotificationToastComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  private subscription: Subscription = new Subscription();

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.subscription = this.notificationService.notifications$.subscribe(
      notifications => this.notifications = notifications
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  removeNotification(id: string): void {
    this.notificationService.removeNotification(id);
  }

  getNotificationClasses(notification: Notification): string {
    const baseClasses = 'border-l-4';
    
    switch (notification.type) {
      case 'success':
        return `${baseClasses} border-green-400`;
      case 'error':
        return `${baseClasses} border-red-400`;
      case 'info':
        return `${baseClasses} border-blue-400`;
      case 'warning':
        return `${baseClasses} border-yellow-400`;
      default:
        return `${baseClasses} border-gray-400`;
    }
  }
}
