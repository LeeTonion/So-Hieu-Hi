import React from 'react';
import { useApp } from '../context/AppContext';
import { Mascot } from '../components/Mascot';
import { Bell, ChevronRight, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Sparkles, Settings } from 'lucide-react';

export const HomeScreen = () => {
  const { user, setUser, events, navigateTo, formatVND, formatVNDPure, transactions, weddingChecklist } = useApp();

  const totalReceived = transactions.filter(t => t.type === 'received').reduce((s, t) => s + t.amount, 0);
  const totalGiven = transactions.filter(t => t.type === 'given').reduce((s, t) => s + t.amount, 0);
  const balance = totalReceived - totalGiven;

  const hideAmount = user.hideAmountOnHome;
  const toggleHide = () => setUser(prev => ({ ...prev, hideAmountOnHome: !prev.hideAmountOnHome }));

  const upcomingEvents = events.slice(0, 3);
  const recentTransactions = transactions.slice(0, 5);
  const weddingProgress = weddingChecklist.filter(w => w.done).length;
  const weddingTotal = weddingChecklist.length;

  return (
    <div className="flex-1 overflow-y-auto pb-20" style={{ backgroundColor: 'var(--color-bg-light)' }}>
      {/* Gradient Header */}
      <div className="bg-gradient-to-br from-[#E0285C] via-[#F0573F] to-[#FFB938] px-5 pt-12 pb-20 relative overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/10 -translate-y-24 translate-x-20" />
        <div className="absolute bottom-0 left-0 w-48 h-48 rounded-full bg-white/10 translate-y-16 -translate-x-16" />

        <div className="relative z-10 flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white font-bold text-sm border-2 border-white/40 cursor-pointer"
              onClick={() => navigateTo('settings')}
            >
              {user.avatar}
            </div>
            <div>
              <p className="text-white/80 text-xs font-medium">Xin chào,</p>
              <p className="text-white font-bold text-base">{user.name} 👋</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={toggleHide} className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all">
              {hideAmount ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
            <button className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center text-white hover:bg-white/30 transition-all relative">
              <Bell size={16} />
              <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#FFB938] rounded-full border border-white" />
            </button>
          </div>
        </div>

        {/* Balance Summary */}
        <div className="relative z-10 text-center">
          <p className="text-white/70 text-xs uppercase tracking-widest mb-1 font-semibold">Số dư ròng</p>
          <p className="text-white font-extrabold text-4xl tracking-tight mb-1">
            {hideAmount ? '••••••••' : formatVNDPure(balance)}
          </p>
          <div className="flex items-center justify-center gap-4 mt-3">
            <div className="flex items-center gap-1.5 text-white/90">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><ArrowDownLeft size={12} /></div>
              <div>
                <p className="text-[10px] text-white/70">Nhận về</p>
                <p className="text-sm font-bold">{hideAmount ? '••••' : formatVNDPure(totalReceived)}</p>
              </div>
            </div>
            <div className="w-px h-8 bg-white/30" />
            <div className="flex items-center gap-1.5 text-white/90">
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"><ArrowUpRight size={12} /></div>
              <div>
                <p className="text-[10px] text-white/70">Đã mừng</p>
                <p className="text-sm font-bold">{hideAmount ? '••••' : formatVNDPure(totalGiven)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Cards overlapping the header */}
      <div className="px-4 -mt-12 relative z-20 space-y-4">
        {/* Wedding Planning Card */}
        <div
          className="bg-white dark:bg-[#161F33] rounded-3xl p-5 shadow-xl shadow-pink-900/10 cursor-pointer hover:shadow-2xl transition-all active:scale-98 border border-rose-100/60 dark:border-rose-900/20"
          onClick={() => navigateTo('wedding-hub')}
        >
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-rose-400 to-[#E0285C] flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-rose-500/30">💍</div>
              <div>
                <p className="font-extrabold text-[#1B2445] dark:text-white text-sm">{user.wedding.couple}</p>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Tiệc cưới · {user.wedding.date}</p>
              </div>
            </div>
            <ChevronRight size={18} className="text-slate-400" />
          </div>
          <div className="relative">
            <div className="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-rose-400 to-[#E0285C] transition-all"
                style={{ width: `${Math.round((weddingProgress / weddingTotal) * 100)}%` }}
              />
            </div>
            <div className="flex items-center justify-between mt-2">
              <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">Checklist chuẩn bị</p>
              <p className="text-[11px] text-[#E0285C] font-bold">{weddingProgress}/{weddingTotal} bước</p>
            </div>
          </div>
          {/* Wedding stats mini row */}
          <div className="flex items-center gap-3 mt-3 pt-3 border-t border-slate-100 dark:border-slate-700">
            <div className="text-center flex-1">
              <p className="text-[13px] font-bold text-[#1B2445] dark:text-white">{user.wedding.confirmedGuests}</p>
              <p className="text-[10px] text-[#0B8A63] font-semibold">Xác nhận</p>
            </div>
            <div className="w-px h-6 bg-slate-100 dark:bg-slate-700" />
            <div className="text-center flex-1">
              <p className="text-[13px] font-bold text-[#1B2445] dark:text-white">{user.wedding.pendingGuests}</p>
              <p className="text-[10px] text-amber-500 font-semibold">Chờ trả lời</p>
            </div>
            <div className="w-px h-6 bg-slate-100 dark:bg-slate-700" />
            <div className="text-center flex-1">
              <p className="text-[13px] font-bold text-[#1B2445] dark:text-white">{user.wedding.totalGuests}</p>
              <p className="text-[10px] text-slate-400 font-semibold">Tổng khách</p>
            </div>
          </div>
        </div>

        {/* Upcoming Events Section */}
        <div className="bg-white dark:bg-[#161F33] rounded-3xl p-5 shadow-lg shadow-slate-100/50 dark:shadow-black/30 border border-slate-100/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Sparkles size={15} className="text-amber-500" />
              <h2 className="font-extrabold text-[#1B2445] dark:text-white text-base">Sắp đến</h2>
            </div>
            <button onClick={() => navigateTo('calendar')} className="text-xs text-[#E0285C] font-bold">Xem tất cả</button>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div
                key={event.id}
                className="flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-[#1E2B45] cursor-pointer hover:bg-rose-50 dark:hover:bg-slate-700 transition-all"
                onClick={() => navigateTo('event-detail', { eventId: event.id })}
              >
                <div className={`w-10 h-10 rounded-xl flex flex-col items-center justify-center text-white text-[10px] font-bold shrink-0 ${
                  event.type === 'Cưới hỏi' || event.type === 'Hỉ' ? 'bg-gradient-to-br from-rose-400 to-[#E0285C]' :
                  event.type === 'Ngày giỗ' || event.type === 'Hiếu' ? 'bg-gradient-to-br from-slate-500 to-[#1B2445]' :
                  'bg-gradient-to-br from-amber-400 to-orange-500'
                }`}>
                  <span className="text-[16px]">
                    {event.type === 'Cưới hỏi' ? '💍' :
                     event.type === 'Ngày giỗ' ? '🕯️' :
                     event.type === 'Sinh nhật' ? '🎂' :
                     event.type === 'Thôi nôi' ? '👶' : '📅'}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[#1B2445] dark:text-white text-sm leading-tight truncate">{event.title}</p>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium mt-0.5 truncate">{event.household || event.type}</p>
                </div>
                <div className="text-right shrink-0">
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    event.daysLeft <= 3 ? 'bg-red-100 text-red-600' :
                    event.daysLeft <= 7 ? 'bg-amber-100 text-amber-600' :
                    'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-300'
                  }`}>
                    {event.daysLeft === 0 ? 'Hôm nay' : `${event.daysLeft} ngày`}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="bg-white dark:bg-[#161F33] rounded-3xl p-5 shadow-lg shadow-slate-100/50 dark:shadow-black/30 border border-slate-100/80 dark:border-slate-800">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-extrabold text-[#1B2445] dark:text-white text-base">Giao dịch gần đây</h2>
            <button onClick={() => navigateTo('ledger')} className="text-xs text-[#E0285C] font-bold">Xem sổ</button>
          </div>
          <div className="space-y-2.5">
            {recentTransactions.map(tx => (
              <div
                key={tx.id}
                className="flex items-center gap-3 cursor-pointer hover:bg-slate-50 dark:hover:bg-[#1E2B45] rounded-xl p-2 -mx-2 transition-all"
                onClick={() => navigateTo('person-detail', { personId: tx.personId })}
              >
                <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0 ${
                  tx.type === 'received' ? 'bg-gradient-to-br from-emerald-400 to-[#0B8A63]' : 'bg-gradient-to-br from-rose-400 to-[#E0285C]'
                }`}>
                  {tx.type === 'received' ? '↓' : '↑'}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-sm text-[#1B2445] dark:text-white truncate">{tx.personName}</p>
                  <p className="text-[11px] text-slate-400 dark:text-slate-500 font-medium truncate">{tx.occasion} · {tx.date}</p>
                </div>
                <span className={`font-extrabold text-sm shrink-0 ${tx.type === 'received' ? 'text-[#0B8A63]' : 'text-[#E0285C]'}`}>
                  {hideAmount ? '••••' : (tx.type === 'received' ? '+' : '-') + formatVNDPure(tx.amount)}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Mascot Footer */}
        <div className="flex flex-col items-center py-4">
          <Mascot state="hello" size={80} />
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-2 text-center">Mèo Lộc luôn giữ sổ cho bạn 🐾</p>
        </div>
      </div>
    </div>
  );
};
