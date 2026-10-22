import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  isPositive?: boolean;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  change,
  isPositive = true,
  subtitle,
  icon: Icon,
  iconColor = 'text-indigo-600',
  iconBg = 'bg-indigo-50',
}) => {
  return (
    <div className="bg-white rounded-2xl p-5 border border-slate-100 shadow-sm hover:shadow-md transition-all duration-200 group">
      <div className="flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
          {title}
        </p>
        <div
          className={`w-11 h-11 rounded-xl flex items-center justify-center ${iconBg} ${iconColor} transition-transform group-hover:scale-105`}
        >
          <Icon className="w-5 h-5" />
        </div>
      </div>

      <div className="mt-3 flex items-baseline gap-2">
        <h3 className="text-2xl font-bold text-slate-900 tracking-tight">
          {value}
        </h3>
        {change && (
          <span
            className={`text-xs font-semibold px-1.5 py-0.5 rounded-md ${
              isPositive
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {isPositive ? '+' : ''}
            {change}
          </span>
        )}
      </div>

      {subtitle && (
        <p className="mt-1 text-xs text-slate-500 font-normal">{subtitle}</p>
      )}
    </div>
  );
};
