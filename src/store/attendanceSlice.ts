import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AttendanceRecord, Student } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  {
    id: 'stu-1',
    name: 'Alex Morgan',
    rollNumber: 'APEX-101',
    grade: 'Grade 12 - Advanced STEM',
    batch: 'Batch Alpha (2026)',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    email: 'alex.morgan@student.apex.edu',
    parentName: 'David Morgan',
    parentPhone: '+1 (555) 902-3318',
    attendanceRate: 94.2,
    overallGpa: 3.88,
    feeStatus: 'Paid'
  },
  {
    id: 'stu-2',
    name: 'Sophia Chen',
    rollNumber: 'APEX-102',
    grade: 'Grade 12 - Advanced STEM',
    batch: 'Batch Alpha (2026)',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&auto=format&fit=crop&q=80',
    email: 'sophia.chen@student.apex.edu',
    parentName: 'Michael Chen',
    parentPhone: '+1 (555) 304-8921',
    attendanceRate: 98.0,
    overallGpa: 3.95,
    feeStatus: 'Paid'
  },
  {
    id: 'stu-3',
    name: 'Marcus Williams',
    rollNumber: 'APEX-103',
    grade: 'Grade 12 - Advanced STEM',
    batch: 'Batch Alpha (2026)',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    email: 'marcus.w@student.apex.edu',
    parentName: 'Karen Williams',
    parentPhone: '+1 (555) 441-2983',
    attendanceRate: 88.5,
    overallGpa: 3.62,
    feeStatus: 'Pending'
  },
  {
    id: 'stu-4',
    name: 'Elena Rostova',
    rollNumber: 'APEX-104',
    grade: 'Grade 12 - Advanced STEM',
    batch: 'Batch Alpha (2026)',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    email: 'elena.rostova@student.apex.edu',
    parentName: 'Dmitri Rostov',
    parentPhone: '+1 (555) 789-0123',
    attendanceRate: 91.0,
    overallGpa: 3.75,
    feeStatus: 'Paid'
  },
  {
    id: 'stu-5',
    name: 'Zackary Taylor',
    rollNumber: 'APEX-105',
    grade: 'Grade 12 - Advanced STEM',
    batch: 'Batch Alpha (2026)',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    email: 'zack.t@student.apex.edu',
    parentName: 'Robert Taylor',
    parentPhone: '+1 (555) 912-4451',
    attendanceRate: 82.0,
    overallGpa: 3.40,
    feeStatus: 'Overdue'
  }
];

