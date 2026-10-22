import React from 'react';
import { BellRing, Pin, CheckCircle2, AlertCircle } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const ParentNotificationsView: React.FC = () => {
  const { announcements } = useAppSelector((state) => state.announcements);

  const parentNotifs = announcements.filter(
    (a) => a.targetAudience === 'Parents' || a.targetAudience === 'All'
  );

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
          Institute Official Notices & Broadcasts
        </h2>
        <p className="text-xs sm:text-sm text-slate-500 mt-1">
          Figma Screen: "Notifications" & "Announcements" — Direct parent circulars, conference dates, and policy notices
        </p>
      </div>

      <div className="space-y-4">
        {parentNotifs.map((item) => (
          <div
            key={item.id}
            className={`bg-white rounded-2xl border p-5 sm:p-6 shadow-sm transition-all ${
              item.pinned ? 'border-purple-300 ring-2 ring-purple-500/10' : 'border-slate-200/80'
            }`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {item.pinned && (
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-purple-700 bg-purple-50 px-2 py-0.5 rounded-md">
                    <Pin className="w-3 h-3" /> Pinned Notice
                  </span>
                )}
                <Badge variant={item.priority === 'High' ? 'danger' : 'info'} size="sm">
                  {item.priority} Priority
                </Badge>
              </div>
              <span className="text-xs text-slate-400">{item.date}</span>
            </div>

            <h3 className="text-base font-bold text-slate-900 mt-2.5">
              {item.title}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-2 leading-relaxed">
              {item.content}
            </p>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Origin: <strong className="text-slate-700">{item.author}</strong></span>
              <span className="text-purple-600 font-semibold">Apex Central Administration</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
