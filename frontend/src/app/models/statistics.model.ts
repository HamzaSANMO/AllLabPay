export interface GlobalStatistics {
  totalTPs: number;
  activeTPs: number;
  draftTPs: number;
  completedTPs: number;
  totalUsers: number;
  totalStudents: number;
  totalTeachers: number;
  activeUsers: number;
  totalRegistrations: number;
  paidRegistrations: number;
  pendingRegistrations: number;
  totalPayments: number;
  completedPayments: number;
  pendingPayments: number;
  totalAmount: number;
  totalGrades: number;
  averageGrade: number;
}

export interface FiliereStatistics {
  filiereId: number;
  totalTPs: number;
  activeTPs: number;
  totalRegistrations: number;
  paidRegistrations: number;
  totalPayments: number;
  totalAmount: number;
}

export interface DepartementStatistics {
  departementId: number;
  totalTPs: number;
  activeTPs: number;
  totalRegistrations: number;
  paidRegistrations: number;
  totalPayments: number;
  totalAmount: number;
}

export interface TeacherStatistics {
  teacherId: number;
  totalTPs: number;
  activeTPs: number;
  totalRegistrations: number;
  paidRegistrations: number;
  totalPayments: number;
  totalAmount: number;
  totalGrades: number;
  averageGrade: number;
}
