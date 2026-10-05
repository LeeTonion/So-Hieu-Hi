import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, Switch } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ShieldCheck, Eye, Bell, Moon, Sun, ChevronRight } from 'lucide-react-native';

export const SettingsScreen = () => {
  const { user, updateUser, goBack, showToast, navigateTo } = useApp();

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <ArrowLeft size={20} color="#1B2445" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Cài đặt</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Profile Card */}
        <View style={styles.profileCard}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{user.avatar}</Text>
          </View>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>{user.name}</Text>
            <Text style={styles.profileEmail}>{user.email}</Text>
          </View>
        </View>

        {/* Security & Privacy */}
        <Text style={styles.sectionHeader}>RIÊNG TƯ & BẢO MẬT</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <ShieldCheck size={18} color="#0B8A63" />
              <Text style={styles.rowText}>Mã PIN khoá sổ</Text>
            </View>
            <Switch
              value={user.pinEnabled}
              onValueChange={(val) => updateUser({ pinEnabled: val })}
              trackColor={{ false: '#E2E8F0', true: '#E0285C' }}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Eye size={18} color="#1B2445" />
              <Text style={styles.rowText}>Ẩn số tiền trang chủ</Text>
            </View>
            <Switch
              value={user.hideAmountOnHome}
              onValueChange={(val) => updateUser({ hideAmountOnHome: val })}
              trackColor={{ false: '#E2E8F0', true: '#E0285C' }}
            />
          </View>
        </View>

        {/* Notification Settings */}
        <Text style={styles.sectionHeader}>THÔNG BÁO & NHẮC NHỞ</Text>
        <View style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.rowLeft}>
              <Bell size={18} color="#D97706" />
              <Text style={styles.rowText}>Nhắc ngày âm lịch</Text>
            </View>
            <Switch
              value={user.lunarReminder}
              onValueChange={(val) => updateUser({ lunarReminder: val })}
              trackColor={{ false: '#E2E8F0', true: '#E0285C' }}
            />
          </View>
        </View>

        {/* Logout button */}
        <TouchableOpacity
          style={styles.logoutBtn}
          onPress={() => {
            showToast('Đã đăng xuất');
            navigateTo('auth');
          }}
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FB',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 14,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#F1F5F9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#1B2445',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  profileCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#E0285C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1B2445',
  },
  profileEmail: {
    fontSize: 13,
    color: '#64748B',
    marginTop: 2,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginTop: 6,
    marginLeft: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
  },
  rowLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B2445',
  },
  divider: {
    height: 1,
    backgroundColor: '#F1F5F9',
  },
  logoutBtn: {
    backgroundColor: '#FFF1F2',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  logoutText: {
    color: '#E0285C',
    fontSize: 14,
    fontWeight: '700',
  },
});
