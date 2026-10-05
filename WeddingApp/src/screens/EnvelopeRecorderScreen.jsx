import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Mic, MicOff } from 'lucide-react-native';
import { Mascot } from '../components/Mascot';

export const EnvelopeRecorderScreen = () => {
  const { goBack, addTransaction, showToast } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [recorded, setRecorded] = useState([]);
  const [lastParsed, setLastParsed] = useState(null);

  const mockEntries = [
    { name: 'Bác Hòa', amount: 2000000, direction: 'received', occasion: 'Tân gia' },
    { name: 'Cô Tươi', amount: 500000, direction: 'received', occasion: 'Cưới hỏi' },
    { name: 'Anh Tuấn', amount: 1000000, direction: 'received', occasion: 'Cưới hỏi' },
  ];

  const simulateVoiceEntry = () => {
    const entry = mockEntries[recorded.length % mockEntries.length];
    if (!entry) return;

    setLastParsed(entry);

    setTimeout(() => {
      const tx = {
        personId: null,
        personName: entry.name,
        type: entry.direction,
        categoryType: 'Hỉ',
        occasion: entry.occasion,
        date: new Date().toISOString().split('T')[0],
        amount: entry.amount,
      };
      addTransaction(tx);
      setRecorded((prev) => [{ ...tx, id: Date.now() }, ...prev]);
      setLastParsed(null);
      setIsListening(false);
    }, 2000);
  };

  const toggleRecording = () => {
    if (!isListening) {
      setIsListening(true);
      simulateVoiceEntry();
    } else {
      setIsListening(false);
    }
  };

  const formatVND = (num) => (num || 0).toLocaleString('vi-VN') + ' đ';

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={goBack}>
          <ArrowLeft size={20} color="#FFFFFF" />
        </TouchableOpacity>
        <View>
          <Text style={styles.headerTitle}>Ghi phong bì</Text>
          <Text style={styles.headerSub}>Đọc to: "Cô Tươi, 500 nghìn"</Text>
        </View>
      </View>

      {/* Mascot and status */}
      <View style={styles.mascotArea}>
        <Mascot state={isListening ? 'income' : 'hello'} size={120} />
        {lastParsed ? (
          <View style={styles.parsedBox}>
            <Text style={styles.parsedSub}>Đang ghi nhận...</Text>
            <Text style={styles.parsedMain}>"{lastParsed.name} — {formatVND(lastParsed.amount)}"</Text>
          </View>
        ) : (
          <Text style={styles.statusText}>
            {isListening ? 'Đang lắng nghe giọng đọc...' : 'Nhấn mic để bắt đầu'}
          </Text>
        )}
      </View>

      {/* Mic Button */}
      <View style={styles.micArea}>
        <TouchableOpacity
          style={[styles.micBtn, isListening && styles.micBtnActive]}
          onPress={toggleRecording}
          activeOpacity={0.8}
        >
          {isListening ? (
            <MicOff size={36} color="#FFFFFF" />
          ) : (
            <Mic size={36} color="#FFFFFF" />
          )}
        </TouchableOpacity>
      </View>

      {/* Recorded List */}
      <ScrollView style={styles.scroll} contentContainerStyle={styles.scrollContent}>
        {recorded.length > 0 && (
          <>
            <Text style={styles.recordedHeader}>ĐÃ GHI HÔM NAY ({recorded.length} phong bì)</Text>
            {recorded.map((rec) => (
              <View key={rec.id} style={styles.recItem}>
                <Text style={styles.recName}>{rec.personName}</Text>
                <Text style={styles.recAmount}>+{formatVND(rec.amount)}</Text>
              </View>
            ))}
          </>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D1322',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingTop: 48,
    paddingBottom: 14,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  headerSub: {
    fontSize: 12,
    color: 'rgba(255, 255, 255, 0.6)',
    marginTop: 2,
  },
  mascotArea: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  statusText: {
    color: 'rgba(255, 255, 255, 0.5)',
    fontSize: 14,
    fontWeight: '500',
    marginTop: 12,
  },
  parsedBox: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 12,
    alignItems: 'center',
  },
  parsedSub: {
    fontSize: 11,
    color: 'rgba(255, 255, 255, 0.7)',
  },
  parsedMain: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFB938',
    marginTop: 2,
  },
  micArea: {
    alignItems: 'center',
    paddingVertical: 14,
  },
  micBtn: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: '#E0285C',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 8,
    shadowColor: '#E0285C',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.5,
    shadowRadius: 12,
  },
  micBtnActive: {
    backgroundColor: '#EF4444',
  },
  scroll: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
  },
  recordedHeader: {
    fontSize: 11,
    fontWeight: '700',
    color: 'rgba(255, 255, 255, 0.5)',
    letterSpacing: 1,
    marginBottom: 10,
  },
  recItem: {
    backgroundColor: 'rgba(255, 255, 255, 0.08)',
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  recName: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
  recAmount: {
    color: '#0B8A63',
    fontSize: 14,
    fontWeight: '800',
  },
});
