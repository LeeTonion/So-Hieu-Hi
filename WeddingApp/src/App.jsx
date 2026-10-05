import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { AppProvider, useApp } from './context/AppContext';
import { BottomNav } from './components/BottomNav';

// Screens
import { IntroScreen } from './screens/IntroScreen';
import { AuthScreen } from './screens/AuthScreen';
import { PinScreen } from './screens/PinScreen';
import { ForgotPinScreen } from './screens/ForgotPinScreen';
import { HomeScreen } from './screens/HomeScreen';
import { LedgerScreen } from './screens/LedgerScreen';
import { StatsScreen } from './screens/StatsScreen';
import { CalendarScreen } from './screens/CalendarScreen';
import { PeopleScreen } from './screens/PeopleScreen';
import { PersonDetailScreen } from './screens/PersonDetailScreen';
import { WeddingHubScreen } from './screens/WeddingHubScreen';
import { AddEntryScreen } from './screens/AddEntryScreen';
import { EnvelopeRecorderScreen } from './screens/EnvelopeRecorderScreen';
import { SettingsScreen } from './screens/SettingsScreen';

const Toast = ({ message }) => {
  if (!message) return null;
  return (
    <View style={styles.toast}>
      <Text style={styles.toastText}>{message}</Text>
    </View>
  );
};

const MainNavigator = () => {
  const { currentScreen, toastMessage } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      case 'intro':
        return <IntroScreen />;
      case 'auth':
        return <AuthScreen />;
      case 'pin':
        return <PinScreen />;
      case 'forgot-pin':
        return <ForgotPinScreen />;
      case 'home':
        return <HomeScreen />;
      case 'ledger':
        return <LedgerScreen />;
      case 'stats':
        return <StatsScreen />;
      case 'calendar':
        return <CalendarScreen />;
      case 'people':
        return <PeopleScreen />;
      case 'person-detail':
        return <PersonDetailScreen />;
      case 'wedding-hub':
        return <WeddingHubScreen />;
      case 'add-entry':
      case 'add-event':
        return <AddEntryScreen />;
      case 'envelope-recorder':
        return <EnvelopeRecorderScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <View style={styles.appContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      <View style={styles.screenWrapper}>{renderScreen()}</View>
      <BottomNav />
      <Toast message={toastMessage} />
    </View>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainNavigator />
    </AppProvider>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    backgroundColor: '#F8F6FB',
  },
  screenWrapper: {
    flex: 1,
  },
  toast: {
    position: 'absolute',
    bottom: 90,
    alignSelf: 'center',
    backgroundColor: '#1B2445',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    zIndex: 999,
  },
  toastText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