const INITIAL_RECORDS: AttendanceRecord[] = [
  { id: 'att-1', studentId: 'stu-1', studentName: 'Alex Morgan', batch: 'Batch Alpha (2026)', subject: 'Quantum Physics', date: '2026-10-22', status: 'Present', markedBy: 'Prof. Sarah Jenkins', time: '09:02 AM' },
  { id: 'att-2', studentId: 'stu-2', studentName: 'Sophia Chen', batch: 'Batch Alpha (2026)', subject: 'Quantum Physics', date: '2026-10-22', status: 'Present', markedBy: 'Prof. Sarah Jenkins', time: '08:58 AM' },
  { id: 'att-3', studentId: 'stu-3', studentName: 'Marcus Williams', batch: 'Batch Alpha (2026)', subject: 'Quantum Physics', date: '2026-10-22', status: 'Late', markedBy: 'Prof. Sarah Jenkins', time: '09:18 AM' },
  { id: 'att-4', studentId: 'stu-4', studentName: 'Elena Rostova', batch: 'Batch Alpha (2026)', subject: 'Quantum Physics', date: '2026-10-22', status: 'Present', markedBy: 'Prof. Sarah Jenkins', time: '09:00 AM' },
  { id: 'att-5', studentId: 'stu-5', studentName: 'Zackary Taylor', batch: 'Batch Alpha (2026)', subject: 'Quantum Physics', date: '2026-10-22', status: 'Absent', markedBy: 'Prof. Sarah Jenkins' },

  { id: 'att-6', studentId: 'stu-1', studentName: 'Alex Morgan', batch: 'Batch Alpha (2026)', subject: 'Pure Mathematics', date: '2026-10-21', status: 'Present', markedBy: 'Dr. Alistair Vance', time: '11:00 AM' },
  { id: 'att-7', studentId: 'stu-1', studentName: 'Alex Morgan', batch: 'Batch Alpha (2026)', subject: 'Organic Chemistry', date: '2026-10-20', status: 'Present', markedBy: 'Dr. Helen Brooks', time: '02:00 PM' },
  { id: 'att-8', studentId: 'stu-1', studentName: 'Alex Morgan', batch: 'Batch Alpha (2026)', subject: 'Computer Science', date: '2026-10-19', status: 'Present', markedBy: 'Eng. Dev Ray', time: '10:00 AM' },
  { id: 'att-9', studentId: 'stu-1', studentName: 'Alex Morgan', batch: 'Batch Alpha (2026)', subject: 'Quantum Physics', date: '2026-10-18', status: 'Late', markedBy: 'Prof. Sarah Jenkins', time: '09:20 AM' },
  { id: 'att-10', studentId: 'stu-1', studentName: 'Alex Morgan', batch: 'Batch Alpha (2026)', subject: 'Pure Mathematics', date: '2026-10-17', status: 'Present', markedBy: 'Dr. Alistair Vance', time: '11:01 AM' },
];

interface AttendanceState {
  students: Student[];
  records: AttendanceRecord[];
  selectedDate: string;
  selectedBatch: string;
}

const initialState: AttendanceState = {
  students: INITIAL_STUDENTS,
  records: INITIAL_RECORDS,
  selectedDate: '2026-10-22',
  selectedBatch: 'Batch Alpha (2026)'
};

export const attendanceSlice = createSlice({
  name: 'attendance',
  initialState,
  reducers: {
    setAttendanceStatus: (
      state,
      action: PayloadAction<{ studentId: string; date: string; subject: string; status: 'Present' | 'Absent' | 'Late' | 'Excused' }>
    ) => {
      const { studentId, date, subject, status } = action.payload;
      const existingIndex = state.records.findIndex(
        r => r.studentId === studentId && r.date === date && r.subject === subject
      );

      const student = state.students.find(s => s.id === studentId);
      const studentName = student ? student.name : 'Student';

      if (existingIndex >= 0) {
        state.records[existingIndex].status = status;
      } else {
        state.records.unshift({
          id: `att-${Date.now()}-${studentId}`,
          studentId,
          studentName,
          batch: state.selectedBatch,
          subject,
          date,
          status,
          markedBy: 'Prof. Sarah Jenkins',
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        });
      }
    },
    markAllPresent: (state, action: PayloadAction<{ subject: string; date: string }>) => {
      const { subject, date } = action.payload;
      state.students.forEach(student => {
        const existing = state.records.find(
          r => r.studentId === student.id && r.date === date && r.subject === subject
        );
        if (existing) {
          existing.status = 'Present';
        } else {
          state.records.unshift({
            id: `att-${Date.now()}-${student.id}`,
            studentId: student.id,
            studentName: student.name,
            batch: student.batch,
            subject,
            date,
            status: 'Present',
            markedBy: 'Manual Batch Attendance',
            time: '09:00 AM'
          });
        }
      });
    },
    setSelectedDate: (state, action: PayloadAction<string>) => {
      state.selectedDate = action.payload;
    },
    setSelectedBatch: (state, action: PayloadAction<string>) => {
      state.selectedBatch = action.payload;
    }
  }
});

export const { setAttendanceStatus, markAllPresent, setSelectedDate, setSelectedBatch } = attendanceSlice.actions;
export default attendanceSlice.reducer;
