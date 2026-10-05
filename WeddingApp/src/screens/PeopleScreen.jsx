import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { Search, Plus, ChevronRight, Phone, MessageCircle } from 'lucide-react-native';

export const PeopleScreen = () => {
  const { contacts, families, navigateTo } = useApp();
  const [tab, setTab] = useState('contacts'); // 'contacts' | 'families'
  const [query, setQuery] = useState('');

  const formatVND = (num) => (num || 0).toLocaleString('vi-VN') + ' đ';

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      (c.relationship || '').toLowerCase().includes(query.toLowerCase())
  );

  const filteredFamilies = families.filter((f) =>
    f.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.titleRow}>
          <Text style={styles.title}>Mọi người</Text>
          <TouchableOpacity style={styles.addBtn} onPress={() => navigateTo('add-entry')}>
            <Plus size={20} color="#FFFFFF" strokeWidth={3} />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchBox}>
          <Search size={16} color="#94A3B8" />
          <TextInput
            style={styles.searchInput}
            placeholder="Tìm theo tên, quan hệ..."
            placeholderTextColor="#94A3B8"
            value={query}
            onChangeText={setQuery}
          />
        </View>

        {/* Tabs */}
        <View style={styles.tabsRow}>
          <TouchableOpacity
            style={[styles.tabBtn, tab === 'contacts' && styles.activeTabBtn]}
            onPress={() => setTab('contacts')}
          >
            <Text style={[styles.tabText, tab === 'contacts' && styles.activeTabText]}>
              Danh bạ ({contacts.length})
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.tabBtn, tab === 'families' && styles.activeTabBtn]}
            onPress={() => setTab('families')}
          >
            <Text style={[styles.tabText, tab === 'families' && styles.activeTabText]}>
              Hộ gia đình ({families.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content List */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {tab === 'contacts' ? (
          filteredContacts.map((contact) => {
            const balance = contact.netBalance || 0;
            return (
              <TouchableOpacity
                key={contact.id}
                style={styles.card}
                onPress={() => navigateTo('person-detail', { personId: contact.id })}
                activeOpacity={0.8}
              >
                <View style={styles.cardHeader}>
                  <View style={styles.avatarCircle}>
                    <Text style={styles.avatarText}>{contact.name.charAt(0)}</Text>
                  </View>
                  <View style={styles.cardInfo}>
                    <View style={styles.nameRow}>
                      <Text style={styles.cardName}>{contact.name}</Text>
                      {contact.salutation && (
                        <View style={styles.salutationBadge}>
                          <Text style={styles.salutationText}>{contact.salutation}</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.cardSub}>
                      {contact.relationship || 'Khách'} {contact.phone ? `· ${contact.phone}` : ''}
                    </Text>
                  </View>
                  <ChevronRight size={18} color="#94A3B8" />
                </View>

                {/* Balance footer */}
                <View style={styles.cardFooter}>
                  <Text style={styles.footerLabel}>Số dư qua lại:</Text>
                  <Text
                    style={[
                      styles.footerBalance,
                      balance >= 0 ? { color: '#0B8A63' } : { color: '#E0285C' },
                    ]}
                  >
                    {balance >= 0 ? '+' : ''}{formatVND(balance)}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        ) : (
          filteredFamilies.map((family) => (
            <View key={family.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <View style={[styles.avatarCircle, { backgroundColor: '#FEF3C7' }]}>
                  <Text style={[styles.avatarText, { color: '#D97706' }]}>🏠</Text>
                </View>
                <View style={styles.cardInfo}>
                  <Text style={styles.cardName}>{family.name}</Text>
                  <Text style={styles.cardSub}>{family.category} · {family.membersCount} thành viên</Text>
                </View>
              </View>

              <View style={styles.cardFooter}>
                <Text style={styles.footerLabel}>Tổng chênh lệch hộ:</Text>
                <Text
                  style={[
                    styles.footerBalance,
                    family.netBalance >= 0 ? { color: '#0B8A63' } : { color: '#E0285C' },
                  ]}
                >
                  {family.netBalance >= 0 ? '+' : ''}{formatVND(family.netBalance)}
                </Text>
              </View>
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
  tabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 12,
    padding: 3,
  },
  tabBtn: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    borderRadius: 10,
  },
  activeTabBtn: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
  },
  tabText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '600',
  },
  activeTabText: {
    color: '#E0285C',
    fontWeight: '700',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 12,
    paddingBottom: 90,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
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
  avatarCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#E0285C',
  },
  cardInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  cardName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B2445',
  },
  salutationBadge: {
    backgroundColor: '#F1F5F9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
  },
  salutationText: {
    fontSize: 10,
    color: '#64748B',
    fontWeight: '600',
  },
  cardSub: {
    fontSize: 12,
    color: '#64748B',
    marginTop: 2,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F1F5F9',
  },
  footerLabel: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  footerBalance: {
    fontSize: 13,
    fontWeight: '700',
  },
});
