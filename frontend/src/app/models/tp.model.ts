import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
export interface TP {
  id: number;
  title: string;
  description: string;
  filiere: string;
  niveau: string;
  maxStudents: number;
  currentStudents: number;
  status: 'DRAFT' | 'PUBLISHED' | 'ACTIVE' | 'INACTIVE' | 'COMPLETED';
  createdAt: Date;
  updatedAt: Date;
  teacherId: number;
  teacherName?: string;
  deadline?: Date;
  dueDate?: Date;
  requirements?: string;
  materials?: string[];
  prix?: number;
  capacite?: number;
  dateDebut?: Date;
  dateFin?: Date;
  maxPoints?: number;
  registrationFee?: number;
  filePath?: string;
}

export interface TPRegistration {
  id: number;
  tpId: number;
  studentId: number;
  studentName?: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  createdAt: Date;
  updatedAt: Date;
}

export interface TPGrade {
  id: number;
  tpId: number;
  studentId: number;
  studentName?: string;
  grade: number;
  feedback?: string;
  gradedAt: Date;
  gradedBy: number;
  gradedByName?: string;
}
