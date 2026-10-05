import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Filter, ArrowUpRight, ArrowDownLeft, ChevronDown } from 'lucide-react';

export const LedgerScreen = () => {
  const { transactions, formatVNDPure, navigateTo, stats } = useApp();
  const [filter, setFilter] = useState('all'); // all | received | given
  const [query, setQuery] = useState('');

  const filtered = transactions.filter(t => {
    const matchDir = filter === 'all' || t.type === filter;
    const matchQ = !query || t.personName.toLowerCase().includes(query.toLowerCase()) || t.occasion.toLowerCase().includes(query.toLowerCase());
    return matchDir && matchQ;
  });

  // Group by monthGroup
  const grouped = filtered.reduce((acc, tx) => {
    const key = tx.monthGroup;
    if (!acc[key]) acc[key] = [];
    acc[key].push(tx);
    return acc;
  }, {});

  const totalReceived = transactions.filter(t => t.type === 'received').reduce((s, t) => s + t.amount, 0);
  const totalGiven = transactions.filter(t => t.type === 'given').reduce((s, t) => s + t.amount, 0);

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F6FB] dark:bg-[#0D1322]">
      {/* Header */}
      <div className="bg-white dark:bg-[#161F33] px-5 pt-12 pb-4 shadow-sm dark:shadow-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold text-[#1B2445] dark:text-white tracking-tight">Sổ ghi chép</h1>
          <button
            onClick={() => navigateTo('stats')}
            className="text-xs font-bold text-[#E0285C] bg-rose-50 dark:bg-rose-900/20 px-3 py-1.5 rounded-full hover:bg-rose-100 dark:hover:bg-rose-900/30 transition-all"
          >
            Thống kê →
          </button>
        </div>

        {/* Total Summary Pills */}
        <div className="flex gap-2 mb-4">
          <div className="flex-1 bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-900/30 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ArrowDownLeft size={12} className="text-[#0B8A63]" />
              <span className="text-[10px] text-[#0B8A63] font-bold uppercase tracking-wide">Nhận về</span>
            </div>
            <p className="text-[#0B8A63] font-extrabold text-base">{formatVNDPure(totalReceived)}</p>
          </div>
          <div className="flex-1 bg-rose-50 dark:bg-rose-900/20 border border-rose-100 dark:border-rose-900/30 rounded-2xl p-3 text-center">
            <div className="flex items-center justify-center gap-1 mb-1">
              <ArrowUpRight size={12} className="text-[#E0285C]" />
              <span className="text-[10px] text-[#E0285C] font-bold uppercase tracking-wide">Đã mừng</span>
            </div>
            <p className="text-[#E0285C] font-extrabold text-base">{formatVNDPure(totalGiven)}</p>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="relative mb-3">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm người, dịp..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#1E2B45] text-sm text-[#1B2445] dark:text-white placeholder-slate-400 border-0 outline-none focus:ring-2 focus:ring-rose-300 transition-all"
          />
        </div>

        {/* Direction Filter Pills */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-[#1E2B45] p-1">
          {[{ id: 'all', label: 'Tất cả' }, { id: 'received', label: '↓ Nhận về' }, { id: 'given', label: '↑ Đã mừng' }].map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`flex-1 py-2 rounded-xl text-xs font-bold transition-all ${
                filter === f.id
                  ? 'bg-white dark:bg-[#161F33] text-[#E0285C] shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grouped Transaction List */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {Object.keys(grouped).length === 0 ? (
          <div className="text-center py-16 text-slate-400 dark:text-slate-500">
            <p className="text-4xl mb-3">📖</p>
            <p className="font-semibold">Sổ đang trống</p>
          </div>
        ) : (
          Object.entries(grouped).map(([month, txList]) => (
            <div key={month} className="mb-5">
              {/* Month Header */}
              <div className="flex items-center gap-2 mb-3 px-1">
                <span className="text-xs font-extrabold text-[#1B2445] dark:text-white uppercase tracking-wider">{month}</span>
                <div className="flex-1 h-px bg-slate-200 dark:bg-slate-700" />
                <span className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{txList.length} mục</span>
              </div>

              <div className="space-y-2">
                {txList.map(tx => (
                  <div
                    key={tx.id}
                    onClick={() => tx.personId && navigateTo('person-detail', { personId: tx.personId })}
                    className="bg-white dark:bg-[#161F33] rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-98"
                  >
                    <div className="flex items-center gap-3">
                      {/* Icon */}
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white text-base shrink-0 ${
                        tx.type === 'received' ? 'bg-gradient-to-br from-emerald-400 to-[#0B8A63]' : 'bg-gradient-to-br from-rose-400 to-[#E0285C]'
                      }`}>
                        {tx.categoryType === 'Hỉ' ? '💍' : '🕯️'}
                      </div>

                      {/* Info */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="font-bold text-[#1B2445] dark:text-white text-sm truncate">{tx.personName}</p>
                          <span className={`shrink-0 text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            tx.categoryType === 'Hỉ'
                              ? 'bg-rose-100 text-rose-600 dark:bg-rose-900/40 dark:text-rose-300'
                              : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                          }`}>
                            {tx.categoryType}
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium">{tx.occasion} · {tx.date}</p>
                      </div>

                      {/* Amount */}
                      <div className="text-right shrink-0">
                        <p className={`font-extrabold text-base ${tx.type === 'received' ? 'text-[#0B8A63]' : 'text-[#E0285C]'}`}>
                          {tx.type === 'received' ? '+' : '-'}{formatVNDPure(tx.amount)}
                        </p>
                        <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-0.5">
                          {tx.type === 'received' ? 'Nhận về' : 'Đã mừng'}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
