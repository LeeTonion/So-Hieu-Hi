import React from 'react';
import { Home, Users, Calendar, BookOpen, Plus } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const { activeTab, navigateTo, currentScreen } = useApp();

  // Hide bottom nav on full-screen flows like PIN lock, Auth, Voice Recorder, Guest Web Invite view
  const hideOnScreens = [
    'auth',
    'pin',
    'envelope-recorder',
    'guest-invite-web'
  ];

  if (hideOnScreens.includes(currentScreen)) {
    return null;
  }

  const tabs = [
    { id: 'home', label: 'Trang chủ', icon: Home, route: 'home' },
    { id: 'people', label: 'Mọi người', icon: Users, route: 'people' },
    // Center floating '+' button is rendered separately
    { id: 'calendar', label: 'Lịch', icon: Calendar, route: 'calendar' },
    { id: 'ledger', label: 'Sổ ghi', icon: BookOpen, route: 'ledger' }
  ];

  return (
    <div className="sticky bottom-0 left-0 right-0 z-40 bg-white/95 dark:bg-[#161F33]/95 backdrop-blur-md border-t border-slate-100 dark:border-slate-800 px-3 py-2 flex items-center justify-around">
      {/* First 2 tabs */}
      {tabs.slice(0, 2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigateTo(tab.route)}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
              isActive ? 'text-[#E0285C] dark:text-[#F0573F]' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
          </button>
        );
      })}

      {/* Floating Center '+' Button */}
      <div className="relative -top-5 flex justify-center items-center">
        <button
          onClick={() => navigateTo('add-entry')}
          className="w-14 h-14 rounded-full bg-gradient-to-r from-[#F0573F] to-[#E0285C] text-white flex items-center justify-center shadow-lg shadow-pink-500/40 hover:scale-105 active:scale-95 transition-all border-4 border-white dark:border-[#0D1322]"
          title="Ghi sổ mới"
        >
          <Plus size={30} strokeWidth={3} />
        </button>
      </div>

      {/* Last 2 tabs */}
      {tabs.slice(2, 4).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            onClick={() => navigateTo(tab.route)}
            className={`flex flex-col items-center gap-1 transition-all py-1 px-3 rounded-xl ${
              isActive ? 'text-[#E0285C] dark:text-[#F0573F]' : 'text-slate-400 dark:text-slate-500 hover:text-slate-600'
            }`}
          >
            <Icon size={22} strokeWidth={isActive ? 2.5 : 1.8} />
            <span className={`text-[11px] ${isActive ? 'font-bold' : 'font-medium'}`}>{tab.label}</span>
          </button>
        );
      })}
    </div>
  );
};
