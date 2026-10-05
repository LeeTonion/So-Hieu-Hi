import React, { useEffect } from 'react';
import './index.css';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNav } from './components/BottomNav';

// Screens
import { AuthScreen } from './screens/AuthScreen';
import { PinScreen } from './screens/PinScreen';
import { HomeScreen } from './screens/HomeScreen';
import { PeopleScreen } from './screens/PeopleScreen';
import { PersonDetailScreen } from './screens/PersonDetailScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { LedgerScreen } from './screens/LedgerScreen';
import { AddEntryScreen } from './screens/AddEntryScreen';
import { WeddingHubScreen } from './screens/WeddingHubScreen';
import { SettingsScreen } from './screens/SettingsScreen';
import { ForgotPinScreen } from './screens/ForgotPinScreen';
import { EnvelopeRecorderScreen } from './screens/EnvelopeRecorderScreen';
import { StatsScreen } from './screens/StatsScreen';

// Toast Notification
const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <div className="fixed bottom-24 left-1/2 -translate-x-1/2 z-50 px-5 py-3 bg-[#1B2445] dark:bg-white text-white dark:text-[#1B2445] rounded-2xl shadow-2xl font-semibold text-sm max-w-xs text-center animate-[fadeIn_0.2s_ease] pointer-events-none">
      {message}
    </div>
  );
};

const AppContent = () => {
  const { currentScreen, toastMessage, user } = useApp();

  // Apply dark/light class to frame
  const darkMode = user.theme === 'dark';

  const renderScreen = () => {
    switch (currentScreen) {
      case 'auth': return <AuthScreen />;
      case 'pin': return <PinScreen />;
      case 'home': return <HomeScreen />;
      case 'people': return <PeopleScreen />;
      case 'person-detail': return <PersonDetailScreen />;
      case 'calendar': return <CalendarScreen />;
      case 'ledger': return <LedgerScreen />;
      case 'add-entry': return <AddEntryScreen />;
      case 'add-event': return <AddEntryScreen />;
      case 'wedding-hub': return <WeddingHubScreen />;
      case 'settings': return <SettingsScreen />;
      case 'envelope-recorder': return <EnvelopeRecorderScreen />;
      case 'stats': return <StatsScreen />;
      // Stub screens — show a friendly placeholder
      default:
        return <PlaceholderScreen screenId={currentScreen} />;
    }
  };

  // Check if we need bottom nav
  const hideNavScreens = ['auth', 'pin', 'forgot-pin', 'envelope-recorder', 'add-entry', 'add-event', 'settings'];
  const showNav = !hideNavScreens.includes(currentScreen);

  return (
    <div className={`mobile-device-frame ${darkMode ? 'dark' : ''}`}>
      {/* Status Bar */}
      <div className={`flex items-center justify-between px-7 pt-3 pb-1 text-xs font-bold shrink-0 ${
        ['auth', 'pin'].includes(currentScreen)
          ? 'text-[#1B2445] dark:text-white'
          : currentScreen === 'envelope-recorder'
          ? 'text-white'
          : ['home'].includes(currentScreen)
          ? 'text-white'
          : 'text-[#1B2445] dark:text-white'
      }`} style={{ zIndex: 50 }}>
        <span>20:54</span>
        <div className="flex items-center gap-1">
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Screen Content */}
      <div className="flex-1 flex flex-col overflow-hidden screen-fade-enter" key={currentScreen}>
        {renderScreen()}
      </div>

      {/* Bottom Nav */}
      {showNav && <BottomNav />}

      {/* Toast */}
      <Toast message={toastMessage} />
    </div>
  );
};

// Stub placeholder for screens not yet built
const PlaceholderScreen = ({ screenId }) => {
  const { goBack } = useApp();
  const labels = {
    'wedding-rsvp': 'Quản lý RSVP',
    'wedding-guests': 'Danh sách khách',
    'wedding-card': 'Thiệp cưới',
    'wedding-composer': 'Soạn lời mời',
    'wedding-thanks': 'Cảm ơn khách',
    'envelope-audit': 'Kiểm tra phong bì',
    'event-detail': 'Chi tiết sự kiện',
    'family-detail': 'Chi tiết hộ gia đình',
    'add-contact': 'Thêm liên lạc',
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8F6FB] dark:bg-[#0D1322]">
      <div className="bg-white dark:bg-[#161F33] px-5 pt-12 pb-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <button
          onClick={goBack}
          className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1E2B45] flex items-center justify-center text-[#1B2445] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
        </button>
        <h1 className="text-xl font-extrabold text-[#1B2445] dark:text-white">{labels[screenId] || screenId}</h1>
      </div>
      <div className="flex-1 flex flex-col items-center justify-center text-center px-8 pb-20">
        <div className="w-24 h-24 rounded-full bg-rose-100 dark:bg-rose-900/20 flex items-center justify-center text-5xl mb-5 shadow-inner">
          🚧
        </div>
        <h2 className="text-xl font-extrabold text-[#1B2445] dark:text-white mb-2">{labels[screenId] || 'Màn hình mới'}</h2>
        <p className="text-slate-400 dark:text-slate-500 text-sm font-medium leading-relaxed">
          Màn hình này đang được xây dựng. Chức năng đầy đủ sẽ có trong bản chính thức.
        </p>
        <button
          onClick={goBack}
          className="mt-8 px-6 py-3 bg-gradient-to-r from-[#F0573F] to-[#E0285C] text-white rounded-2xl font-bold text-sm shadow-lg shadow-rose-500/30 hover:shadow-xl active:scale-95 transition-all"
        >
          ← Quay lại
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
