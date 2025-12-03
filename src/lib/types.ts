
export interface Student {
  id: string;
  name: string;
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
