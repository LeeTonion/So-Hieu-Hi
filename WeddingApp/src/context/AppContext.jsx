import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
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
  const [currentScreen, setCurrentScreen] = useState('intro'); // 'intro', 'auth', 'pin', 'home', etc.
  const [activeTab, setActiveTab] = useState('home'); // 'home' | 'people' | 'calendar' | 'ledger'
  const [screenHistory, setScreenHistory] = useState(['intro']);

  // User & Theme State
  const [user, setUser] = useState(INITIAL_USER);
  const [isPinUnlocked, setIsPinUnlocked] = useState(false);

  // Data Collections
  const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
  const [contacts, setContacts] = useState(INITIAL_CONTACTS);
  const [families, setFamilies] = useState(INITIAL_FAMILIES);
  const [events, setEvents] = useState(INITIAL_EVENTS);
  const [weddingChecklist, setWeddingChecklist] = useState(WEDDING_CHECKLIST);

  // Selected Item details for detail screens
  const [selectedPersonId, setSelectedPersonId] = useState('c1');
  const [selectedFamilyId, setSelectedFamilyId] = useState('f1');
  const [selectedEventId, setSelectedEventId] = useState('e1');

  // Toast / Feedback State
  const [toastMessage, setToastMessage] = useState(null);

  const showToast = (text) => {
    setToastMessage(text);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  // Load from AsyncStorage on mount
  useEffect(() => {
    const loadStorage = async () => {
      try {
        const savedUser = await AsyncStorage.getItem('so_hieu_hi_user');
        if (savedUser) setUser(JSON.parse(savedUser));

        const savedTx = await AsyncStorage.getItem('so_hieu_hi_transactions');
        if (savedTx) setTransactions(JSON.parse(savedTx));

        const savedContacts = await AsyncStorage.getItem('so_hieu_hi_contacts');
        if (savedContacts) setContacts(JSON.parse(savedContacts));

        const savedFamilies = await AsyncStorage.getItem('so_hieu_hi_families');
        if (savedFamilies) setFamilies(JSON.parse(savedFamilies));

        const savedEvents = await AsyncStorage.getItem('so_hieu_hi_events');
        if (savedEvents) setEvents(JSON.parse(savedEvents));
      } catch (err) {
        console.error('Failed to load storage:', err);
      }
    };
    loadStorage();
  }, []);

  // Sync state to AsyncStorage
  useEffect(() => {
    AsyncStorage.setItem('so_hieu_hi_user', JSON.stringify(user)).catch(() => {});
  }, [user]);

  useEffect(() => {
    AsyncStorage.setItem('so_hieu_hi_transactions', JSON.stringify(transactions)).catch(() => {});
  }, [transactions]);

  // Navigation helpers
  const navigateTo = (screenId, params = {}) => {
    if (params.personId) setSelectedPersonId(params.personId);
    if (params.familyId) setSelectedFamilyId(params.familyId);
    if (params.eventId) setSelectedEventId(params.eventId);

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

  // Data Actions
  const addTransaction = (newTx) => {
    const item = {
      id: 'tx_' + Date.now(),
      date: new Date().toISOString().split('T')[0],
      monthGroup: `Tháng ${new Date().getMonth() + 1}, ${new Date().getFullYear()}`,
      ...newTx,
    };
    setTransactions((prev) => [item, ...prev]);
    showToast('Đã ghi vào sổ thành công!');
    return item;
  };

  const addContact = (newContact) => {
    const item = {
      id: 'c_' + Date.now(),
      receivedFrom: 0,
      givenTo: 0,
      netBalance: 0,
      history: [],
      hasZalo: true,
      ...newContact,
    };
    setContacts((prev) => [...prev, item]);
    showToast(`Đã thêm liên lạc ${item.name}!`);
    return item;
  };

  const addEvent = (newEvent) => {
    const item = {
      id: 'e_' + Date.now(),
      daysLeft: 10,
      ...newEvent,
    };
    setEvents((prev) => [...prev, item]);
    showToast('Đã thêm sự kiện mới!');
    return item;
  };

  const toggleChecklistItem = (id) => {
    setWeddingChecklist((prev) =>
      prev.map((item) => (item.id === id ? { ...item, done: !item.done } : item))
    );
  };

  const updateUser = (updates) => {
    setUser((prev) => ({ ...prev, ...updates }));
    showToast('Đã cập nhật cài đặt!');
  };

  // Derived helper getters
  const selectedPerson = contacts.find((c) => c.id === selectedPersonId) || contacts[0];
  const selectedFamily = families.find((f) => f.id === selectedFamilyId) || families[0];
  const selectedEvent = events.find((e) => e.id === selectedEventId) || events[0];

  const totalReceived = transactions
    .filter((t) => t.type === 'received')
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const totalGiven = transactions
    .filter((t) => t.type === 'given')
    .reduce((acc, t) => acc + (Number(t.amount) || 0), 0);

  const netBalance = totalReceived - totalGiven;

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        activeTab,
        user,
        isPinUnlocked,
        setIsPinUnlocked,
        transactions,
        contacts,
        families,
        events,
        weddingChecklist,
        selectedPerson,
        selectedFamily,
        selectedEvent,
        toastMessage,
        navigateTo,
        goBack,
        addTransaction,
        addContact,
        addEvent,
        toggleChecklistItem,
        updateUser,
        showToast,
        totalReceived,
        totalGiven,
        netBalance,
        stats: STATS_2026,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => useContext(AppContext);
