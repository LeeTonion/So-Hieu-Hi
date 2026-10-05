import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_USER,
  INITIAL_TRANSACTIONS,
  INITIAL_CONTACTS,
  INITIAL_FAMILIES,
  INITIAL_EVENTS,
  WEDDING_CHECKLIST,
  STATS_2026
} from '../data/mockData';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Navigation & Flow State
  const [currentScreen, setCurrentScreen] = useState('intro'); // start at Intro screen
  const [activeTab, setActiveTab] = useState('home'); // bottom nav tab: 'home' | 'people' | 'calendar' | 'ledger'
  const [screenHistory, setScreenHistory] = useState(['home']);
  const [appMode, setAppMode] = useState('app'); // 'app' | 'flow-map' | 'brand-kit'

  // User & Theme State
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('so_hieu_hi_user');
    return saved ? JSON.parse(saved) : INITIAL_USER;
  });

  const [isPinUnlocked, setIsPinUnlocked] = useState(false);

  // Data Collections
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('so_hieu_hi_transactions');
    return saved ? JSON.parse(saved) : INITIAL_TRANSACTIONS;
  });

  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('so_hieu_hi_contacts');
    return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
  });

  const [families, setFamilies] = useState(() => {
    const saved = localStorage.getItem('so_hieu_hi_families');
    return saved ? JSON.parse(saved) : INITIAL_FAMILIES;
  });

  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem('so_hieu_hi_events');
    return saved ? JSON.parse(saved) : INITIAL_EVENTS;
  });

  const [weddingChecklist, setWeddingChecklist] = useState(WEDDING_CHECKLIST);

  // Selected Item details for detail screens
  const [selectedPersonId, setSelectedPersonId] = useState('c1'); // default Cô Tươi
  const [selectedFamilyId, setSelectedFamilyId] = useState('f1'); // default Nhà cô Tươi
  const [selectedEventId, setSelectedEventId] = useState('e1'); // default Sinh nhật chú Hùng

  // Toast / Feedback State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('so_hieu_hi_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('so_hieu_hi_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Navigation helpers
  const navigateTo = (screenId, params = {}) => {
    if (params.personId) setSelectedPersonId(params.personId);
    if (params.familyId) setSelectedFamilyId(params.familyId);
    if (params.eventId) setSelectedEventId(params.eventId);

    // Update bottom nav tab if screen is main tab screen
    if (['home', 'people', 'calendar', 'ledger'].includes(screenId)) {
      setActiveTab(screenId);
    }

    setScreenHistory((prev) => [...prev, screenId]);
    setCurrentScreen(screenId);
  };

  const goBack = () => {
    if (screenHistory.length > 1) {
      const nextHistory = [...screenHistory];
      nextHistory.pop();
      const prevScreen = nextHistory[nextHistory.length - 1];
      setScreenHistory(nextHistory);
      setCurrentScreen(prevScreen);
      if (['home', 'people', 'calendar', 'ledger'].includes(prevScreen)) {
        setActiveTab(prevScreen);
      }
    } else {
      setCurrentScreen('home');
      setActiveTab('home');
    }
  };

  // Business Logic: Add Transaction
  const addTransaction = (newTx) => {
    const txObj = {
      id: `t_${Date.now()}`,
      ...newTx,
      monthGroup: `Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`
    };
    setTransactions((prev) => [txObj, ...prev]);

    // Update recipient contact balance if exists
    if (newTx.personId) {
      setContacts((prev) =>
        prev.map((c) => {
          if (c.id === newTx.personId) {
            const addedRecv = newTx.type === 'received' ? newTx.amount : 0;
            const addedGiven = newTx.type === 'given' ? newTx.amount : 0;
            return {
              ...c,
              receivedFrom: c.receivedFrom + addedRecv,
              givenTo: c.givenTo + addedGiven,
              netBalance: c.netBalance + (addedRecv - addedGiven),
              history: [
                {
                  id: `h_${Date.now()}`,
                  title: newTx.occasion,
                  type: newTx.categoryType || 'Hỉ',
                  date: newTx.date,
                  amount: newTx.amount,
                  direction: newTx.type
                },
                ...c.history
              ]
            };
          }
          return c;
        })
      );
    }
    showToast(`Đã lưu khoản ${newTx.type === 'received' ? 'được mừng' : 'đi mừng'} thành công!`);
  };

  // Helper formatting for VND currency
  const formatVND = (num) => {
    if (num === null || num === undefined) return '0đ';
    const abs = Math.abs(num);
    const formatted = new Intl.NumberFormat('vi-VN').format(abs);
    return `${num < 0 ? '-' : num > 0 ? '+' : ''}${formatted}đ`;
  };

  const formatVNDPure = (num) => {
    return new Intl.NumberFormat('vi-VN').format(Math.abs(num)) + 'đ';
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        activeTab,
        appMode,
        setAppMode,
        navigateTo,
        goBack,
        user,
        setUser,
        isPinUnlocked,
        setIsPinUnlocked,
        transactions,
        addTransaction,
        contacts,
        setContacts,
        families,
        setFamilies,
        events,
        setEvents,
        weddingChecklist,
        setWeddingChecklist,
        selectedPersonId,
        setSelectedPersonId,
        selectedFamilyId,
        setSelectedFamilyId,
        selectedEventId,
        setSelectedEventId,
        stats: STATS_2026,
        formatVND,
        formatVNDPure,
        showToast,
        toastMessage
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
