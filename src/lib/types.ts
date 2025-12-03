
export interface Student {
  id: string; // Unique system ID, e.g. S001
  name: string;
  enrollmentId: string; // School-provided enrollment ID
  division: string;
}

export interface AttendanceRecord {
  date: string; // YYYY-MM-DD
  studentId: string;
  status: 'Present' | 'Absent' | 'Tardy';
}

export interface User {
  name: string;
  email: string;
  password?: string;
}
