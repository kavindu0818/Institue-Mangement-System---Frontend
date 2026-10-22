import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StaffMember, GradingScaleItem, AcademicYearConfig, SmsTemplate, AuditLogItem } from '../types';

const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-1',
    name: 'Dr. Alistair Vance',
    role: 'Institute Director & Lead Math Faculty',
    department: 'Mathematics & Administration',
    email: 'admin@apex-institute.edu',
    phone: '+1 (555) 019-2834',
    status: 'Active',
    permissions: ['All Access', 'Billing', 'Staff Management', 'Academic Overhaul']
  },
  {
    id: 'staff-2',
    name: 'Prof. Sarah Jenkins',
    role: 'Senior Professor of Physics',
    department: 'Physics',
    email: 'sarah.jenkins@apex-institute.edu',
    phone: '+1 (555) 482-9012',
    status: 'Active',
    permissions: ['Mark Attendance', 'Create Exams', 'Grade Students', 'Upload Materials']
  },
  {
    id: 'staff-3',
    name: 'Dr. Helen Brooks',
    role: 'Head of Chemistry Department',
    department: 'Chemistry',
    email: 'helen.brooks@apex-institute.edu',
    phone: '+1 (555) 391-4491',
    status: 'Active',
    permissions: ['Mark Attendance', 'Create Exams', 'Grade Students', 'Upload Materials']
  },
  {
    id: 'staff-4',
    name: 'Eng. Dev Ray',
    role: 'Lecturer in Computer Science & AI',
    department: 'Computing',
    email: 'dev.ray@apex-institute.edu',
    phone: '+1 (555) 881-2299',
    status: 'Active',
    permissions: ['Mark Attendance', 'Upload Materials', 'Grade Students']
  },
  {
    id: 'staff-5',
    name: 'Claire Beauchamp',
    role: 'Registrar & Student Affairs Coordinator',
    department: 'Administration',
    email: 'claire.b@apex-institute.edu',
    phone: '+1 (555) 773-1920',
    status: 'Active',
    permissions: ['Student Admissions', 'Fee Collection', 'SMS Broadcasts']
  }
];

const INITIAL_GRADING_SCALE: GradingScaleItem[] = [
  { id: 'gr-1', grade: 'A+', minPercentage: 90, maxPercentage: 100, gradePoint: 4.0, description: 'Outstanding Academic Mastery' },
  { id: 'gr-2', grade: 'A', minPercentage: 80, maxPercentage: 89, gradePoint: 3.7, description: 'Excellent Comprehension' },
  { id: 'gr-3', grade: 'B+', minPercentage: 75, maxPercentage: 79, gradePoint: 3.3, description: 'Very Good Performance' },
  { id: 'gr-4', grade: 'B', minPercentage: 70, maxPercentage: 74, gradePoint: 3.0, description: 'Good Understanding' },
  { id: 'gr-5', grade: 'C', minPercentage: 60, maxPercentage: 69, gradePoint: 2.0, description: 'Satisfactory / Competent' },
  { id: 'gr-6', grade: 'F', minPercentage: 0, maxPercentage: 59, gradePoint: 0.0, description: 'Unsatisfactory / Needs Retake' }
];

const INITIAL_ACADEMIC_YEARS: AcademicYearConfig[] = [
  {
    id: 'ay-2026',
    name: 'Academic Year 2026 - 2027',
    startDate: '2026-09-01',
    endDate: '2027-06-30',
    currentTerm: 'Term 1 (Fall Session)',
    isActive: true
  },
  {
    id: 'ay-2025',
    name: 'Academic Year 2025 - 2026',
    startDate: '2025-09-01',
    endDate: '2026-06-30',
    currentTerm: 'Term 3 (Completed)',
    isActive: false
  }
];

const INITIAL_SMS_TEMPLATES: SmsTemplate[] = [
  {
    id: 'sms-1',
    title: 'Daily Student Absence Notification',
    type: 'Attendance',
    content: 'Dear {parent_name}, this is to inform you that {student_name} was marked absent from {subject} class on {date}. Please contact the institute if this is in error.',
    variables: ['{parent_name}', '{student_name}', '{subject}', '{date}'],
    lastUpdated: '2026-10-10'
  },
  {
    id: 'sms-2',
    title: 'Term Tuition Fee Due Reminder',
    type: 'Fee Alert',
    content: 'Notice from Apex Institute: Tuition fee invoice {invoice_number} for {student_name} of amount Rs. {amount} is due by {due_date}. Please clear via student portal.',
    variables: ['{invoice_number}', '{student_name}', '{amount}', '{due_date}'],
    lastUpdated: '2026-10-05'
  },
  {
    id: 'sms-3',
    title: 'Term Exam Results Publication',
    type: 'Exam Results',
    content: 'Congratulations! Official marks for {exam_title} have been published. {student_name} scored {marks}/{total} (Grade: {grade}). View report in portal.',
    variables: ['{exam_title}', '{student_name}', '{marks}', '{total}', '{grade}'],
    lastUpdated: '2026-09-28'
  },
  {
    id: 'sms-4',
    title: 'Emergency Weather / Campus Closure Notice',
    type: 'General Notice',
    content: 'Campus Notice: Due to {reason}, all in-person classes on {date} will transition to live interactive online sessions via EduPortal.',
    variables: ['{reason}', '{date}'],
    lastUpdated: '2026-09-15'
  }
];

