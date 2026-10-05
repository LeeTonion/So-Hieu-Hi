import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { Search, ArrowUpRight, ArrowDownLeft } from 'lucide-react-native';

export const LedgerScreen = () => {
  const { transactions, navigateTo, totalReceived, totalGiven } = useApp();
  const [filter, setFilter] = useState('all'); // all | received | given
  const [query, setQuery] = useState('');

  const formatVND = (num) => (num || 0).toLocaleString('vi-VN') + ' đ';

  const filtered = transactions.filter((t) => {
    const matchDir = filter === 'all' || t.type === filter;
    const matchQ =
      !query ||
      t.personName.toLowerCase().includes(query.toLowerCase()) ||
      t.occasion.toLowerCase().includes(query.toLowerCase());
    return matchDir && matchQ;
  });

  const grouped = filtered.reduce((acc, tx) => {
    const key = tx.monthGroup || 'Gần đây';
    if (!acc[key]) acc[key] = [];
    acc[key].push(tx);
    return acc;
  }, {});

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Sổ ghi chép</Text>
          <TouchableOpacity style={styles.statsBtn} onPress={() => navigateTo('stats')}>
            <Text style={styles.statsBtnText}>Thống kê →</Text>
          </TouchableOpacity>
        </View>

        {/* Total Summary Pills */}
        <View style={styles.summaryRow}>
          <View style={styles.summaryReceived}>
            <View style={styles.summaryLabelRow}>
              <ArrowDownLeft size={12} color="#0B8A63" />
              <Text style={styles.summaryReceivedLabel}>NHẬN VỀ</Text>
            </View>
            <Text style={styles.summaryReceivedValue}>{formatVND(totalReceived)}</Text>
          </View>

          <View style={styles.summaryGiven}>
            <View style={styles.summaryLabelRow}>
              <ArrowUpRight size={12} color="#E0285C" />
              <Text style={styles.summaryGivenLabel}>ĐÃ MỪNG</Text>
            </View>
            <Text style={styles.summaryGivenValue}>{formatVND(totalGiven)}</Text>
          </View>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Search size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm người, dịp..."
            placeholderTextColor="#94A3B8"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Filter Pills */}
        <View style={styles.filterTabs}>
          {[
            { id: 'all', label: 'Tất cả' },
            { id: 'received', label: '↓ Nhận về' },
            { id: 'given', label: '↑ Đã mừng' },
          ].map((f) => {
            const isActive = filter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.filterTab, isActive && styles.activeFilterTab]}
                onPress={() => setFilter(f.id)}
              >
                <Text style={[styles.filterTabText, isActive && styles.activeFilterTabText]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>

      {/* Transaction List */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {Object.keys(grouped).length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyEmoji}>📖</Text>
            <Text style={styles.emptyText}>Sổ đang trống</Text>
          </View>
        ) : (
          Object.entries(grouped).map(([month, list]) => (
            <View key={month} style={styles.monthGroup}>
              <Text style={styles.monthTitle}>{month}</Text>
              {list.map((tx) => (
                <View key={tx.id} style={styles.txItem}>
                  <View style={styles.txLeft}>
                    <View
                      style={[
                        styles.txIconBg,
                        tx.type === 'received' ? styles.iconReceived : styles.iconGiven,
                      ]}
                    >
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
    backgroundColor: '#FFFFFF',
    paddingTop: 48,
    paddingHorizontal: 20,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B2445',
  },
  statsBtn: {
    backgroundColor: '#FFF1F2',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 14,
  },
  statsBtnText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#E0285C',
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 14,
  },
  summaryReceived: {
    flex: 1,
    backgroundColor: '#ECFDF5',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  summaryGiven: {
    flex: 1,
    backgroundColor: '#FFF1F2',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  summaryLabelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 2,
  },
  summaryReceivedLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#0B8A63',
  },
  summaryGivenLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#E0285C',
  },
  summaryReceivedValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#0B8A63',
  },
  summaryGivenValue: {
    fontSize: 15,
    fontWeight: '800',
    color: '#E0285C',
  },
  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F6FB',
    borderRadius: 14,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginBottom: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 14,
    color: '#1B2445',
  },
  filterTabs: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
  },
  filterTab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  activeFilterTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  filterTabText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  activeFilterTabText: {
    color: '#E0285C',
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
  },
  monthGroup: {
    marginBottom: 18,
  },
  monthTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
    marginBottom: 8,
    marginLeft: 4,
  },
  txItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
  },
  txLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  txIconBg: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconReceived: {
    backgroundColor: '#D1FAE5',
  },
  iconGiven: {
    backgroundColor: '#FFE4E6',
  },
  txName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B2445',
  },
  txSub: {
    fontSize: 11,
    color: '#64748B',
    marginTop: 2,
  },
  txAmount: {
    fontSize: 14,
    fontWeight: '700',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyEmoji: {
    fontSize: 40,
    marginBottom: 10,
  },
  emptyText: {
    fontSize: 14,
    color: '#94A3B8',
    fontWeight: '600',
  },
});
