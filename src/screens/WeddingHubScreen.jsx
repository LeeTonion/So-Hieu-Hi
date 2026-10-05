import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ChevronRight, CheckCircle2, Circle, Users, ExternalLink, Mic, Bell, Heart } from 'lucide-react';
import { Mascot } from '../components/Mascot';

export const WeddingHubScreen = () => {
  const { user, weddingChecklist, setWeddingChecklist, goBack, navigateTo } = useApp();

  const completedCount = weddingChecklist.filter(w => w.done).length;
  const totalCount = weddingChecklist.length;
  const progress = completedCount / totalCount;

  const weddingDate = new Date(user.wedding.date);
  const today = new Date();
  const daysLeft = Math.ceil((weddingDate - today) / (1000 * 60 * 60 * 24));

  const toggleItem = (id) => {
    setWeddingChecklist(prev =>
      prev.map(w => w.id === id ? { ...w, done: !w.done } : w)
    );
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F6FB] dark:bg-[#0D1322]">
      {/* Hero Header */}
      <div className="relative bg-gradient-to-br from-[#E0285C] via-[#F0573F] to-[#FFB938] px-5 pt-12 pb-24 overflow-hidden">
        <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-white/10 -translate-y-32 translate-x-20" />
        <button onClick={goBack} className="relative z-10 w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all mb-6">
          <ArrowLeft size={18} />
        </button>
        <div className="relative z-10">
          <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">Đám cưới của</p>
          <h1 className="text-white font-extrabold text-2xl tracking-tight mb-0.5">{user.wedding.couple}</h1>
          <p className="text-white/80 text-sm font-medium mb-4">📅 {user.wedding.date} · {user.wedding.time}</p>

          {/* Progress */}
          <div className="h-2.5 bg-white/20 rounded-full overflow-hidden mb-2">
            <div
              className="h-full rounded-full bg-white transition-all duration-500"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="flex items-center justify-between">
            <p className="text-white/80 text-xs font-medium">{completedCount}/{totalCount} bước hoàn thành</p>
            <p className="text-white font-bold text-sm">⏰ Còn {daysLeft} ngày</p>
          </div>
        </div>
      </div>

      {/* Guest Stats Card (overlapping) */}
      <div className="px-4 -mt-14 relative z-20 mb-4">
        <div className="bg-white dark:bg-[#161F33] rounded-3xl p-4 shadow-xl dark:shadow-black/40 border border-slate-100 dark:border-slate-800">
          <div className="grid grid-cols-4 divide-x divide-slate-100 dark:divide-slate-700 text-center">
            {[
              { label: 'Tổng', count: user.wedding.totalGuests, color: 'text-[#1B2445] dark:text-white' },
              { label: 'Xác nhận', count: user.wedding.confirmedGuests, color: 'text-[#0B8A63]' },
              { label: 'Chờ', count: user.wedding.pendingGuests, color: 'text-amber-500' },
              { label: 'Từ chối', count: user.wedding.declinedGuests, color: 'text-slate-400' },
            ].map((s, i) => (
              <div key={i} className="px-2">
                <p className={`font-extrabold text-lg ${s.color}`}>{s.count}</p>
                <p className="text-[10px] text-slate-400 dark:text-slate-500 font-semibold">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 space-y-2.5">
        <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-3 px-1">Checklist chuẩn bị</p>
        {weddingChecklist.map((item, index) => (
          <div
            key={item.id}
            className={`bg-white dark:bg-[#161F33] rounded-2xl p-4 border shadow-sm transition-all ${
              item.done
                ? 'border-green-200 dark:border-green-900/30 bg-green-50/50 dark:bg-green-900/5'
                : 'border-slate-100 dark:border-slate-800'
            }`}
          >
            <div className="flex items-center gap-3">
              <button
                onClick={() => toggleItem(item.id)}
                className={`shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                  item.done
                    ? 'bg-[#0B8A63] text-white'
                    : 'border-2 border-slate-200 dark:border-slate-600'
                }`}
              >
                {item.done && <CheckCircle2 size={16} />}
              </button>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className={`font-bold text-sm ${item.done ? 'text-slate-400 dark:text-slate-500 line-through' : 'text-[#1B2445] dark:text-white'}`}>
                    {item.stepNumber ? `Bước ${item.stepNumber}: ` : ''}{item.title}
                  </p>
                  {item.badge && (
                    <span className="text-[10px] bg-amber-100 text-amber-600 dark:bg-amber-900/30 dark:text-amber-300 font-bold px-2 py-0.5 rounded-full">{item.badge}</span>
                  )}
                </div>
                <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5 font-medium">{item.desc}</p>
              </div>
              {!item.done && (
                <button
                  onClick={() => navigateTo(item.route || 'wedding-hub')}
                  className="shrink-0 w-8 h-8 rounded-full bg-slate-100 dark:bg-[#1E2B45] flex items-center justify-center text-slate-500 dark:text-slate-400 hover:bg-rose-100 dark:hover:bg-rose-900/30 hover:text-[#E0285C] transition-all"
                >
                  <ChevronRight size={14} />
                </button>
              )}
            </div>
          </div>
        ))}

        {/* Card Link Section */}
        <div className="bg-gradient-to-r from-[#1B2445] to-[#2D3B6E] rounded-2xl p-4 shadow-md text-white mt-4">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Heart size={16} className="text-rose-400 fill-rose-400" />
              <p className="font-bold text-sm">Link thiệp cưới</p>
            </div>
            <button
              onClick={() => showToast('Đã sao chép link thiệp!')}
              className="text-[10px] font-bold bg-white/20 px-2 py-1 rounded-full hover:bg-white/30 transition-all"
            >
              Sao chép
            </button>
          </div>
          <p className="text-white/60 text-[11px] font-medium truncate">{user.wedding.cardLink}</p>
        </div>

        {/* Action Shortcuts */}
        <div className="grid grid-cols-2 gap-3 mt-2">
          <button
            onClick={() => navigateTo('envelope-recorder')}
            className="bg-white dark:bg-[#161F33] border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-98"
          >
            <Mic size={22} className="text-[#E0285C] mx-auto mb-2" />
            <p className="font-bold text-[#1B2445] dark:text-white text-sm">Ghi phong bì</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">Đọc to — app tự ghi</p>
          </button>
          <button
            onClick={() => navigateTo('wedding-rsvp')}
            className="bg-white dark:bg-[#161F33] border border-slate-100 dark:border-slate-800 rounded-2xl p-4 text-center shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-98"
          >
            <Users size={22} className="text-[#0B8A63] mx-auto mb-2" />
            <p className="font-bold text-[#1B2445] dark:text-white text-sm">Quản lý RSVP</p>
            <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">47 chờ trả lời</p>
          </button>
        </div>
      </div>
    </div>
  );
};
