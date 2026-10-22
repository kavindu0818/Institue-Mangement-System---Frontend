import React, { useState, useEffect } from 'react';
import { useAppSelector } from '../../store';
import { Header } from './Header';
import { Sidebar } from './Sidebar';
import { UserRole } from '../../types';

// Institute Views
import { InstituteDashboard } from '../../views/institute/InstituteDashboard';
import { StaffManagement } from '../../views/institute/StaffManagement';
import { AcademicYearView } from '../../views/institute/AcademicYearView';
import { GradingScaleView } from '../../views/institute/GradingScaleView';
import { SmsTemplatesView } from '../../views/institute/SmsTemplatesView';
import { AuditLogView } from '../../views/institute/AuditLogView';
import { SettingsView } from '../../views/institute/SettingsView';

// Teacher Views
import { TeacherDashboard } from '../../views/teacher/TeacherDashboard';
import { TeacherScheduleView } from '../../views/teacher/TeacherScheduleView';
import { ManualAttendanceView } from '../../views/teacher/ManualAttendanceView';
import { ExamsAndMarksView } from '../../views/teacher/ExamsAndMarksView';
import { MaterialsView } from '../../views/teacher/MaterialsView';
import { TeacherAnnouncementsView } from '../../views/teacher/TeacherAnnouncementsView';
import { ClassChatView } from '../../views/teacher/ClassChatView';

// Student Views
import { StudentDashboard } from '../../views/student/StudentDashboard';
import { StudentQrView } from '../../views/student/StudentQrView';
import { StudentResultsView } from '../../views/student/StudentResultsView';
import { StudentAttendanceView } from '../../views/student/StudentAttendanceView';
import { StudentScheduleView } from '../../views/student/StudentScheduleView';
import { StudentNotesView } from '../../views/student/StudentNotesView';

// Parent Views
import { ParentDashboard } from '../../views/parent/ParentDashboard';
import { ParentAttendanceView } from '../../views/parent/ParentAttendanceView';
import { ParentResultsView } from '../../views/parent/ParentResultsView';
import { ParentFeesView } from '../../views/parent/ParentFeesView';
import { ParentScheduleView } from '../../views/parent/ParentScheduleView';
import { ParentNotificationsView } from '../../views/parent/ParentNotificationsView';

export const DashboardLayout: React.FC = () => {
  const { currentUser } = useAppSelector((state) => state.auth);

  // Set default view based on role
  const getDefaultView = (role: UserRole) => {
    switch (role) {
      case 'institute':
        return 'admin-dashboard';
      case 'teacher':
        return 'teacher-dashboard';
      case 'student':
        return 'student-dashboard';
      case 'parent':
        return 'parent-dashboard';
    }
  };

  const [currentView, setCurrentView] = useState<string>(getDefaultView(currentUser.role));

  // Reset view when switching role
  useEffect(() => {
    setCurrentView(getDefaultView(currentUser.role));
  }, [currentUser.role]);

  // Render view component
  const renderCurrentView = () => {
    switch (currentView) {
      // Institute Views
      case 'admin-dashboard':
        return <InstituteDashboard onNavigate={setCurrentView} />;
      case 'admin-staff':
        return <StaffManagement />;
      case 'admin-academic-year':
        return <AcademicYearView />;
      case 'admin-grading-scale':
        return <GradingScaleView />;
      case 'admin-sms-templates':
        return <SmsTemplatesView />;
      case 'admin-audit-log':
        return <AuditLogView />;
      case 'admin-settings':
        return <SettingsView />;

      // Teacher Views
      case 'teacher-dashboard':
        return <TeacherDashboard onNavigate={setCurrentView} />;
      case 'teacher-schedule':
        return <TeacherScheduleView />;
      case 'teacher-attendance':
        return <ManualAttendanceView />;
      case 'teacher-exams':
        return <ExamsAndMarksView />;
      case 'teacher-materials':
        return <MaterialsView />;
      case 'teacher-announcements':
        return <TeacherAnnouncementsView />;
      case 'teacher-chat':
        return <ClassChatView />;

      // Student Views
      case 'student-dashboard':
        return <StudentDashboard onNavigate={setCurrentView} />;
      case 'student-qr':
        return <StudentQrView />;
      case 'student-results':
        return <StudentResultsView />;
      case 'student-attendance':
        return <StudentAttendanceView />;
      case 'student-schedule':
        return <StudentScheduleView />;
      case 'student-notes':
        return <StudentNotesView />;
      case 'student-chat':
        return <ClassChatView />;

      // Parent Views
      case 'parent-dashboard':
        return <ParentDashboard onNavigate={setCurrentView} />;
      case 'parent-attendance':
        return <ParentAttendanceView />;
      case 'parent-results':
        return <ParentResultsView />;
      case 'parent-fees':
        return <ParentFeesView />;
      case 'parent-schedule':
        return <ParentScheduleView />;
      case 'parent-messages':
        return <ClassChatView />;
      case 'parent-notifications':
        return <ParentNotificationsView />;

      default:
        return <InstituteDashboard onNavigate={setCurrentView} />;
    }
  };

  return (
    <div className="flex min-h-screen bg-slate-50 font-sans">
      {/* Dynamic Left Sidebar */}
      <Sidebar currentView={currentView} onNavigate={setCurrentView} />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Global Header */}
        <Header />

        {/* View Content Body */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          {renderCurrentView()}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
