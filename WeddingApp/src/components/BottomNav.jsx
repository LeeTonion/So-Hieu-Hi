import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Home, Users, Calendar, BookOpen, Plus } from 'lucide-react-native';
import { useApp } from '../context/AppContext';

export const BottomNav = () => {
  const { activeTab, navigateTo, currentScreen } = useApp();

  const hideOnScreens = ['intro', 'auth', 'pin', 'forgot-pin', 'envelope-recorder', 'add-entry', 'add-event'];
  if (hideOnScreens.includes(currentScreen)) {
    return null;
  }

  const tabs = [
    { id: 'home', label: 'Trang chủ', icon: Home, route: 'home' },
    { id: 'people', label: 'Mọi người', icon: Users, route: 'people' },
    { id: 'calendar', label: 'Lịch', icon: Calendar, route: 'calendar' },
    { id: 'ledger', label: 'Sổ ghi', icon: BookOpen, route: 'ledger' },
  ];

  return (
    <View style={styles.container}>
      {/* Tab 1 & 2 */}
      {tabs.slice(0, 2).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => navigateTo(tab.route)}
            activeOpacity={0.7}
          >
            <Icon size={22} color={isActive ? '#E0285C' : '#94A3B8'} strokeWidth={isActive ? 2.5 : 1.8} />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}

      {/* Floating Center '+' Button */}
      <View style={styles.fabContainer}>
        <TouchableOpacity
          style={styles.fabButton}
          onPress={() => navigateTo('add-entry')}
          activeOpacity={0.85}
        >
          <Plus size={28} color="#FFFFFF" strokeWidth={3} />
        </TouchableOpacity>
      </View>

      {/* Tab 3 & 4 */}
      {tabs.slice(2, 4).map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <TouchableOpacity
            key={tab.id}
            style={styles.tabItem}
            onPress={() => navigateTo(tab.route)}
            activeOpacity={0.7}
          >
            <Icon size={22} color={isActive ? '#E0285C' : '#94A3B8'} strokeWidth={isActive ? 2.5 : 1.8} />
            <Text style={[styles.tabLabel, isActive && styles.activeTabLabel]}>{tab.label}</Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 12,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  tabItem: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  tabLabel: {
    fontSize: 11,
    color: '#94A3B8',
    fontWeight: '500',
    marginTop: 3,
  },
  activeTabLabel: {
    color: '#E0285C',
    fontWeight: 'bold',
  },
  fabContainer: {
    marginTop: -28,
  },
  fabButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0285C',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 4,
    borderColor: '#FFFFFF',
    elevation: 6,
    shadowColor: '#E0285C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
  },
});
