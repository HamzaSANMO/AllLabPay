import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
  styleUrls: []
})
export class RegistrationsComponent implements OnInit {
  registrations: any[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit(): void {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.registrationService.getUserRegistrations().subscribe({
      next: (data: any[]) => {
        this.registrations = data;
      },
      error: (err) => {
        console.error('Erreur lors du chargement des inscriptions:', err);
      }
    });
  }
}
