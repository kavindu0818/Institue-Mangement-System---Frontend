export type UserRole = 'institute' | 'teacher' | 'student' | 'parent';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  phone?: string;
  instituteName?: string;
  department?: string;
  studentId?: string;
  grade?: string;
  parentOf?: string[]; // student ids
}

export interface Student {
  id: string;
  name: string;
  rollNumber: string;
  grade: string;
  batch: string;
  avatar: string;
  email: string;
  parentName: string;
  parentPhone: string;
  attendanceRate: number;
  overallGpa: number;
  feeStatus: 'Paid' | 'Pending' | 'Overdue';
}

export interface Teacher {
  id: string;
  name: string;
  subject: string;
  email: string;
  phone: string;
  avatar: string;
  classesCount: number;
  studentsCount: number;
  joiningDate: string;
  status: 'Active' | 'On Leave';
}

export interface ClassSession {
  id: string;
  title: string;
  subject: string;
  teacherName: string;
  teacherId: string;
  batch: string;
  dayOfWeek: string;
  startTime: string;
  endTime: string;
  room: string;
  status: 'Upcoming' | 'Live' | 'Completed';
  color: string;
}

export interface AttendanceRecord {
  id: string;
  studentId: string;
  studentName: string;
  batch: string;
  subject: string;
  date: string;
  status: 'Present' | 'Absent' | 'Late' | 'Excused';
  markedBy: string;
  time?: string;
}

export interface Exam {
  id: string;
  title: string;
  subject: string;
  batch: string;
  date: string;
  startTime: string;
  durationMinutes: number;
  totalMarks: number;
  passingMarks: number;
  room: string;
  status: 'Upcoming' | 'Ongoing' | 'Graded';
}

export interface ExamResult {
  id: string;
  examId: string;
  examTitle: string;
  studentId: string;
  studentName: string;
  subject: string;
  marksObtained: number;
  totalMarks: number;
  grade: string;
  percentage: number;
  rank: number;
  feedback?: string;
  date: string;
}

export interface FeeInvoice {
  id: string;
  invoiceNumber: string;
  studentId: string;
  studentName: string;
  title: string;
  month: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  status: 'Paid' | 'Pending' | 'Overdue';
  paymentMethod?: string;
  transactionId?: string;
}

export interface Announcement {
  id: string;
  title: string;
  content: string;
  author: string;
  authorRole: UserRole;
  targetAudience: 'All' | 'Students' | 'Parents' | 'Teachers';
  date: string;
  priority: 'High' | 'Normal' | 'Low';
  pinned?: boolean;
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: UserRole;
  senderAvatar: string;
  content: string;
  timestamp: string;
  channelId: string;
  attachmentName?: string;
}

export interface StudyMaterial {
  id: string;
  title: string;
  subject: string;
  batch: string;
  uploadedBy: string;
  uploadDate: string;
  fileSize: string;
  fileType: 'pdf' | 'doc' | 'video' | 'link';
  downloadUrl?: string;
}

export interface StaffMember {
  id: string;
  name: string;
  role: string;
  department: string;
  email: string;
  phone: string;
  status: 'Active' | 'Inactive';
  permissions: string[];
}

export interface GradingScaleItem {
  id: string;
  grade: string;
  minPercentage: number;
  maxPercentage: number;
  gradePoint: number;
  description: string;
}

export interface AcademicYearConfig {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  currentTerm: string;
  isActive: boolean;
}

export interface SmsTemplate {
  id: string;
  title: string;
  type: 'Fee Alert' | 'Attendance' | 'Exam Results' | 'General Notice';
  content: string;
  variables: string[];
  lastUpdated: string;
}

export interface AuditLogItem {
  id: string;
  timestamp: string;
  user: string;
  userRole: string;
  action: string;
  category: 'Security' | 'Academic' | 'Billing' | 'System';
  ipAddress: string;
  status: 'Success' | 'Warning' | 'Failed';
}

export interface StudentNote {
  id: string;
  title: string;
  subject: string;
  content: string;
  date: string;
  tags: string[];
}
