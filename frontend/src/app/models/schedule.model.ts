import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TP } from './tp.model';

export interface TPSchedule {
  id: number;
  tpId: number;
  scheduledDate: Date;
  groupNumber: number;
  maxStudentsPerGroup: number;
  startTime: Date;
  endTime: Date;
  room: string;
  status: 'PLANNED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  createdAt: Date;
  updatedAt: Date;
  studentSchedules?: StudentSchedule[];
}

export interface StudentSchedule {
  id: number;
  studentId: number;
  studentName?: string;
  scheduleId: number;
  turnOrder: number;
  status: 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'MISSED';
  attended: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ScheduleTPDto {
  tpId: number;
  scheduledDate: Date;
  numberOfGroups: number;
  maxStudentsPerGroup: number;
  groups: GroupScheduleDto[];
}

export interface GroupScheduleDto {
  groupNumber: number;
  startTime: Date;
  endTime: Date;
  room: string;
}
