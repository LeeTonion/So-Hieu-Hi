import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { Calendar, Plus } from 'lucide-react-native';

export const CalendarScreen = () => {
  const { events, navigateTo } = useApp();
  const [filter, setFilter] = useState('all');

  const months = ['Tháng 10', 'Tháng 11', 'Tháng 12'];
  const [selectedMonth] = useState('Tháng 10');

  const eventTypeFilters = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Cưới hỏi', label: '💍 Cưới' },
    { id: 'Ngày giỗ', label: '🕯️ Giỗ' },
    { id: 'Sinh nhật', label: '🎂 Sinh nhật' },
    { id: 'Thôi nôi', label: '👶 Thôi nôi' },
  ];

  const filteredEvents =
    filter === 'all'
      ? events
      : events.filter((e) => e.type === filter || (filter === 'Cưới hỏi' && e.type === 'Thiệp đã nhận'));

  const getUrgencyBadge = (daysLeft) => {
    if (daysLeft === 0) return { label: 'Hôm nay', bg: '#EF4444', text: '#FFFFFF' };
    if (daysLeft <= 3) return { label: `${daysLeft} ngày`, bg: '#FEE2E2', text: '#DC2626' };
    if (daysLeft <= 7) return { label: `${daysLeft} ngày`, bg: '#FEF3C7', text: '#D97706' };
    return { label: `${daysLeft} ngày`, bg: '#F1F5F9', text: '#64748B' };
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Lịch sự kiện</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigateTo('add-entry')}>
            <Plus size={20} color="#FFFFFF" strokeWidth={3} />
          </TouchableOpacity>
        </View>

        {/* Month Selector */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.monthsRow}>
          {months.map((m) => {
            const isSelected = m === selectedMonth;
            return (
              <TouchableOpacity
                key={m}
                style={[styles.monthChip, isSelected && styles.activeMonthChip]}
              >
                <Text style={[styles.monthText, isSelected && styles.activeMonthText]}>{m}</Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Type Filter */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
          {eventTypeFilters.map((f) => {
            const isSelected = filter === f.id;
            return (
              <TouchableOpacity
                key={f.id}
                style={[styles.filterChip, isSelected && styles.activeFilterChip]}
                onPress={() => setFilter(f.id)}
              >
                <Text style={[styles.filterText, isSelected && styles.activeFilterText]}>
                  {f.label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>

      {/* Events List */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.sectionHeader}>{filteredEvents.length} SỰ KIỆN SẮP ĐẾN</Text>

        {filteredEvents.map((event) => {
          const badge = getUrgencyBadge(event.daysLeft);
          return (
            <View key={event.id} style={styles.eventCard}>
              <View style={styles.cardHeader}>
                <View style={styles.eventIconCircle}>
                  <Calendar size={18} color="#E0285C" />
                </View>
                <View style={styles.eventInfo}>
                  <Text style={styles.eventTitle}>{event.title}</Text>
                  <Text style={styles.eventDate}>
                    {event.dayOfWeek ? `${event.dayOfWeek}, ` : ''}{event.date}
                    {event.lunarDate ? ` (${event.lunarDate})` : ''}
                  </Text>
                </View>
                <View style={[styles.badge, { backgroundColor: badge.bg }]}>
                  <Text style={[styles.badgeText, { color: badge.text }]}>{badge.label}</Text>
                </View>
              </View>

              {event.reciprocalNote && (
                <View style={styles.noteBox}>
                  <Text style={styles.noteText}>💡 {event.reciprocalNote}</Text>
                </View>
              )}

              {event.suggestedAmount && (
                <View style={styles.suggestedRow}>
                  <Text style={styles.suggestedLabel}>Gợi ý mức mừng:</Text>
                  <Text style={styles.suggestedAmount}>
                    {event.suggestedAmount.toLocaleString('vi-VN')} đ
                  </Text>
                </View>
              )}
            </View>
          );
        })}
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
    marginBottom: 14,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B2445',
  },
  addBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: '#E0285C',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  monthsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  monthChip: {
    paddingVertical: 6,
    paddingHorizontal: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E2E8F0',
    marginRight: 8,
  },
  activeMonthChip: {
    backgroundColor: '#E0285C',
    borderColor: '#E0285C',
  },
  monthText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#64748B',
  },
  activeMonthText: {
    color: '#FFFFFF',
  },
  filtersRow: {
    flexDirection: 'row',
  },
  filterChip: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 14,
    backgroundColor: '#F1F5F9',
    marginRight: 8,
  },
  activeFilterChip: {
    backgroundColor: '#1B2445',
  },
  filterText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#64748B',
  },
  activeFilterText: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 90,
  },
  sectionHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94A3B8',
    letterSpacing: 1,
    marginBottom: 10,
    marginLeft: 4,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventIconCircle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#1B2445',
  },
  eventDate: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  badge: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 8,
  },
  badgeText: {
    fontSize: 11,
    fontWeight: '700',
  },
  noteBox: {
    backgroundColor: '#FFFBEB',
    borderRadius: 12,
    padding: 10,
    marginTop: 12,
  },
  noteText: {
    fontSize: 12,
    color: '#92400E',
    lineHeight: 18,
  },
  suggestedRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  suggestedLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  suggestedAmount: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0B8A63',
  },
});