const INITIAL_AUDIT_LOGS: AuditLogItem[] = [
  {
    id: 'log-1',
    timestamp: '2026-10-22 12:45:10',
    user: 'Prof. Sarah Jenkins',
    userRole: 'Teacher',
    action: 'Marked manual attendance for Batch Alpha (2026) - Quantum Physics',
    category: 'Academic',
    ipAddress: '192.168.1.45',
    status: 'Success'
  },
  {
    id: 'log-2',
    timestamp: '2026-10-22 11:15:32',
    user: 'David Morgan',
    userRole: 'Parent',
    action: 'Logged into Parent Portal & viewed Term 3 attendance',
    category: 'Security',
    ipAddress: '24.108.82.19',
    status: 'Success'
  },
  {
    id: 'log-3',
    timestamp: '2026-10-21 16:30:00',
    user: 'Dr. Alistair Vance',
    userRole: 'Administrator',
    action: 'Published Exam datesheet for Mid-Term Quantum Mechanics & Waves',
    category: 'Academic',
    ipAddress: '192.168.1.1',
    status: 'Success'
  },
  {
    id: 'log-4',
    timestamp: '2026-10-21 14:22:18',
    user: 'Claire Beauchamp',
    userRole: 'Registrar',
    action: 'Generated monthly fee invoices batch #INV-2026-B10',
    category: 'Billing',
    ipAddress: '192.168.1.12',
    status: 'Success'
  },
  {
    id: 'log-5',
    timestamp: '2026-10-20 09:12:44',
    user: 'System Bot',
    userRole: 'System',
    action: 'Triggered automated SMS batch for overdue tuition fees',
    category: 'System',
    ipAddress: '127.0.0.1',
    status: 'Success'
  }
];

interface InstituteState {
  staff: StaffMember[];
  gradingScale: GradingScaleItem[];
  academicYears: AcademicYearConfig[];
  smsTemplates: SmsTemplate[];
  auditLogs: AuditLogItem[];
  instituteSettings: {
    instituteName: string;
    tagline: string;
    contactEmail: string;
    contactPhone: string;
    address: string;
    currency: string;
    timezone: string;
    enableSmsNotifications: boolean;
    enableEmailDigests: boolean;
    defaultGradingSystem: string;
  };
}

const initialState: InstituteState = {
  staff: INITIAL_STAFF,
  gradingScale: INITIAL_GRADING_SCALE,
  academicYears: INITIAL_ACADEMIC_YEARS,
  smsTemplates: INITIAL_SMS_TEMPLATES,
  auditLogs: INITIAL_AUDIT_LOGS,
  instituteSettings: {
    instituteName: 'Apex Tuition & Science Institute',
    tagline: 'Empowering Minds Through STEM Excellence',
    contactEmail: 'contact@apex-institute.edu',
    contactPhone: '+1 (555) 019-2834',
    address: '450 Innovation Parkway, Cambridge, MA',
    currency: 'Sri Lankan Rupee (Rs.)',
    timezone: 'UTC +05:30 (Sri Lanka Standard Time)',
    enableSmsNotifications: true,
    enableEmailDigests: true,
    defaultGradingSystem: 'Standard 4.0 GPA Scale'
  }
};

export const instituteSlice = createSlice({
  name: 'institute',
  initialState,
  reducers: {
    updateStaffMember: (state, action: PayloadAction<StaffMember>) => {
      const idx = state.staff.findIndex(s => s.id === action.payload.id);
      if (idx >= 0) {
        state.staff[idx] = action.payload;
      } else {
        state.staff.push(action.payload);
      }
    },
    updateGradingScaleItem: (state, action: PayloadAction<GradingScaleItem>) => {
      const idx = state.gradingScale.findIndex(g => g.id === action.payload.id);
      if (idx >= 0) {
        state.gradingScale[idx] = action.payload;
      }
    },
    addAcademicYear: (state, action: PayloadAction<AcademicYearConfig>) => {
      state.academicYears.push(action.payload);
    },
    setActiveAcademicYear: (state, action: PayloadAction<string>) => {
      state.academicYears.forEach(ay => {
        ay.isActive = ay.id === action.payload;
      });
    },
    updateSmsTemplate: (state, action: PayloadAction<SmsTemplate>) => {
      const idx = state.smsTemplates.findIndex(s => s.id === action.payload.id);
      if (idx >= 0) {
        state.smsTemplates[idx] = {
          ...action.payload,
          lastUpdated: new Date().toISOString().split('T')[0]
        };
      }
    },
    updateSettings: (state, action: PayloadAction<Partial<InstituteState['instituteSettings']>>) => {
      state.instituteSettings = {
        ...state.instituteSettings,
        ...action.payload
      };
    }
  }
});

export const {
  updateStaffMember,
  updateGradingScaleItem,
  addAcademicYear,
  setActiveAcademicYear,
  updateSmsTemplate,
  updateSettings
} = instituteSlice.actions;
export default instituteSlice.reducer;
