import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { X, Check } from 'lucide-react-native';

const occasions = ['Cưới hỏi', 'Đám giỗ', 'Sinh nhật', 'Tân gia', 'Thôi nôi', 'Đầy tháng', 'Mừng thọ', 'Đám tang', 'Khác'];

export const AddEntryScreen = () => {
  const { goBack, contacts, addTransaction, navigateTo, showToast } = useApp();

  const [direction, setDirection] = useState('received'); // received | given
  const [amount, setAmount] = useState('');
  const [occasion, setOccasion] = useState('Cưới hỏi');
  const [personId, setPersonId] = useState('');
  const [personName, setPersonName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const quickAmounts = [100000, 200000, 300000, 500000, 1000000, 2000000];

  const handleSave = () => {
    const finalName = personName || (contacts.find((c) => c.id === personId)?.name);
    if (!amount || !finalName) {
      showToast('Vui lòng điền đầy đủ số tiền và tên người!');
      return;
    }

    addTransaction({
      personId: personId || null,
      personName: finalName,
      type: direction,
      categoryType: ['Cưới hỏi', 'Sinh nhật', 'Thôi nôi'].includes(occasion) ? 'Hỉ' : 'Hiếu',
      occasion: occasion || 'Khác',
      date,
      amount: parseInt(amount, 10),
    });

    goBack();
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <X size={20} color="#1B2445" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Ghi sổ mới</Text>
      </View>

      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {/* Direction Toggle */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleBtn,
              direction === 'received' && { backgroundColor: '#0B8A63' },
            ]}
            onPress={() => setDirection('received')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleText,
                direction === 'received' && { color: '#FFFFFF', fontWeight: '700' },
              ]}
            >
              🎁 ↓ Nhận về
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleBtn,
              direction === 'given' && { backgroundColor: '#E0285C' },
            ]}
            onPress={() => setDirection('given')}
            activeOpacity={0.8}
          >
            <Text
              style={[
                styles.toggleText,
                direction === 'given' && { color: '#FFFFFF', fontWeight: '700' },
              ]}
            >
              🤝 ↑ Đi mừng
            </Text>
          </TouchableOpacity>
        </View>

        {/* Amount Input */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>SỐ TIỀN (VNĐ)</Text>
          <TextInput
            style={styles.amountInput}
            placeholder="0"
            placeholderTextColor="#CBD5E1"
            value={amount}
            onChangeText={setAmount}
            keyboardType="number-pad"
          />

          {/* Quick Amounts */}
          <View style={styles.quickAmountsRow}>
            {quickAmounts.map((q) => (
              <TouchableOpacity
                key={q}
                style={styles.quickAmountBadge}
                onPress={() => setAmount(q.toString())}
              >
                <Text style={styles.quickAmountText}>{(q / 1000).toLocaleString('vi-VN')}k</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Person Selection or Text Input */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>{direction === 'received' ? 'TỪ AI?' : 'GỬI AI?'}</Text>
          <TextInput
            style={styles.input}
            placeholder="Nhập họ tên người..."
            placeholderTextColor="#94A3B8"
            value={personName}
            onChangeText={(text) => {
              setPersonName(text);
              setPersonId('');
            }}
          />

          <Text style={[styles.fieldLabel, { marginTop: 12 }]}>HOẶC CHỌN TỪ DANH BẠ:</Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.contactsScroll}>
            {contacts.map((c) => {
              const isSelected = personId === c.id;
              return (
                <TouchableOpacity
                  key={c.id}
                  style={[
                    styles.contactChip,
                    isSelected && styles.contactChipSelected,
                  ]}
                  onPress={() => {
                    setPersonId(c.id);
                    setPersonName(c.name);
                  }}
                >
                  <Text style={[styles.contactChipText, isSelected && styles.contactChipTextSelected]}>
                    {c.name}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Occasion Selection */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>DỊP / SỰ KIỆN</Text>
          <View style={styles.occasionsGrid}>
            {occasions.map((occ) => {
              const isSelected = occasion === occ;
              return (
                <TouchableOpacity
                  key={occ}
                  style={[
                    styles.occChip,
                    isSelected && styles.occChipSelected,
                  ]}
                  onPress={() => setOccasion(occ)}
                >
                  <Text style={[styles.occChipText, isSelected && styles.occChipTextSelected]}>
                    {occ}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        {/* Date Input */}
        <View style={styles.fieldSection}>
          <Text style={styles.fieldLabel}>NGÀY THÁNG</Text>
          <TextInput
            style={styles.input}
            placeholder="YYYY-MM-DD"
            placeholderTextColor="#94A3B8"
            value={date}
            onChangeText={setDate}
          />
        </View>

        {/* Save Button */}
        <TouchableOpacity style={styles.saveBtn} onPress={handleSave} activeOpacity={0.85}>
          <Check size={20} color="#FFFFFF" strokeWidth={2.5} />
          <Text style={styles.saveBtnText}>Lưu vào sổ</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 14,
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
    padding: 20,
    gap: 18,
    paddingBottom: 40,
  },
  toggleRow: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 16,
    padding: 4,
  },
  toggleBtn: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
  },
  toggleText: {
    fontSize: 14,
    color: '#64748B',
    fontWeight: '600',
  },
  fieldSection: {
    gap: 6,
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#64748B',
    letterSpacing: 0.8,
  },
  amountInput: {
    backgroundColor: '#F8F6FB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 26,
    fontWeight: '800',
    color: '#1B2445',
  },
  quickAmountsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 8,
  },
  quickAmountBadge: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 10,
  },
  quickAmountText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#1B2445',
  },
  input: {
    backgroundColor: '#F8F6FB',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1B2445',
  },
  contactsScroll: {
    flexDirection: 'row',
    marginTop: 4,
  },
  contactChip: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
    marginRight: 8,
  },
  contactChipSelected: {
    backgroundColor: '#E0285C',
  },
  contactChipText: {
    fontSize: 13,
    color: '#1B2445',
    fontWeight: '600',
  },
  contactChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  occasionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  occChip: {
    backgroundColor: '#F1F5F9',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 12,
  },
  occChipSelected: {
    backgroundColor: '#1B2445',
  },
  occChipText: {
    fontSize: 13,
    color: '#1B2445',
    fontWeight: '600',
  },
  occChipTextSelected: {
    color: '#FFFFFF',
    fontWeight: '700',
  },
  saveBtn: {
    backgroundColor: '#E0285C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 18,
    gap: 8,
    marginTop: 10,
    elevation: 4,
    shadowColor: '#E0285C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  saveBtnText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '800',
  },
});
