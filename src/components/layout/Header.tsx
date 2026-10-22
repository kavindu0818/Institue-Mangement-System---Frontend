import React, { useState } from 'react';
import {
  Bell,
  Search,
  Globe,
  LogOut,
  X,
} from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { logout, setLanguage } from '../../store/authSlice';

interface HeaderProps {
  onToggleSidebar?: () => void;
  isSidebarOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = () => {
  const dispatch = useAppDispatch();
  const { currentUser, activeLanguage } = useAppSelector((state) => state.auth);
  const announcements = useAppSelector((state) => state.announcements.announcements);

  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const languages = ['English', 'Sinhala (සිංහල)', 'Tamil (தமிழ்)', 'French (Français)'];

  const getRoleDisplayName = () => {
    switch (currentUser.role) {
      case 'institute':
        return 'Institute Admin';
      case 'teacher':
        return 'Teaching Faculty';
      case 'student':
        return 'Student';
      case 'parent':
        return 'Parent';
      default:
        return currentUser.role;
    }
  };

  return (
    <header className="sticky top-0 z-30 h-16 bg-white/95 backdrop-blur border-b border-slate-200/80 px-4 sm:px-6 flex items-center justify-between transition-all">
      {/* Search Input */}
      <div className="flex items-center gap-3 w-72 sm:w-96">
        <div className="relative w-full">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search classes, students, records..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 hover:bg-slate-100/70 focus:bg-white text-slate-800 text-xs sm:text-sm pl-9 pr-8 py-2 rounded-xl border border-slate-200/80 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3">
        {/* Language Picker */}
        <div className="relative">
          <button
            onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
            className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
            title="Language"
          >
            <Globe className="w-4 h-4" />
          </button>
          {isLangMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-100 p-1.5 z-50">
              <p className="px-2.5 py-1 text-[11px] font-semibold text-slate-400 uppercase">
                Select Language
              </p>
              {languages.map((lang) => (
                <button
                  key={lang}
                  onClick={() => {
                    dispatch(setLanguage(lang));
                    setIsLangMenuOpen(false);
                  }}
                  className={`w-full text-left px-2.5 py-1.5 text-xs rounded-lg transition-colors ${
                    activeLanguage === lang
                      ? 'bg-indigo-50 text-indigo-700 font-semibold'
                      : 'hover:bg-slate-50 text-slate-700'
                  }`}
                >
                  {lang}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setIsNotifOpen(!isNotifOpen)}
            className="relative p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <Bell className="w-4 h-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full" />
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-slate-100 p-3 z-50">
              <div className="flex items-center justify-between pb-2 border-b border-slate-100">
                <span className="text-xs font-bold text-slate-900">
                  Broadcasts & Alerts
                </span>
                <span className="text-[11px] text-indigo-600 font-medium cursor-pointer hover:underline">
                  Mark all as read
                </span>
              </div>
              <div className="divide-y divide-slate-100 max-h-72 overflow-y-auto mt-2">
                {announcements.slice(0, 3).map((ann) => (
                  <div key={ann.id} className="py-2.5 hover:bg-slate-50/80 px-2 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-semibold uppercase px-1.5 py-0.5 rounded bg-indigo-50 text-indigo-700">
                        {ann.priority} Priority
                      </span>
                      <span className="text-[10px] text-slate-400">{ann.date}</span>
                    </div>
                    <p className="text-xs font-semibold text-slate-800 mt-1 line-clamp-1">
                      {ann.title}
                    </p>
                    <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5">
                      {ann.content}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* User Profile Pill */}
        <div className="flex items-center gap-2.5 pl-2 border-l border-slate-200">
          <img
            src={currentUser.avatar}
            alt={currentUser.name}
            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-500/20"
          />
          <div className="hidden lg:block text-left">
            <p className="text-xs font-bold text-slate-900 leading-tight">
              {currentUser.name}
            </p>
            <p className="text-[10px] text-indigo-600 font-semibold capitalize">
              {getRoleDisplayName()}
            </p>
          </div>
        </div>

        {/* Log Out Button */}
        <button
          onClick={() => dispatch(logout())}
          className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-rose-600 hover:text-rose-700 bg-rose-50 hover:bg-rose-100/80 rounded-xl transition-all border border-rose-200/60 shadow-sm ml-1"
          title="Log Out to Switch Role or Exit"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
};
