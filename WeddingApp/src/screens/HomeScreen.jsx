import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { Mascot } from '../components/Mascot';
import { Bell, ChevronRight, Eye, EyeOff, ArrowUpRight, ArrowDownLeft, Calendar, BookOpen, Plus, HeartHandshake } from 'lucide-react-native';

export const HomeScreen = () => {
  const { user, updateUser, events, navigateTo, transactions, weddingChecklist, totalReceived, totalGiven, netBalance } = useApp();

  const hideAmount = user.hideAmountOnHome;
  const toggleHide = () => updateUser({ hideAmountOnHome: !user.hideAmountOnHome });

  const formatVND = (num) => {
    return (num || 0).toLocaleString('vi-VN') + ' đ';
  };

  const upcomingEvents = events.slice(0, 3);
  const recentTransactions = transactions.slice(0, 5);
  const weddingProgress = weddingChecklist.filter((w) => w.done).length;
  const weddingTotal = weddingChecklist.length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer} showsVerticalScrollIndicator={false}>
      {/* Gradient Header Container */}
      <View style={styles.header}>
        {/* Top bar with Avatar & Controls */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.avatarRow} onPress={() => navigateTo('settings')}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{user.avatar}</Text>
            </View>
            <View>
              <Text style={styles.greetingSub}>Xin chào,</Text>
              <Text style={styles.greetingName}>{user.name} 👋</Text>
            </View>
          </TouchableOpacity>

          <View style={styles.headerActions}>
            <TouchableOpacity style={styles.actionBtn} onPress={toggleHide}>
              {hideAmount ? <EyeOff size={18} color="#FFFFFF" /> : <Eye size={18} color="#FFFFFF" />}
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionBtn} onPress={() => navigateTo('calendar')}>
              <Bell size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Balance Summary */}
        <View style={styles.balanceBox}>
          <Text style={styles.balanceLabel}>SỐ DƯ RÒNG</Text>
          <Text style={styles.balanceAmount}>
            {hideAmount ? '••••••••' : formatVND(netBalance)}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <View style={styles.statIconBg}>
                <ArrowDownLeft size={14} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.statLabel}>Nhận về</Text>
                <Text style={styles.statValue}>{hideAmount ? '••••' : formatVND(totalReceived)}</Text>
              </View>
            </View>

            <View style={styles.statDivider} />

            <View style={styles.statItem}>
              <View style={styles.statIconBg}>
                <ArrowUpRight size={14} color="#FFFFFF" />
              </View>
              <View>
                <Text style={styles.statLabel}>Đã mừng</Text>
                <Text style={styles.statValue}>{hideAmount ? '••••' : formatVND(totalGiven)}</Text>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Main Content Body */}
      <View style={styles.body}>
        {/* Wedding Hub Card */}
        <TouchableOpacity style={styles.card} onPress={() => navigateTo('wedding-hub')} activeOpacity={0.9}>
          <View style={styles.cardHeader}>
            <View style={styles.cardTitleRow}>
              <View style={styles.cardIconCircle}>
                <Text style={{ fontSize: 18 }}>💍</Text>
              </View>
              <View>
                <Text style={styles.cardTitle}>{user.wedding.couple}</Text>
                <Text style={styles.cardSub}>Tiệc cưới · {user.wedding.date}</Text>
              </View>
            </View>
            <ChevronRight size={18} color="#94A3B8" />
          </View>

          {/* Progress Bar */}
          <View style={styles.progressTrack}>
            <View
              style={[
                styles.progressBar,
                { width: `${Math.round((weddingProgress / weddingTotal) * 100)}%` },
              ]}
            />
          </View>
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>Checklist chuẩn bị</Text>
            <Text style={styles.progressCount}>{weddingProgress}/{weddingTotal} bước</Text>
          </View>

          <View style={styles.miniStatsRow}>
            <View style={styles.miniStat}>
              <Text style={styles.miniStatNum}>{user.wedding.confirmedGuests}</Text>
              <Text style={[styles.miniStatLabel, { color: '#0B8A63' }]}>Xác nhận</Text>
            </View>
            <View style={styles.miniDivider} />
            <View style={styles.miniStat}>
              <Text style={styles.miniStatNum}>{user.wedding.pendingGuests}</Text>
              <Text style={[styles.miniStatLabel, { color: '#D97706' }]}>Chờ trả lời</Text>
            </View>
            <View style={styles.miniDivider} />
            <View style={styles.miniStat}>
              <Text style={styles.miniStatNum}>{user.wedding.declinedGuests}</Text>
              <Text style={[styles.miniStatLabel, { color: '#94A3B8' }]}>Không đến</Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* Quick Actions */}
        <View style={styles.quickGrid}>
          <TouchableOpacity style={styles.quickCard} onPress={() => navigateTo('add-entry')} activeOpacity={0.8}>
            <View style={[styles.quickIconBox, { backgroundColor: '#FFE4E6' }]}>
              <Plus size={20} color="#E0285C" />
            </View>
            <Text style={styles.quickText}>Ghi sổ nhanh</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => navigateTo('envelope-recorder')} activeOpacity={0.8}>
            <View style={[styles.quickIconBox, { backgroundColor: '#FEF3C7' }]}>
              <HeartHandshake size={20} color="#D97706" />
            </View>
            <Text style={styles.quickText}>Ghi phong bì</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.quickCard} onPress={() => navigateTo('stats')} activeOpacity={0.8}>
            <View style={[styles.quickIconBox, { backgroundColor: '#E0E7FF' }]}>
              <BookOpen size={20} color="#4F46E5" />
            </View>
            <Text style={styles.quickText}>Báo cáo 2026</Text>
          </TouchableOpacity>
        </View>

        {/* Upcoming Events Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Sự kiện sắp tới</Text>
          <TouchableOpacity onPress={() => navigateTo('calendar')}>
            <Text style={styles.seeAllText}>Xem tất cả</Text>
          </TouchableOpacity>
        </View>

        {upcomingEvents.map((ev) => (
          <TouchableOpacity
            key={ev.id}
            style={styles.eventItem}
            onPress={() => navigateTo('calendar', { eventId: ev.id })}
            activeOpacity={0.8}
          >
            <View style={styles.eventLeft}>
              <View style={styles.eventBadge}>
                <Calendar size={18} color="#E0285C" />
              </View>
              <View>
                <Text style={styles.eventTitle}>{ev.title}</Text>
                <Text style={styles.eventSub}>{ev.date} · {ev.type}</Text>
              </View>
            </View>
            <View style={styles.daysBadge}>
              <Text style={styles.daysText}>còn {ev.daysLeft} ngày</Text>
            </View>
          </TouchableOpacity>
        ))}

        {/* Recent Transactions */}
        <View style={[styles.sectionHeader, { marginTop: 24 }]}>
          <Text style={styles.sectionTitle}>Ghi chép gần đây</Text>
          <TouchableOpacity onPress={() => navigateTo('ledger')}>
            <Text style={styles.seeAllText}>Xem sổ ghi</Text>
          </TouchableOpacity>
        </View>

        {recentTransactions.map((tx) => (
          <View key={tx.id} style={styles.txItem}>
            <View style={styles.txLeft}>
              <View style={[styles.txBadge, tx.type === 'received' ? styles.txReceived : styles.txGiven]}>
                {tx.type === 'received' ? (
                  <ArrowDownLeft size={16} color="#0B8A63" />
                ) : (
                  <ArrowUpRight size={16} color="#E0285C" />
                )}
              </View>
              <View>
                <Text style={styles.txName}>{tx.personName}</Text>
                <Text style={styles.txSub}>{tx.occasion} · {tx.date}</Text>
              </View>
            </View>
            <Text
              style={[
                styles.txAmount,
                tx.type === 'received' ? { color: '#0B8A63' } : { color: '#E0285C' },
              ]}
            >
              {tx.type === 'received' ? '+' : '-'}{formatVND(tx.amount)}
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FB',
  },
  contentContainer: {
    paddingBottom: 90,
  },
  header: {
    backgroundColor: '#E0285C',
    paddingTop: 48,
    paddingBottom: 40,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  avatarRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1.5,
    borderColor: '#FFFFFF',
  },
  avatarText: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
  },
  greetingSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 12,
  },
  greetingName: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  actionBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  balanceBox: {
    alignItems: 'center',
    marginTop: 8,
  },
  balanceLabel: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '600',
    marginBottom: 4,
  },
  balanceAmount: {
    color: '#FFFFFF',
    fontSize: 32,
    fontWeight: '800',
    marginBottom: 16,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.12)',
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
    gap: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  statIconBg: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  statLabel: {
    color: 'rgba(255, 255, 255, 0.7)',
    fontSize: 10,
  },
  statValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  statDivider: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  body: {
    paddingHorizontal: 16,
    marginTop: -20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 18,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    marginBottom: 16,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 14,
  },
  cardTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  cardIconCircle: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B2445',
  },
  cardSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  progressTrack: {
    height: 6,
    backgroundColor: '#F1F5F9',
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#E0285C',
    borderRadius: 3,
  },
  progressInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
    marginBottom: 12,
  },
  progressText: {
    fontSize: 11,
    color: '#64748B',
  },
  progressCount: {
    fontSize: 11,
    fontWeight: '700',
    color: '#E0285C',
  },
  miniStatsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
    paddingTop: 10,
  },
  miniStat: {
    flex: 1,
    alignItems: 'center',
  },
  miniStatNum: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B2445',
  },
  miniStatLabel: {
    fontSize: 10,
    fontWeight: '600',
    marginTop: 2,
  },
  miniDivider: {
    width: 1,
    height: 18,
    backgroundColor: '#F1F5F9',
  },
  quickGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 20,
  },
  quickCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickIconBox: {
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 6,
  },
  quickText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1B2445',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B2445',
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#E0285C',
  },
  eventItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  eventLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  eventBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  eventTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B2445',
  },
  eventSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  daysBadge: {
    backgroundColor: '#FFF1F2',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  daysText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#E0285C',
  },
  txItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  txReceived: {
    backgroundColor: '#D1FAE5',
  },
  txGiven: {
    backgroundColor: '#FFE4E6',
  },
  txName: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B2445',
  },
  txSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  txAmount: {
    fontSize: 13,
    fontWeight: '700',
  },
});
