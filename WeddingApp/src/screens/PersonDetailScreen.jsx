import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowLeft, ArrowUpRight, ArrowDownLeft, Plus, Phone, MessageCircle } from 'lucide-react-native';

export const PersonDetailScreen = () => {
  const { contacts, selectedPerson, goBack, navigateTo, showToast } = useApp();

  const contact = selectedPerson || contacts[0];
  const formatVND = (num) => (num || 0).toLocaleString('vi-VN') + ' đ';

  const balance = contact.netBalance || 0;
  const history = contact.history || [];

  return (
    <View style={styles.container}>
      {/* Top Banner Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <ArrowLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>

        <View style={styles.heroRow}>
          <View style={styles.avatarCircle}>
            <Text style={styles.avatarText}>{contact.name.charAt(0)}</Text>
          </View>
          <View style={styles.heroInfo}>
            <Text style={styles.heroName}>{contact.name}</Text>
            <Text style={styles.heroSub}>{contact.relationship || 'Khách'}</Text>
            {contact.phone && <Text style={styles.heroPhone}>{contact.phone}</Text>}
          </View>
        </View>

        {/* Quick Action Buttons */}
        <View style={styles.actionsRow}>
          {contact.phone && (
            <TouchableOpacity
              style={styles.actionBtn}
              onPress={() => showToast(`Đang gọi ${contact.name}: ${contact.phone}`)}
            >
              <Phone size={14} color="#FFFFFF" />
              <Text style={styles.actionBtnText}>Gọi</Text>
            </TouchableOpacity>
          )}

          {contact.hasZalo && (
            <TouchableOpacity
              style={[styles.actionBtn, { backgroundColor: '#06C755' }]}
              onPress={() => showToast(`Mở Zalo ${contact.name}`)}
            >
              <MessageCircle size={14} color="#FFFFFF" />
              <Text style={styles.actionBtnText}>Zalo</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={[styles.actionBtn, { backgroundColor: '#E0285C' }]}
            onPress={() => navigateTo('add-entry')}
          >
            <Plus size={14} color="#FFFFFF" />
            <Text style={styles.actionBtnText}>Ghi sổ</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Main Body */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Net Stats Card */}
        <View style={styles.statsCard}>
          <View style={styles.statCol}>
            <View style={styles.statLabelRow}>
              <ArrowDownLeft size={12} color="#0B8A63" />
              <Text style={styles.statLabel}>NHẬN VỀ</Text>
            </View>
            <Text style={[styles.statVal, { color: '#0B8A63' }]}>{formatVND(contact.receivedFrom)}</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <View style={styles.statLabelRow}>
              <ArrowUpRight size={12} color="#E0285C" />
              <Text style={styles.statLabel}>ĐÃ TẶNG</Text>
            </View>
            <Text style={[styles.statVal, { color: '#E0285C' }]}>{formatVND(contact.givenTo)}</Text>
          </View>

          <View style={styles.statDivider} />

          <View style={styles.statCol}>
            <Text style={styles.statLabel}>RÒNG</Text>
            <Text style={[styles.statVal, balance >= 0 ? { color: '#0B8A63' } : { color: '#E0285C' }]}>
              {balance >= 0 ? '+' : ''}{formatVND(balance)}
            </Text>
          </View>
        </View>

        {/* History List */}
        <Text style={styles.sectionTitle}>Lịch sử qua lại ({history.length})</Text>

        {history.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyText}>Chưa có lịch sử giao dịch trực tiếp.</Text>
          </View>
        ) : (
          history.map((h) => (
            <View key={h.id} style={styles.historyItem}>
              <View style={styles.histLeft}>
                <View
                  style={[
                    styles.histIconBg,
                    h.direction === 'received' ? styles.iconRec : styles.iconGiv,
                  ]}
                >
                  {h.direction === 'received' ? (
                    <ArrowDownLeft size={16} color="#0B8A63" />
                  ) : (
                    <ArrowUpRight size={16} color="#E0285C" />
                  )}
                </View>
                <View>
                  <Text style={styles.histTitle}>{h.title}</Text>
                  <Text style={styles.histDate}>{h.date} · {h.type}</Text>
                </View>
              </View>
              <Text
                style={[
                  styles.histAmount,
                  h.direction === 'received' ? { color: '#0B8A63' } : { color: '#E0285C' },
                ]}
              >
                {h.direction === 'received' ? '+' : '-'}{formatVND(h.amount)}
              </Text>
            </View>
          ))
        )}
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
    backgroundColor: '#1B2445',
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 24,
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  heroRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 18,
  },
  avatarCircle: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: '#E0285C',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
  },
  avatarText: {
    fontSize: 22,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroInfo: {
    flex: 1,
  },
  heroName: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  heroSub: {
    fontSize: 13,
    color: 'rgba(255, 255, 255, 0.7)',
    marginTop: 2,
  },
  heroPhone: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.5)',
    marginTop: 2,
  },
  actionsRow: {
    flexDirection: 'row',
    gap: 10,
  },
  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    paddingVertical: 10,
    borderRadius: 14,
    gap: 6,
  },
  actionBtnText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 14,
    paddingBottom: 40,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statCol: {
    flex: 1,
    alignItems: 'center',
  },
  statLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#64748B',
  },
  statVal: {
    fontSize: 13,
    fontWeight: '800',
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#F1F5F9',
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B2445',
    marginTop: 6,
  },
  emptyCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  emptyText: {
    color: '#94A3B8',
    fontSize: 13,
  },
  historyItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    elevation: 1,
  },
  histLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  histIconBg: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconRec: {
    backgroundColor: '#D1FAE5',
  },
  iconGiv: {
    backgroundColor: '#FFE4E6',
  },
  histTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B2445',
  },
  histDate: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  histAmount: {
    fontSize: 13,
    fontWeight: '700',
  },
});
