import React from 'react';
import {
  LayoutDashboard,
  Calendar,
  ClipboardCheck,
  Award,
  CreditCard,
  MessageSquare,
  BellRing,
  BookOpen,
  QrCode,
  FileText,
  UploadCloud,
  FileSpreadsheet,
  Users,
  Settings,
  ShieldCheck,
  Sliders,
  Send,
  CalendarRange,
  School,
  GraduationCap
} from 'lucide-react';
import { useAppSelector } from '../../store';

interface SidebarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isCollapsed?: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentView,
  onNavigate,
}) => {
  const { currentUser } = useAppSelector((state) => state.auth);
  const unreadMessagesCount = useAppSelector((state) =>
    state.chat.channels.reduce((acc, c) => acc + c.unreadCount, 0)
  );

  // Define nav links for each role matching the Figma layers
  const getNavLinks = () => {
    switch (currentUser.role) {
      case 'institute':
        return [
          { id: 'admin-dashboard', label: 'Institute Overview', icon: LayoutDashboard },
          { id: 'admin-staff', label: 'Staff & Faculty', icon: Users, badge: '5 Staff' },
          { id: 'admin-academic-year', label: 'Academic Year', icon: CalendarRange },
          { id: 'admin-grading-scale', label: 'Grading Scale', icon: Sliders },
          { id: 'admin-sms-templates', label: 'SMS & Templates', icon: Send },
          { id: 'admin-audit-log', label: 'Audit Log & Activity', icon: ShieldCheck },
          { id: 'admin-settings', label: 'Institute Settings', icon: Settings },
        ];

      case 'teacher':
        return [
          { id: 'teacher-dashboard', label: 'Faculty Dashboard', icon: LayoutDashboard },
          { id: 'teacher-schedule', label: 'Class Schedule', icon: Calendar },
          { id: 'teacher-attendance', label: 'Manual Attendance', icon: ClipboardCheck, badge: 'Daily' },
          { id: 'teacher-exams', label: 'Exams & Marks', icon: Award },
          { id: 'teacher-materials', label: 'Study Materials', icon: UploadCloud },
          { id: 'teacher-announcements', label: 'Announcements', icon: BellRing },
          { id: 'teacher-chat', label: 'Class Chat & Direct', icon: MessageSquare, badge: unreadMessagesCount > 0 ? `${unreadMessagesCount}` : undefined },
        ];

      case 'student':
        return [
          { id: 'student-dashboard', label: 'Student Dashboard', icon: LayoutDashboard },
          { id: 'student-qr', label: 'Digital ID & QR Pass', icon: QrCode, badge: 'Live ID' },
          { id: 'student-schedule', label: 'My Schedule', icon: Calendar },
          { id: 'student-attendance', label: 'Attendance Records', icon: ClipboardCheck },
          { id: 'student-results', label: 'Exam Results', icon: Award },
          { id: 'student-notes', label: 'Study Notes & Files', icon: FileText },
          { id: 'student-chat', label: 'Class Chat Room', icon: MessageSquare, badge: unreadMessagesCount > 0 ? `${unreadMessagesCount}` : undefined },
        ];

      case 'parent':
        return [
          { id: 'parent-dashboard', label: 'Child Overview', icon: LayoutDashboard },
          { id: 'parent-attendance', label: 'Attendance Tracking', icon: ClipboardCheck },
          { id: 'parent-results', label: 'Performance & Marks', icon: Award },
          { id: 'parent-fees', label: 'Fees & Invoices', icon: CreditCard, badge: '1 Due' },
          { id: 'parent-schedule', label: 'Class & Exam Schedule', icon: Calendar },
          { id: 'parent-messages', label: 'Teacher Messaging', icon: MessageSquare },
          { id: 'parent-notifications', label: 'Institute Notices', icon: BellRing },
        ];

      default:
        return [];
    }
  };

  const navLinks = getNavLinks();

  const getPortalBadge = () => {
    switch (currentUser.role) {
      case 'institute':
        return { label: 'Admin Portal', color: 'bg-indigo-600 text-white' };
      case 'teacher':
        return { label: 'Teacher Portal', color: 'bg-blue-600 text-white' };
      case 'student':
        return { label: 'Student Portal', color: 'bg-emerald-600 text-white' };
      case 'parent':
        return { label: 'Parent Portal', color: 'bg-purple-600 text-white' };
    }
  };

  const portalBadge = getPortalBadge();

  return (
    <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col shrink-0 min-h-screen border-r border-slate-800 transition-all select-none">
      {/* Brand Logo & Name */}
      <div className="h-16 flex items-center px-6 gap-3 border-b border-slate-800 bg-slate-950/40">
        <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-blue-500 flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
          <School className="w-5 h-5" />
        </div>
        <div className="truncate">
          <h1 className="text-sm font-bold text-white tracking-tight leading-tight">
            Apex Institute
          </h1>
          <span className="text-[10px] text-slate-400 font-medium tracking-wide uppercase">
            Management Portal
          </span>
        </div>
      </div>

      {/* Role Pill Banner */}
      <div className="px-4 py-3 border-b border-slate-800/80 bg-slate-900/60">
        <div className="flex items-center justify-between">
          <span className={`text-[11px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${portalBadge.color}`}>
            {portalBadge.label}
          </span>
          <span className="text-[11px] text-slate-400">v2.4 Active</span>
        </div>
        <p className="text-[11px] text-slate-400 mt-1 truncate">
          Logged in as: <strong className="text-slate-200">{currentUser.name}</strong>
        </p>
      </div>

      {/* Navigation Menu */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <p className="px-3 text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-2">
          Navigation
        </p>
        {navLinks.map((link) => {
          const Icon = link.icon;
          const isActive = currentView === link.id;

          return (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs sm:text-sm font-medium transition-all group ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={`w-4 h-4 transition-transform group-hover:scale-110 ${
                    isActive ? 'text-white' : 'text-slate-400 group-hover:text-slate-200'
                  }`}
                />
                <span className="truncate">{link.label}</span>
              </div>
              {link.badge && (
                <span
                  className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-800 text-indigo-300 border border-slate-700'
                  }`}
                >
                  {link.badge}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Bottom Footer Info */}
      <div className="p-4 border-t border-slate-800 bg-slate-950/30">
        <div className="p-3 bg-slate-800/60 rounded-xl border border-slate-700/60 text-center">
          <p className="text-xs font-semibold text-slate-200">
            Tuition Institute IMS
          </p>
          <p className="text-[10px] text-slate-400 mt-0.5">
            Designed for High Performance Education
          </p>
        </div>
      </div>
    </aside>
  );
};
