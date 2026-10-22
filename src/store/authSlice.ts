import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User, UserRole } from '../types';

export const DEMO_USERS: Record<UserRole, User> = {
  institute: {
    id: 'inst-1',
    name: 'Dr. Alistair Vance',
    email: 'admin@apex-institute.edu',
    role: 'institute',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    instituteName: 'Apex Tuition & Science Institute',
    phone: '+1 (555) 019-2834',
    department: 'Central Administration'
  },
  teacher: {
    id: 'teach-1',
    name: 'Prof. Sarah Jenkins',
    email: 'sarah.jenkins@apex-institute.edu',
    role: 'teacher',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    department: 'Department of Physics & Mathematics',
    phone: '+1 (555) 482-9012'
  },
  student: {
    id: 'stu-1',
    name: 'Alex Morgan',
    email: 'alex.morgan@student.apex.edu',
    role: 'student',
    avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=150&auto=format&fit=crop&q=80',
    studentId: 'APEX-2026-4412',
    grade: 'Grade 12 - Advanced STEM',
    phone: '+1 (555) 892-1209'
  },
  parent: {
    id: 'par-1',
    name: 'David Morgan',
    email: 'david.morgan@globaltech.com',
    role: 'parent',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    parentOf: ['stu-1'],
    phone: '+1 (555) 902-3318'
  }
};

interface AuthState {
  currentUser: User;
  isAuthenticated: boolean;
  selectedChildId?: string;
  activeLanguage: string;
}

const initialState: AuthState = {
  currentUser: DEMO_USERS.institute,
  isAuthenticated: false,
  selectedChildId: 'stu-1',
  activeLanguage: 'English'
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    switchRole: (state, action: PayloadAction<UserRole>) => {
      const role = action.payload;
      state.currentUser = DEMO_USERS[role];
      state.isAuthenticated = true;
    },
    loginAs: (state, action: PayloadAction<User>) => {
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.isAuthenticated = false;
    },
    setSelectedChild: (state, action: PayloadAction<string>) => {
      state.selectedChildId = action.payload;
    },
    setLanguage: (state, action: PayloadAction<string>) => {
      state.activeLanguage = action.payload;
    }
  }
});

export const { switchRole, loginAs, logout, setSelectedChild, setLanguage } = authSlice.actions;
export default authSlice.reducer;
