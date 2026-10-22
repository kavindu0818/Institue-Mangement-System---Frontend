import React, { useState } from 'react';
import { ShieldCheck, Filter, Search, CheckCircle2, AlertTriangle, XCircle, Download } from 'lucide-react';
import { useAppSelector } from '../../store';
import { Badge } from '../../components/common/Badge';

export const AuditLogView: React.FC = () => {
  const { auditLogs } = useAppSelector((state) => state.institute);
  const [filterCategory, setFilterCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filteredLogs = auditLogs.filter((log) => {
    const matchesCat = filterCategory === 'All' || log.category === filterCategory;
    const matchesSearch =
      log.user.toLowerCase().includes(search.toLowerCase()) ||
      log.action.toLowerCase().includes(search.toLowerCase()) ||
      log.ipAddress.includes(search);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
            Security & System Audit Log
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Immutable tracking of academic adjustments, grade submissions, fee invoices, and login activity
          </p>
        </div>

        <button
          onClick={() => alert('Exporting full audit trail to CSV format...')}
          className="px-4 py-2 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm rounded-xl border border-slate-200 transition-all shadow-sm flex items-center gap-2 self-start sm:self-auto"
        >
          <Download className="w-4 h-4 text-slate-500" />
          Export Audit Trail
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 bg-white p-3.5 rounded-2xl border border-slate-200/80 shadow-sm">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search by user, action, or IP..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full text-xs sm:text-sm pl-9 pr-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto pb-1 sm:pb-0">
          {['All', 'Academic', 'Security', 'Billing', 'System'].map((cat) => (
            <button
              key={cat}
              onClick={() => setFilterCategory(cat)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-all ${
                filterCategory === cat
                  ? 'bg-indigo-600 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200/70'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-white rounded-2xl border border-slate-200/80 shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead>
              <tr className="bg-slate-50/70 border-b border-slate-100 text-slate-400 font-semibold text-[11px] uppercase tracking-wider">
                <th className="py-3.5 pl-6">Timestamp</th>
                <th className="py-3.5">User & Role</th>
                <th className="py-3.5">Activity Description</th>
                <th className="py-3.5 text-center">Category</th>
                <th className="py-3.5 text-center">IP Origin</th>
                <th className="py-3.5 pr-6 text-right">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-slate-50/60 transition-colors">
                  <td className="py-3.5 pl-6 font-mono text-slate-500 text-xs">
                    {log.timestamp}
                  </td>
                  <td className="py-3.5 font-medium text-slate-900">
                    <div>{log.user}</div>
                    <span className="text-[11px] text-slate-400 font-normal">
                      {log.userRole}
                    </span>
                  </td>
                  <td className="py-3.5 text-slate-700 max-w-md">
                    {log.action}
                  </td>
                  <td className="py-3.5 text-center">
                    <span className="px-2 py-0.5 rounded-md text-[11px] font-semibold bg-slate-100 text-slate-700">
                      {log.category}
                    </span>
                  </td>
                  <td className="py-3.5 text-center font-mono text-xs text-slate-500">
                    {log.ipAddress}
                  </td>
                  <td className="py-3.5 pr-6 text-right">
                    <Badge variant={log.status === 'Success' ? 'success' : 'warning'} dot={true}>
                      {log.status}
                    </Badge>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
