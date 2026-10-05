import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react';

export const StatsScreen = () => {
  const { goBack, stats, formatVNDPure } = useApp();
  const [activeYear, setActiveYear] = useState('2026');

  const maxMonthly = Math.max(...stats.monthly.map(m => Math.max(m.received, m.given)));

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F6FB] dark:bg-[#0D1322]">
      {/* Header */}
      <div className="bg-white dark:bg-[#161F33] px-5 pt-12 pb-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <button onClick={goBack} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1E2B45] flex items-center justify-center text-[#1B2445] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-extrabold text-[#1B2445] dark:text-white">Thống kê</h1>
        <div className="flex gap-2 ml-auto">
          {['2024', '2025', '2026'].map(y => (
            <button
              key={y}
              onClick={() => setActiveYear(y)}
              className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                activeYear === y
                  ? 'bg-[#E0285C] text-white shadow-sm shadow-rose-400/30'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {/* Total Summary */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gradient-to-br from-emerald-400 to-[#0B8A63] rounded-3xl p-4 text-white shadow-lg shadow-emerald-500/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">Tổng nhận</p>
            <p className="font-extrabold text-xl">{formatVNDPure(stats.receivedTotal)}</p>
            <p className="text-xs text-white/70 mt-1">{stats.receivedCount} lần nhận</p>
          </div>
          <div className="bg-gradient-to-br from-rose-400 to-[#E0285C] rounded-3xl p-4 text-white shadow-lg shadow-rose-500/30">
            <p className="text-[10px] font-bold uppercase tracking-wider text-white/70 mb-1">Tổng mừng</p>
            <p className="font-extrabold text-xl">{formatVNDPure(stats.givenTotal)}</p>
            <p className="text-xs text-white/70 mt-1">{stats.givenCount} lần đi mừng</p>
          </div>
        </div>

        {/* Monthly Bar Chart */}
        <div className="bg-white dark:bg-[#161F33] rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="font-extrabold text-[#1B2445] dark:text-white text-base mb-4">Theo tháng</h2>
          <div className="flex items-end gap-1.5 h-36">
            {stats.monthly.map(m => {
              const receivedHeight = maxMonthly > 0 ? (m.received / maxMonthly) * 100 : 0;
              const givenHeight = maxMonthly > 0 ? (m.given / maxMonthly) * 100 : 0;
              return (
                <div key={m.month} className="flex-1 flex flex-col items-center gap-0.5">
                  <div className="w-full flex gap-0.5 items-end h-28">
                    <div
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-emerald-300 to-[#0B8A63] transition-all"
                      style={{ height: `${receivedHeight}%`, minHeight: receivedHeight > 0 ? 2 : 0 }}
                    />
                    <div
                      className="flex-1 rounded-t-lg bg-gradient-to-t from-rose-300 to-[#E0285C] transition-all"
                      style={{ height: `${givenHeight}%`, minHeight: givenHeight > 0 ? 2 : 0 }}
                    />
                  </div>
                  <span className="text-[9px] text-slate-400 dark:text-slate-500 font-bold">{m.month}</span>
                </div>
              );
            })}
          </div>
          <div className="flex items-center gap-4 mt-2 justify-end">
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-[#0B8A63]" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Nhận</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded-sm bg-[#E0285C]" />
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Mừng</span>
            </div>
          </div>
        </div>

        {/* Occasion Breakdown Donut-like list */}
        <div className="bg-white dark:bg-[#161F33] rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
          <h2 className="font-extrabold text-[#1B2445] dark:text-white text-base mb-4">Theo dịp</h2>
          <div className="space-y-3">
            {stats.occasions.map(o => (
              <div key={o.name}>
                <div className="flex items-center justify-between mb-1">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: o.color }} />
                    <span className="font-semibold text-sm text-[#1B2445] dark:text-white">{o.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{formatVNDPure(o.amount)}</span>
                    <span className="text-xs font-extrabold text-[#1B2445] dark:text-white w-8 text-right">{o.percent}%</span>
                  </div>
                </div>
                <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all"
                    style={{ width: `${o.percent}%`, backgroundColor: o.color }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
