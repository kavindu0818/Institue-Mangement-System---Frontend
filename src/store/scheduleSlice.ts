import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ClassSession } from '../types';

const INITIAL_SCHEDULE: ClassSession[] = [
  {
    id: 'cls-1',
    title: 'Advanced Quantum Mechanics',
    subject: 'Physics',
    teacherName: 'Prof. Sarah Jenkins',
    teacherId: 'teach-1',
    batch: 'Batch Alpha (2026)',
    dayOfWeek: 'Monday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Hall B-201',
    status: 'Completed',
    color: 'border-l-indigo-600 bg-indigo-50/60 text-indigo-900'
  },
  {
    id: 'cls-2',
    title: 'Integral & Vector Calculus',
    subject: 'Pure Mathematics',
    teacherName: 'Dr. Alistair Vance',
    teacherId: 'inst-1',
    batch: 'Batch Alpha (2026)',
    dayOfWeek: 'Monday',
    startTime: '11:00 AM',
    endTime: '12:30 PM',
    room: 'Hall A-102',
    status: 'Completed',
    color: 'border-l-blue-600 bg-blue-50/60 text-blue-900'
  },
  {
    id: 'cls-3',
    title: 'Organic Chemistry Lab & Synthesis',
    subject: 'Chemistry',
    teacherName: 'Dr. Helen Brooks',
    teacherId: 'teach-2',
    batch: 'Batch Alpha (2026)',
    dayOfWeek: 'Tuesday',
    startTime: '09:30 AM',
    endTime: '11:30 AM',
    room: 'Science Lab 3',
    status: 'Live',
    color: 'border-l-emerald-600 bg-emerald-50/60 text-emerald-900'
  },
  {
    id: 'cls-4',
    title: 'Algorithms & Computational Logic',
    subject: 'Computer Science',
    teacherName: 'Eng. Dev Ray',
    teacherId: 'teach-3',
    batch: 'Batch Alpha (2026)',
    dayOfWeek: 'Wednesday',
    startTime: '10:00 AM',
    endTime: '11:30 AM',
    room: 'CS Lab 1',
    status: 'Upcoming',
    color: 'border-l-purple-600 bg-purple-50/60 text-purple-900'
  },
  {
    id: 'cls-5',
    title: 'Electromagnetism & Wave Optics',
    subject: 'Physics',
    teacherName: 'Prof. Sarah Jenkins',
    teacherId: 'teach-1',
    batch: 'Batch Alpha (2026)',
    dayOfWeek: 'Thursday',
    startTime: '09:00 AM',
    endTime: '10:30 AM',
    room: 'Hall B-201',
    status: 'Upcoming',
    color: 'border-l-indigo-600 bg-indigo-50/60 text-indigo-900'
  },
  {
    id: 'cls-6',
    title: 'Linear Algebra & Matrices',
    subject: 'Pure Mathematics',
    teacherName: 'Dr. Alistair Vance',
    teacherId: 'inst-1',
    batch: 'Batch Alpha (2026)',
    dayOfWeek: 'Friday',
    startTime: '02:00 PM',
    endTime: '03:30 PM',
    room: 'Hall A-102',
    status: 'Upcoming',
    color: 'border-l-blue-600 bg-blue-50/60 text-blue-900'
  }
];

interface ScheduleState {
  sessions: ClassSession[];
  selectedDay: string;
}

const initialState: ScheduleState = {
  sessions: INITIAL_SCHEDULE,
  selectedDay: 'All'
};

export const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    addSession: (state, action: PayloadAction<Omit<ClassSession, 'id'>>) => {
      state.sessions.push({
        ...action.payload,
        id: `cls-${Date.now()}`
      });
    },
    setSelectedDay: (state, action: PayloadAction<string>) => {
      state.selectedDay = action.payload;
    }
  }
});

export const { addSession, setSelectedDay } = scheduleSlice.actions;
export default scheduleSlice.reducer;
