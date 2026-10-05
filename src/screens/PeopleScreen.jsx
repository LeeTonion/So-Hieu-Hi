import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Plus, Users, ChevronRight, Phone, MessageCircle, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const PeopleScreen = () => {
  const { contacts, families, navigateTo } = useApp();
  const [tab, setTab] = useState('contacts'); // 'contacts' | 'families'
  const [query, setQuery] = useState('');

  const filteredContacts = contacts.filter(c =>
    c.name.toLowerCase().includes(query.toLowerCase()) ||
    (c.relationship || '').toLowerCase().includes(query.toLowerCase())
  );

  const filteredFamilies = families.filter(f =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F6FB] dark:bg-[#0D1322]">
      {/* Header */}
      <div className="bg-white dark:bg-[#161F33] px-5 pt-12 pb-4 shadow-sm dark:shadow-slate-900/50">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-extrabold text-[#1B2445] dark:text-white tracking-tight">Mọi người</h1>
          <button
            onClick={() => navigateTo('add-contact')}
            className="w-9 h-9 rounded-full bg-gradient-to-br from-rose-400 to-[#E0285C] text-white flex items-center justify-center shadow-md shadow-rose-500/30 hover:scale-105 active:scale-95 transition-all"
          >
            <Plus size={20} strokeWidth={3} />
          </button>
        </div>
        {/* Search */}
        <div className="relative mb-4">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên, quan hệ..."
            value={query}
            onChange={e => setQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-2xl bg-slate-100 dark:bg-[#1E2B45] text-sm text-[#1B2445] dark:text-white placeholder-slate-400 border-0 outline-none focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 transition-all"
          />
        </div>
        {/* Tab Switcher */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-[#1E2B45] p-1">
          {[{ id: 'contacts', label: 'Danh bạ', count: contacts.length }, { id: 'families', label: 'Hộ gia đình', count: families.length }].map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 py-2 rounded-xl text-sm font-bold transition-all ${
                tab === t.id
                  ? 'bg-white dark:bg-[#161F33] text-[#E0285C] shadow-sm'
                  : 'text-slate-500 dark:text-slate-400'
              }`}
            >
              {t.label}
              <span className={`ml-1.5 text-[11px] px-1.5 py-0.5 rounded-full ${
                tab === t.id ? 'bg-rose-100 text-rose-500 dark:bg-rose-900/40' : 'bg-slate-200 dark:bg-slate-700 text-slate-500'
              }`}>{t.count}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3">
        {tab === 'contacts' ? (
          filteredContacts.length === 0 ? (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500">
              <p className="text-4xl mb-3">🔍</p>
              <p className="font-semibold">Không tìm thấy</p>
            </div>
          ) : (
            filteredContacts.map(contact => (
              <ContactCard key={contact.id} contact={contact} onPress={() => navigateTo('person-detail', { personId: contact.id })} />
            ))
          )
        ) : (
          filteredFamilies.length === 0 ? (
            <div className="text-center py-16 text-slate-400 dark:text-slate-500">
              <p className="text-4xl mb-3">🏠</p>
              <p className="font-semibold">Chưa có hộ nào</p>
            </div>
          ) : (
            filteredFamilies.map(family => (
              <FamilyCard key={family.id} family={family} onPress={() => navigateTo('family-detail', { familyId: family.id })} />
            ))
          )
        )}
      </div>
    </div>
  );
};

const ContactCard = ({ contact, onPress }) => {
  const balance = contact.netBalance;
  return (
    <div
      onClick={onPress}
      className="bg-white dark:bg-[#161F33] rounded-2xl p-4 shadow-sm dark:shadow-black/20 border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-md dark:hover:bg-[#1E2B45] hover:-translate-y-0.5 transition-all active:scale-98"
    >
      <div className="flex items-center gap-3">
        {/* Avatar */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-300 via-pink-400 to-rose-500 flex items-center justify-center text-white font-bold text-base shrink-0 shadow-md shadow-rose-200">
          {contact.name.charAt(0)}
        </div>
        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[#1B2445] dark:text-white text-base truncate">{contact.name}</p>
            {contact.hasZalo && (
              <span className="shrink-0 text-[10px] bg-blue-100 text-blue-600 dark:bg-blue-900/40 dark:text-blue-300 font-bold px-1.5 py-0.5 rounded-full">Zalo</span>
            )}
          </div>
          <p className="text-xs text-slate-400 dark:text-slate-500 font-medium mt-0.5 truncate">{contact.relationship}</p>
          {contact.birthday && (
            <p className="text-[11px] text-amber-500 dark:text-amber-400 font-semibold mt-0.5">🎂 {contact.birthday} · {contact.birthdayNotice}</p>
          )}
        </div>
        {/* Balance */}
        <div className="text-right shrink-0 ml-1">
          <div className={`flex items-center gap-1 justify-end font-bold text-sm ${
            balance > 0 ? 'text-[#0B8A63]' : balance < 0 ? 'text-[#E0285C]' : 'text-slate-400'
          }`}>
            {balance > 0 ? <TrendingUp size={14} /> : balance < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
            <span>{Math.abs(balance) >= 1000000 ? `${(Math.abs(balance) / 1000000).toFixed(1)}tr` : `${(Math.abs(balance) / 1000).toFixed(0)}k`}</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{contact.history?.length || 0} lần</p>
        </div>
      </div>
    </div>
  );
};

const FamilyCard = ({ family, onPress }) => {
  const balance = family.netBalance;
  return (
    <div
      onClick={onPress}
      className="bg-white dark:bg-[#161F33] rounded-2xl p-4 shadow-sm dark:shadow-black/20 border border-slate-100 dark:border-slate-800 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all active:scale-98"
    >
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-300 to-orange-400 flex items-center justify-center shrink-0 shadow-md shadow-amber-200">
          <Users size={20} className="text-white" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="font-bold text-[#1B2445] dark:text-white text-base truncate">{family.name}</p>
          </div>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">{family.category}</span>
            <span className="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600 shrink-0" />
            <span className="text-[11px] text-slate-400 dark:text-slate-500">{family.membersCount} thành viên</span>
          </div>
          {family.upcomingEvent && (
            <p className="text-[11px] text-amber-500 dark:text-amber-400 font-semibold mt-0.5 truncate">⏰ {family.upcomingEvent}</p>
          )}
        </div>
        <div className="text-right shrink-0 ml-1">
          <div className={`flex items-center gap-1 justify-end font-bold text-sm ${
            balance > 0 ? 'text-[#0B8A63]' : balance < 0 ? 'text-[#E0285C]' : 'text-slate-400'
          }`}>
            {balance > 0 ? <TrendingUp size={14} /> : balance < 0 ? <TrendingDown size={14} /> : <Minus size={14} />}
            <span>{Math.abs(balance) >= 1000000 ? `${(Math.abs(balance) / 1000000).toFixed(1)}tr` : `${(Math.abs(balance) / 1000).toFixed(0)}k`}</span>
          </div>
          <p className="text-[11px] text-slate-400 dark:text-slate-500 mt-0.5">{family.interactionCount} lần</p>
        </div>
      </div>
    </div>
  );
};
