import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Mascot } from '../components/Mascot';
import { useApp } from '../context/AppContext';
import { Delete } from 'lucide-react-native';

export const PinScreen = () => {
  const { navigateTo, setIsPinUnlocked, showToast } = useApp();
  const [pin, setPin] = useState('');

  const handleKeyPress = (num) => {
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);

      if (nextPin.length === 6) {
        setTimeout(() => {
          setIsPinUnlocked(true);
          navigateTo('home');
          showToast('Mở sổ thành công!');
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      {/* Top Header & Mascot */}
      <View style={styles.topSection}>
        <Mascot state="lock" size={130} />
        <Text style={styles.title}>Nhập mã PIN</Text>
        <Text style={styles.subtitle}>để mở sổ của bạn</Text>

        {/* 6 Dot Indicators */}
        <View style={styles.dotsContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < pin.length;
            return (
              <View
                key={index}
                style={[styles.dot, isFilled && styles.dotFilled]}
              />
            );
          })}
        </View>
      </View>

      {/* Numeric Keypad */}
      <View style={styles.keypadContainer}>
        <View style={styles.grid}>
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <TouchableOpacity
              key={num}
              style={styles.keyButton}
              onPress={() => handleKeyPress(num.toString())}
              activeOpacity={0.7}
            >
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.keyButtonEmpty} />

          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress('0')}
            activeOpacity={0.7}
          >
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keyButtonTransparent}
            onPress={handleDelete}
            activeOpacity={0.7}
          >
            <Delete size={26} color="#1B2445" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigateTo('forgot-pin')}
          style={styles.forgotBtn}
        >
          <Text style={styles.forgotText}>Quên mã PIN?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FB',
    justifyContent: 'space-between',
    padding: 24,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B2445',
    marginTop: 16,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 4,
    marginBottom: 20,
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 12,
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#E2E8F0',
  },
  dotFilled: {
    backgroundColor: '#E0285C',
    transform: [{ scale: 1.15 }],
  },
  keypadContainer: {
    paddingBottom: 24,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 16,
  },
  keyButton: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 4,
  },
  keyButtonEmpty: {
    width: 68,
    height: 68,
  },
  keyButtonTransparent: {
    width: 68,
    height: 68,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1B2445',
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: 20,
  },
  forgotText: {
    color: '#E0285C',
    fontSize: 14,
    fontWeight: '700',
  },
});
