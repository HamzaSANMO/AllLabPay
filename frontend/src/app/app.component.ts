import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { BottomNavigationComponent } from './components/bottom-navigation/bottom-navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, BottomNavigationComponent],
  template: `
    <div class="min-h-screen bg-gray-50 pb-20">
      <router-outlet></router-outlet>
    </div>
    <app-bottom-navigation></app-bottom-navigation>
  `,
  styles: []
})
export class AppComponent {
  title = 'LabPay';
}