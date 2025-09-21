import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';

@Component({
  selector: 'app-audit-log',
  templateUrl: './audit-log.component.html',
})
export class AuditLogComponent implements OnInit {
  logs: any[] = [];
  filter = '';
  page = 0;

  constructor(private adminService: AdminService) {}

  ngOnInit() {
    this.loadLogs();
  }

  loadLogs() {
    this.adminService.listAuditLogs(this.filter, this.page, 10).subscribe(data => {
      this.logs = [...this.logs, ...data.content];
    });
  }

  onFilterChange() {
    this.logs = [];
    this.page = 0;
    this.loadLogs();
  }

  onScroll() {
    this.page++;
    this.loadLogs();
  }
}
