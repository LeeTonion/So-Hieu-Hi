import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Plus, Phone, MessageCircle, TrendingUp, TrendingDown, MoreVertical, Edit3, Trash2, Star } from 'lucide-react';

export const PersonDetailScreen = () => {
  const { contacts, selectedPersonId, goBack, navigateTo, formatVNDPure, showToast } = useApp();
  const [activeTab, setActiveTab] = useState('history');

  const contact = contacts.find(c => c.id === selectedPersonId);
  if (!contact) return null;

  const balance = contact.netBalance;
  const balancePositive = balance > 0;

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F6FB] dark:bg-[#0D1322]">
      {/* Gradient Header */}
      <div className="relative bg-gradient-to-br from-[#1B2445] via-[#2D3B6E] to-[#1B2445] px-5 pt-12 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-rose-900/30 to-transparent" />
        <button onClick={goBack} className="relative z-10 w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-all mb-5">
          <ArrowLeft size={18} />
        </button>
        <div className="relative z-10 flex items-center gap-4 mb-4">
          {/* Avatar */}
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-rose-400 to-[#E0285C] flex items-center justify-center text-white font-extrabold text-2xl shadow-xl shadow-rose-900/50">
            {contact.name.charAt(0)}
          </div>
          <div className="flex-1 min-w-0">
            <h1 className="text-white font-extrabold text-xl tracking-tight">{contact.name}</h1>
            <p className="text-white/70 text-sm font-medium">{contact.relationship}</p>
            {contact.familyRole && <p className="text-white/50 text-xs mt-0.5">{contact.familyRole}</p>}
          </div>
          <button className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center text-white hover:bg-white/25 transition-all">
            <MoreVertical size={18} />
          </button>
        </div>

        {/* Contact Actions Row */}
        <div className="relative z-10 flex items-center gap-3 mb-4">
          {contact.phone && (
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/15 rounded-xl text-white text-sm font-bold hover:bg-white/25 active:scale-95 transition-all"
              onClick={() => showToast(`Gọi cho ${contact.name}: ${contact.phone}`)}
            >
              <Phone size={14} />
              Gọi
            </button>
          )}
          {contact.hasZalo && (
            <button
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold hover:opacity-90 active:scale-95 transition-all"
              style={{ background: '#06C755', color: '#FFFFFF' }}
              onClick={() => showToast(`Mở Zalo cho ${contact.name}`)}
            >
              <MessageCircle size={14} />
              Zalo
            </button>
          )}
          <button
            className="flex-1 flex items-center justify-center gap-2 py-2.5 bg-white/15 rounded-xl text-white text-sm font-bold hover:bg-white/25 active:scale-95 transition-all"
            onClick={() => navigateTo('add-entry')}
          >
            <Plus size={14} />
            Ghi sổ
          </button>
        </div>
      </div>

      {/* Balance Stats Card (overlapping) */}
      <div className="px-4 -mt-12 relative z-20">
        <div className="bg-white dark:bg-[#161F33] rounded-3xl p-4 shadow-xl dark:shadow-black/40 border border-slate-100 dark:border-slate-800 mb-4">
          <div className="grid grid-cols-3 divide-x divide-slate-100 dark:divide-slate-700">
            <div className="text-center pr-4">
              <div className="flex items-center justify-center gap-1 mb-1">
                <ArrowDownLeft size={12} className="text-[#0B8A63]" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">Nhận về</span>
              </div>
              <p className="text-[#0B8A63] font-extrabold text-base">{formatVNDPure(contact.receivedFrom)}</p>
            </div>
            <div className="text-center px-4">
              <div className="flex items-center justify-center gap-1 mb-1">
                <ArrowUpRight size={12} className="text-[#E0285C]" />
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">Đã tặng</span>
              </div>
              <p className="text-[#E0285C] font-extrabold text-base">{formatVNDPure(contact.givenTo)}</p>
            </div>
            <div className="text-center pl-4">
              <div className="flex items-center justify-center gap-1 mb-1">
                {balancePositive ? <TrendingUp size={12} className="text-[#0B8A63]" /> : <TrendingDown size={12} className="text-[#E0285C]" />}
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold uppercase tracking-wide">Ròng</span>
              </div>
              <p className={`font-extrabold text-base ${balancePositive ? 'text-[#0B8A63]' : 'text-[#E0285C]'}`}>
                {balance > 0 ? '+' : ''}{formatVNDPure(balance)}
              </p>
            </div>
          </div>

          {balance !== 0 && (
            <div className={`mt-3 pt-3 border-t border-slate-100 dark:border-slate-700 flex items-center gap-2 rounded-xl p-2 ${
              balancePositive ? 'bg-green-50 dark:bg-green-900/10' : 'bg-rose-50 dark:bg-rose-900/10'
            }`}>
              <span className="text-base">{balancePositive ? '👋' : '🤝'}</span>
              <p className={`text-xs font-semibold ${balancePositive ? 'text-[#0B8A63]' : 'text-[#E0285C]'}`}>
                {balancePositive
                  ? `${contact.name} còn nợ bạn ${formatVNDPure(balance)}.`
                  : `Bạn còn nợ ${contact.name} ${formatVNDPure(Math.abs(balance))}.`}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Tabs & History Content */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="flex rounded-2xl bg-white dark:bg-[#161F33] shadow-sm border border-slate-100 dark:border-slate-800 p-1 mb-4">
          {[{ id: 'history', label: 'Lịch sử' }, { id: 'info', label: 'Thông tin' }].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                activeTab === t.id
                  ? 'bg-gradient-to-r from-rose-400 to-[#E0285C] text-white shadow-sm'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {activeTab === 'history' ? (
          <div className="space-y-3">
            {(contact.history || []).length === 0 ? (
              <div className="text-center py-12 text-slate-400 dark:text-slate-500">
                <p className="text-3xl mb-3">📋</p>
                <p className="font-semibold text-sm">Chưa có lịch sử giao dịch</p>
              </div>
            ) : (
              (contact.history || []).map(h => (
                <div key={h.id} className="bg-white dark:bg-[#161F33] rounded-2xl p-4 border border-slate-100 dark:border-slate-800 shadow-sm flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-lg shrink-0 ${
                    h.direction === 'received' ? 'bg-green-100 dark:bg-green-900/30' : 'bg-rose-100 dark:bg-rose-900/30'
                  }`}>
                    {h.type === 'Hỉ' ? '💍' : '🕯️'}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-[#1B2445] dark:text-white text-sm truncate">{h.title}</p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 mt-0.5">{h.date}</p>
                  </div>
                  <p className={`font-extrabold text-sm shrink-0 ${h.direction === 'received' ? 'text-[#0B8A63]' : 'text-[#E0285C]'}`}>
                    {h.direction === 'received' ? '+' : '-'}{formatVNDPure(h.amount)}
                  </p>
                </div>
              ))
            )}
          </div>
        ) : (
          <div className="bg-white dark:bg-[#161F33] rounded-2xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
            {[
              { label: 'Xưng hô', value: contact.salutation },
              { label: 'Quan hệ', value: contact.relationship },
              { label: 'Số điện thoại', value: contact.phone },
              { label: 'Zalo', value: contact.hasZalo ? 'Có' : 'Không' },
              { label: 'Hộ gia đình', value: contact.familyId ? 'Nhà cô Tươi' : 'Độc lập' },
              { label: 'Vai trò', value: contact.familyRole || '—' },
              { label: 'Sinh nhật', value: contact.birthday ? `${contact.birthday} (${contact.birthdayType})` : '—' },
            ].map((item, i) => (
              <div key={i} className={`flex items-center justify-between px-4 py-3.5 ${i > 0 ? 'border-t border-slate-100 dark:border-slate-800' : ''}`}>
                <span className="text-xs text-slate-400 dark:text-slate-500 font-semibold uppercase tracking-wide">{item.label}</span>
                <span className="text-sm font-bold text-[#1B2445] dark:text-white">{item.value || '—'}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
