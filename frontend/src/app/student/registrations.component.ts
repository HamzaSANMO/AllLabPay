import { Component, OnInit } from '@angular/core';
import { RegistrationService } from '../services/registration.service';

@Component({
  selector: 'app-registrations',
  templateUrl: './registrations.component.html',
})
export class RegistrationsComponent implements OnInit {
  registrations: any[] = [];

  constructor(private registrationService: RegistrationService) {}

  ngOnInit() {
    this.loadRegistrations();
  }

  loadRegistrations(): void {
    this.registrationService.getUserRegistrations().subscribe((data: any[]) => {
      this.registrations = data;
    });
  }
}
