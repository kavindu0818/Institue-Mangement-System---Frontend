import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Exam, ExamResult } from '../types';

const INITIAL_EXAMS: Exam[] = [
  {
    id: 'exam-1',
    title: 'Mid-Term Quantum Mechanics & Waves',
    subject: 'Quantum Physics',
    batch: 'Batch Alpha (2026)',
    date: '2026-11-05',
    startTime: '09:00 AM',
    durationMinutes: 120,
    totalMarks: 100,
    passingMarks: 40,
    room: 'Hall B-201',
    status: 'Upcoming'
  },
  {
    id: 'exam-2',
    title: 'Differential Calculus & Vectors',
    subject: 'Pure Mathematics',
    batch: 'Batch Alpha (2026)',
    date: '2026-11-08',
    startTime: '10:00 AM',
    durationMinutes: 90,
    totalMarks: 100,
    passingMarks: 40,
    room: 'Hall A-102',
    status: 'Upcoming'
  },
  {
    id: 'exam-3',
    title: 'Organic Reaction Mechanisms & Kinetics',
    subject: 'Chemistry',
    batch: 'Batch Alpha (2026)',
    date: '2026-10-15',
    startTime: '01:30 PM',
    durationMinutes: 120,
    totalMarks: 100,
    passingMarks: 40,
    room: 'Lab 4',
    status: 'Graded'
  },
  {
    id: 'exam-4',
    title: 'Data Structures & Algorithmic Logic',
    subject: 'Computer Science',
    batch: 'Batch Alpha (2026)',
    date: '2026-10-10',
    startTime: '10:00 AM',
    durationMinutes: 90,
    totalMarks: 50,
    passingMarks: 20,
    room: 'CS Lab 1',
    status: 'Graded'
  }
];

const INITIAL_RESULTS: ExamResult[] = [
  {
    id: 'res-1',
    examId: 'exam-3',
    examTitle: 'Organic Reaction Mechanisms & Kinetics',
    studentId: 'stu-1',
    studentName: 'Alex Morgan',
    subject: 'Chemistry',
    marksObtained: 94,
    totalMarks: 100,
    grade: 'A+',
    percentage: 94,
    rank: 2,
    feedback: 'Outstanding understanding of stereo-isomerism and electrophilic aromatic substitution.',
    date: '2026-10-18'
  },
  {
    id: 'res-2',
    examId: 'exam-3',
    examTitle: 'Organic Reaction Mechanisms & Kinetics',
    studentId: 'stu-2',
    studentName: 'Sophia Chen',
    subject: 'Chemistry',
    marksObtained: 98,
    totalMarks: 100,
    grade: 'A+',
    percentage: 98,
    rank: 1,
    feedback: 'Flawless work across synthesis problems and reaction mechanisms.',
    date: '2026-10-18'
  },
  {
    id: 'res-3',
    examId: 'exam-3',
    examTitle: 'Organic Reaction Mechanisms & Kinetics',
    studentId: 'stu-3',
    studentName: 'Marcus Williams',
    subject: 'Chemistry',
    marksObtained: 81,
    totalMarks: 100,
    grade: 'A',
    percentage: 81,
    rank: 4,
    feedback: 'Good work, review elimination vs substitution rates.',
    date: '2026-10-18'
  },
  {
    id: 'res-4',
    examId: 'exam-4',
    examTitle: 'Data Structures & Algorithmic Logic',
    studentId: 'stu-1',
    studentName: 'Alex Morgan',
    subject: 'Computer Science',
    marksObtained: 48,
    totalMarks: 50,
    grade: 'A+',
    percentage: 96,
    rank: 1,
    feedback: 'Excellent binary tree traversal and graph search implementation.',
    date: '2026-10-12'
  }
];

interface ExamsState {
  exams: Exam[];
  results: ExamResult[];
  filterSubject: string;
}

const initialState: ExamsState = {
  exams: INITIAL_EXAMS,
  results: INITIAL_RESULTS,
  filterSubject: 'All'
};

export const examsSlice = createSlice({
  name: 'exams',
  initialState,
  reducers: {
    addExam: (state, action: PayloadAction<Omit<Exam, 'id'>>) => {
      const newExam: Exam = {
        ...action.payload,
        id: `exam-${Date.now()}`
      };
      state.exams.unshift(newExam);
    },
    updateExamMarks: (state, action: PayloadAction<ExamResult>) => {
      const index = state.results.findIndex(
        r => r.examId === action.payload.examId && r.studentId === action.payload.studentId
      );
      if (index >= 0) {
        state.results[index] = action.payload;
      } else {
        state.results.push(action.payload);
      }
    },
    setFilterSubject: (state, action: PayloadAction<string>) => {
      state.filterSubject = action.payload;
    }
  }
});

export const { addExam, updateExamMarks, setFilterSubject } = examsSlice.actions;
export default examsSlice.reducer;
