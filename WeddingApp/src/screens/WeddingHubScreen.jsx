import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowLeft, CheckCircle2, Circle } from 'lucide-react-native';

export const WeddingHubScreen = () => {
  const { user, weddingChecklist, toggleChecklistItem, goBack, navigateTo } = useApp();

  const completedCount = weddingChecklist.filter((w) => w.done).length;
  const totalCount = weddingChecklist.length;
  const progress = totalCount > 0 ? completedCount / totalCount : 0;

  return (
    <View style={styles.container}>
      {/* Hero Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <ArrowLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <Text style={styles.subHeader}>ĐÁM CƯỚI CỦA</Text>
        <Text style={styles.coupleName}>{user.wedding.couple}</Text>
        <Text style={styles.eventInfo}>📅 {user.wedding.date} · {user.wedding.time}</Text>

        {/* Progress Bar */}
        <View style={styles.progressTrack}>
          <View style={[styles.progressBar, { width: `${Math.round(progress * 100)}%` }]} />
        </View>
        <View style={styles.progressRow}>
          <Text style={styles.progressText}>{completedCount}/{totalCount} bước hoàn thành</Text>
          <Text style={styles.progressDays}>⏰ Ngày 18/10/2026</Text>
        </View>
      </View>

      {/* Guest Stats Card */}
      <View style={styles.guestStatsCard}>
        <View style={styles.guestStatCol}>
          <Text style={styles.statNum}>{user.wedding.totalGuests}</Text>
          <Text style={styles.statLabel}>Tổng khách</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.guestStatCol}>
          <Text style={[styles.statNum, { color: '#0B8A63' }]}>{user.wedding.confirmedGuests}</Text>
          <Text style={styles.statLabel}>Xác nhận</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.guestStatCol}>
          <Text style={[styles.statNum, { color: '#D97706' }]}>{user.wedding.pendingGuests}</Text>
          <Text style={styles.statLabel}>Chờ trả lời</Text>
        </View>
        <View style={styles.divider} />
        <View style={styles.guestStatCol}>
          <Text style={[styles.statNum, { color: '#94A3B8' }]}>{user.wedding.declinedGuests}</Text>
          <Text style={styles.statLabel}>Từ chối</Text>
        </View>
      </View>

      {/* Checklist */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>CHECKLIST CHUẨN BỊ ĐÁM CƯỚI</Text>

        {weddingChecklist.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.checklistItem, item.done && styles.checklistItemDone]}
            onPress={() => toggleChecklistItem(item.id)}
            activeOpacity={0.8}
          >
            <View style={styles.checkIcon}>
              {item.done ? (
                <CheckCircle2 size={22} color="#0B8A63" />
              ) : (
                <Circle size={22} color="#CBD5E1" />
              )}
            </View>
            <View style={styles.checkInfo}>
              <Text style={[styles.checkTitle, item.done && styles.checkTitleDone]}>
                {item.title}
              </Text>
              <Text style={styles.checkDesc}>{item.desc}</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Quick Launch Envelope recorder */}
        <TouchableOpacity
          style={styles.recorderLaunchBtn}
          onPress={() => navigateTo('envelope-recorder')}
        >
          <Text style={styles.recorderLaunchText}>🎙️ Mở tính năng Ghi phong bì tại tiệc cưới</Text>
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
    backgroundColor: '#E0285C',
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 36,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  subHeader: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  coupleName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
    marginTop: 2,
    marginBottom: 4,
  },
  eventInfo: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.85)',
    marginBottom: 14,
  },
  progressTrack: {
    height: 6,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 3,
  },
  progressRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  progressText: {
    color: 'rgba(255, 255, 255, 0.85)',
    fontSize: 11,
  },
  progressDays: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  guestStatsCard: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 20,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  guestStatCol: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1B2445',
  },
  statLabel: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
    marginTop: 2,
  },
  divider: {
    width: 1,
    height: 24,
    backgroundColor: '#F1F5F9',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
    gap: 10,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginTop: 8,
    marginBottom: 4,
    marginLeft: 4,
  },
  checklistItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
  },
  checklistItemDone: {
    backgroundColor: '#F0FDF4',
  },
  checkIcon: {
    marginRight: 12,
  },
  checkInfo: {
    flex: 1,
  },
  checkTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B2445',
  },
  checkTitleDone: {
    color: '#94A3B8',
    textDecorationLine: 'line-through',
  },
  checkDesc: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  recorderLaunchBtn: {
    backgroundColor: '#1B2445',
    paddingVertical: 14,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  recorderLaunchText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
});
