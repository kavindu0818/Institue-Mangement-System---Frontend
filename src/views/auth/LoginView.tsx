import React, { useState } from 'react';
import {
  Shield,
  BookOpen,
  GraduationCap,
  Users,
  Lock,
  Mail,
  ArrowRight,
  School,
  CheckCircle2,
} from 'lucide-react';
import { useAppDispatch } from '../../store';
import { switchRole } from '../../store/authSlice';
import { UserRole } from '../../types';

interface LoginViewProps {
  onLoginSuccess?: () => void;
}

export const LoginView: React.FC<LoginViewProps> = ({ onLoginSuccess }) => {
  const dispatch = useAppDispatch();
  const [selectedRole, setSelectedRole] = useState<UserRole>('teacher');

  const roleCredentials: Record<
    UserRole,
    { label: string; email: string; name: string; title: string; subtitle: string; icon: any }
  > = {
    teacher: {
      label: 'Teacher',
      email: 'teacher@apex-institute.edu',
      name: 'Prof. Sarah Jenkins',
      title: 'Teacher Portal',
      subtitle: 'Department of Physics & Mathematics',
      icon: BookOpen,
    },
    student: {
      label: 'Student',
      email: 'student@apex-institute.edu',
      name: 'Alex Morgan',
      title: 'Student Portal',
      subtitle: 'Grade 12 STEM • Batch Alpha',
      icon: GraduationCap,
    },
    parent: {
      label: 'Parent',
      email: 'parent@apex-institute.edu',
      name: 'David Morgan',
      title: 'Parent Portal',
      subtitle: 'Guardian of Alex Morgan',
      icon: Users,
    },
    institute: {
      label: 'Institute',
      email: 'admin@apex-institute.edu',
      name: 'Dr. Alistair Vance',
      title: 'Institute Portal',
      subtitle: 'Director & Institutional Administration',
      icon: Shield,
    },
  };

  const rolesList: UserRole[] = ['teacher', 'student', 'parent', 'institute'];

  const [emailInput, setEmailInput] = useState(roleCredentials['teacher'].email);
  const [passwordInput, setPasswordInput] = useState('••••••••••••');

  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setEmailInput(roleCredentials[role].email);
    setPasswordInput('••••••••••••');
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(switchRole(selectedRole));
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const activeCreds = roleCredentials[selectedRole];
  const Icon = activeCreds.icon;

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center justify-center p-4 selection:bg-indigo-500 selection:text-white">
      {/* Background radial gradient glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 w-full max-w-md">
        {/* Brand Header */}
        <div className="text-center mb-7">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 to-blue-500 flex items-center justify-center text-white mx-auto shadow-xl shadow-indigo-600/30">
            <School className="w-6 h-6" />
          </div>
          <h1 className="text-2xl font-black text-white mt-4 tracking-tight">
            Tuition Institute Portal
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Select your role below to log in to your designated portal
          </p>
        </div>

        {/* 4 Login Role Tabs: Teacher, Student, Parent, Institute */}
        <div className="grid grid-cols-4 gap-1.5 p-1.5 bg-slate-800/90 rounded-2xl border border-slate-700/80 mb-6 shadow-lg">
          {rolesList.map((role) => {
            const item = roleCredentials[role];
            const ItemIcon = item.icon;
            const isSelected = selectedRole === role;

            return (
              <button
                key={role}
                type="button"
                onClick={() => handleSelectRole(role)}
                className={`py-2.5 px-2 rounded-xl text-center transition-all flex flex-col items-center gap-1.5 ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/30 font-bold scale-[1.02]'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50 text-xs'
                }`}
              >
                <ItemIcon className="w-4 h-4" />
                <span className="text-[11px] font-semibold truncate w-full">
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Login Card Form */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-2xl border border-slate-100">
          <div className="flex items-center gap-3 pb-5 border-b border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900 leading-tight">
                {activeCreds.title}
              </h2>
              <p className="text-xs text-slate-500">{activeCreds.subtitle}</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="mt-5 space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Account Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">
                  Password
                </label>
                <span className="text-[11px] text-indigo-600 hover:underline cursor-pointer">
                  Forgot?
                </span>
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                <input
                  type="password"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  className="w-full text-xs sm:text-sm pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 focus:bg-white text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-indigo-50/70 border border-indigo-100 text-[11px] text-indigo-900 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-indigo-600 shrink-0" />
              <span>
                Verified Account: <strong>{activeCreds.name}</strong> ({activeCreds.label})
              </span>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm rounded-xl shadow-lg shadow-indigo-600/30 transition-all flex items-center justify-center gap-2 mt-2"
            >
              Sign In as {activeCreds.label}
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          Apex Tuition & Science Institute • Sri Lanka (Rs. LKR)
        </p>
      </div>
    </div>
  );
};

export default LoginView;
