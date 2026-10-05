import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowLeft } from 'lucide-react-native';

export const StatsScreen = () => {
  const { goBack, stats } = useApp();
  const [activeYear, setActiveYear] = useState('2026');

  const formatVND = (num) => (num || 0).toLocaleString('vi-VN') + ' đ';
  const maxMonthly = Math.max(...stats.monthly.map((m) => Math.max(m.received, m.given)));

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <ArrowLeft size={20} color="#1B2445" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Thống kê</Text>

        <View style={styles.yearSelector}>
          {['2024', '2025', '2026'].map((y) => (
            <TouchableOpacity
              key={y}
              style={[styles.yearChip, activeYear === y && styles.activeYearChip]}
              onPress={() => setActiveYear(y)}
            >
              <Text style={[styles.yearText, activeYear === y && styles.activeYearText]}>{y}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Total Summary Cards */}
        <View style={styles.summaryRow}>
          <View style={[styles.summaryCard, { backgroundColor: '#0B8A63' }]}>
            <Text style={styles.summaryCardLabel}>TỔNG NHẬN</Text>
            <Text style={styles.summaryCardAmount}>{formatVND(stats.receivedTotal)}</Text>
            <Text style={styles.summaryCardSub}>{stats.receivedCount} lần nhận</Text>
          </View>

          <View style={[styles.summaryCard, { backgroundColor: '#E0285C' }]}>
            <Text style={styles.summaryCardLabel}>TỔNG MỪNG</Text>
            <Text style={styles.summaryCardAmount}>{formatVND(stats.givenTotal)}</Text>
            <Text style={styles.summaryCardSub}>{stats.givenCount} lần đi mừng</Text>
          </View>
        </View>

        {/* Monthly Chart Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Theo tháng (triệu đ)</Text>
          <View style={styles.chartArea}>
            {stats.monthly.map((m) => {
              const recHeight = maxMonthly > 0 ? (m.received / maxMonthly) * 90 : 0;
              const givHeight = maxMonthly > 0 ? (m.given / maxMonthly) * 90 : 0;
              return (
                <View key={m.month} style={styles.chartCol}>
                  <View style={styles.barsRow}>
                    <View style={[styles.bar, { height: recHeight, backgroundColor: '#0B8A63' }]} />
                    <View style={[styles.bar, { height: givHeight, backgroundColor: '#E0285C' }]} />
                  </View>
                  <Text style={styles.monthLabel}>{m.month}</Text>
                </View>
              );
            })}
          </View>

          <View style={styles.legendRow}>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#0B8A63' }]} />
              <Text style={styles.legendText}>Nhận</Text>
            </View>
            <View style={styles.legendItem}>
              <View style={[styles.legendDot, { backgroundColor: '#E0285C' }]} />
              <Text style={styles.legendText}>Mừng</Text>
            </View>
          </View>
        </View>

        {/* Occasion Breakdown */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Theo sự kiện / dịp</Text>
          <View style={styles.occasionsList}>
            {stats.occasions.map((o) => (
              <View key={o.name} style={styles.occasionRow}>
                <View style={styles.occLeft}>
                  <View style={[styles.occDot, { backgroundColor: o.color }]} />
                  <Text style={styles.occName}>{o.name}</Text>
                </View>

                <View style={styles.occRight}>
                  <Text style={styles.occAmount}>{formatVND(o.amount)}</Text>
                  <Text style={styles.occPercent}>{o.percent}%</Text>
                </View>
              </View>
            ))}
          </View>
        </View>
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
    justifyContent: 'space-between',
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
  yearSelector: {
    flexDirection: 'row',
    gap: 4,
  },
  yearChip: {
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  activeYearChip: {
    backgroundColor: '#E0285C',
  },
  yearText: {
    fontSize: 12,
    color: '#94A3B8',
    fontWeight: '600',
  },
  activeYearText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 16,
    paddingBottom: 40,
  },
  summaryRow: {
    flexDirection: 'row',
    gap: 12,
  },
  summaryCard: {
    flex: 1,
    borderRadius: 20,
    padding: 16,
    elevation: 3,
  },
  summaryCardLabel: {
    color: 'rgba(255, 255, 255, 0.75)',
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1,
    marginBottom: 4,
  },
  summaryCardAmount: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '800',
  },
  summaryCardSub: {
    color: 'rgba(255, 255, 255, 0.8)',
    fontSize: 11,
    marginTop: 4,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 18,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B2445',
    marginBottom: 16,
  },
  chartArea: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    height: 120,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
    paddingBottom: 8,
  },
  chartCol: {
    alignItems: 'center',
    flex: 1,
  },
  barsRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 2,
    height: 90,
  },
  bar: {
    width: 6,
    borderTopLeftRadius: 3,
    borderTopRightRadius: 3,
  },
  monthLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94A3B8',
    marginTop: 6,
  },
  legendRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
    marginTop: 12,
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  legendDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  legendText: {
    fontSize: 11,
    color: '#64748B',
    fontWeight: '600',
  },
  occasionsList: {
    gap: 12,
  },
  occasionRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  occLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  occDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  occName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B2445',
  },
  occRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  occAmount: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  occPercent: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1B2445',
    width: 32,
    textAlign: 'right',
  },
});
