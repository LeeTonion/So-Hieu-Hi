import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, ChevronRight, Bell, Plus, CheckCircle2, Clock } from 'lucide-react';

export const CalendarScreen = () => {
  const { events, navigateTo } = useApp();
  const [filter, setFilter] = useState('all');

  const months = ['Tháng 10', 'Tháng 11', 'Tháng 12'];
  const [selectedMonth] = useState('Tháng 10');

  const eventTypeFilters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Cưới hỏi', label: '💍 Cưới' },
    { id: 'Ngày giỗ', label: '🕯️ Giỗ' },
    { id: 'Sinh nhật', label: '🎂 Sinh nhật' },
    { id: 'Thôi nôi', label: '👶 Thôi nôi' },
  ];

  const filteredEvents = filter === 'all' ? events : events.filter(e => e.type === filter || (filter === 'Cưới hỉ' && e.type === 'Thiệp đã nhận'));

  const getEventEmoji = (type) => {
    switch (type) {
      case 'Cưới hỏi': return '💍';
      case 'Ngày giỗ': return '🕯️';
      case 'Sinh nhật': return '🎂';
      case 'Thôi nôi': return '👶';
      case 'Thiệp đã nhận': return '✉️';
      default: return '📅';
    }
  };

  const getUrgencyBadge = (daysLeft) => {
    if (daysLeft === 0) return { label: 'Hôm nay', cls: 'bg-red-500 text-white' };
    if (daysLeft <= 3) return { label: `${daysLeft} ngày`, cls: 'bg-red-100 text-red-600 dark:bg-red-900/40 dark:text-red-300' };
    if (daysLeft <= 7) return { label: `${daysLeft} ngày`, cls: 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300' };
    return { label: `${daysLeft} ngày`, cls: 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300' };
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F6FB] dark:bg-[#0D1322]">
      {/* Header */}
      <div className="bg-white dark:bg-[#161F33] px-5 pt-12 pb-4 shadow-sm dark:shadow-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold text-[#1B2445] dark:text-white tracking-tight">Lịch sự kiện</h1>
          <button
            onClick={() => navigateTo('add-event')}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-[#E0285C] text-white flex items-center justify-center shadow-md shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>

        {/* Month Selector */}
        <div className="flex gap-2 mb-3 overflow-x-auto pb-1 scrollbar-hide">
          {months.map(m => (
            <button
              key={m}
              className={`shrink-0 px-4 py-1.5 rounded-full text-sm font-bold border transition-all ${
                m === selectedMonth
                  ? 'bg-[#E0285C] text-white border-[#E0285C] shadow-md shadow-rose-400/30'
                  : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Event Type Filters */}
        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
          {eventTypeFilters.map(f => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                filter === f.id
                  ? 'bg-[#1B2445] dark:bg-white text-white dark:text-[#1B2445] border-[#1B2445] dark:border-white'
                  : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Events Timeline */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-1 mb-2">
          {filteredEvents.length} sự kiện sắp đến
        </p>
        {filteredEvents.map(event => {
          const badge = getUrgencyBadge(event.daysLeft);
          return (
            <div
              key={event.id}
              onClick={() => navigateTo('event-detail', { eventId: event.id })}
              className="bg-white dark:bg-[#161F33] rounded-2xl p-4 shadow-sm dark:shadow-black/20 border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-98"
            >
              <div className="flex items-center gap-3">
                {/* Date Column */}
                <div className="w-12 flex flex-col items-center shrink-0 bg-slate-50 dark:bg-[#1E2B45] rounded-xl p-2">
                  <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold uppercase">
                    {event.date ? new Date(event.date).toLocaleString('vi-VN', { month: 'short' }).toUpperCase() : ''}
                  </span>
                  <span className="text-2xl font-extrabold text-[#1B2445] dark:text-white leading-none">
                    {event.date ? new Date(event.date).getDate() : ''}
                  </span>
                </div>

                {/* Content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="text-base">{getEventEmoji(event.type)}</span>
                    <p className="font-bold text-[#1B2445] dark:text-white text-sm leading-tight truncate">{event.title}</p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap mt-1">
                    <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">
                      {event.dayOfWeek || event.type}
                    </span>
                    {event.lunarDate && (
                      <>
                        <span className="w-1 h-1 bg-slate-300 rounded-full" />
                        <span className="text-[11px] font-medium text-slate-400 dark:text-slate-500">🌙 {event.lunarDate}</span>
                      </>
                    )}
                    {event.note && (
                      <p className="w-full text-[11px] text-slate-400 dark:text-slate-500 truncate mt-0.5">{event.note}</p>
                    )}
                  </div>
                </div>

                {/* Urgency badge */}
                <div className="shrink-0 flex flex-col items-end gap-2">
                  <span className={`text-xs font-extrabold px-2 py-0.5 rounded-full ${badge.cls}`}>
                    {badge.label}
                  </span>
                  <ChevronRight size={14} className="text-slate-300 dark:text-slate-600" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
