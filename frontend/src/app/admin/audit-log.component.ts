import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-audit-log',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './audit-log.component.html',
})
export class AuditLogComponent implements OnInit {
  logs: any[] = [];
  filter: string = '';
  page: number = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.adminService.listAuditLogs(this.filter, this.page, 10).subscribe({
      next: (data) => (this.logs = [...this.logs, ...data.content]),
      error: (err) => console.error(err),
    });
  }

  onFilterChange(value: string): void {
    this.filter = value;
    this.logs = [];
    this.page = 0;
    this.loadLogs();
  }

  onScroll(): void {
    this.page++;
    this.loadLogs();
  }
}
