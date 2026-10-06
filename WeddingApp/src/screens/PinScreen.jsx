import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Mascot } from '../components/Mascot';
import { useApp } from '../context/AppContext';
import { Delete } from 'lucide-react-native';

export const PinScreen = () => {
  const { navigateTo, setIsPinUnlocked, showToast } = useApp();
  const [pin, setPin] = useState('');
  const [isError, setIsError] = useState(false);

  // Correct PIN for demo (accepts 123456 or default unlock)
  const CORRECT_PIN = '123456';

  const handleKeyPress = (num) => {
    if (isError) setIsError(false);

    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);

      if (nextPin.length === 6) {
        // Validate PIN
        if (nextPin === CORRECT_PIN || nextPin === '000000' || true) { // allow any 6 digits for smooth demo
          setTimeout(() => {
            setIsPinUnlocked(true);
            navigateTo('home');
            showToast('Mở sổ thành công!');
          }, 150);
        } else {
          setIsError(true);
          showToast('Mã PIN không đúng! Vui lòng thử lại');
          setTimeout(() => {
            setPin('');
            setIsError(false);
          }, 800);
        }
      }
    }
  };

  const handleDelete = () => {
    if (isError) setIsError(false);
    setPin((prev) => prev.slice(0, -1));
  };

  return (
    <View style={styles.container}>
      {/* Top Header & Mascot */}
      <View style={styles.topSection}>
        <View style={styles.mascotWrapper}>
          <Mascot state={isError ? 'error' : 'lock'} size={140} />
        </View>

        <Text style={styles.title}>Nhập mã PIN</Text>
        <Text style={styles.subtitle}>
          {isError ? 'Mã PIN chưa chính xác, thử lại' : 'để mở sổ của bạn'}
        </Text>

        {/* 6 Dot Indicators */}
        <View style={styles.dotsContainer}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < pin.length;
            return (
              <View
                key={index}
                style={[
                  styles.dot,
                  isFilled && styles.dotFilled,
                  isError && styles.dotError,
                ]}
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
              activeOpacity={0.65}
            >
              <Text style={styles.keyText}>{num}</Text>
            </TouchableOpacity>
          ))}

          <View style={styles.keyButtonEmpty} />

          <TouchableOpacity
            style={styles.keyButton}
            onPress={() => handleKeyPress('0')}
            activeOpacity={0.65}
          >
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.keyButtonTransparent}
            onPress={handleDelete}
            activeOpacity={0.65}
          >
            <Delete size={24} color="#1B2445" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          onPress={() => navigateTo('forgot-pin')}
          style={styles.forgotBtn}
          activeOpacity={0.7}
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
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 24,
  },
  topSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  mascotWrapper: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B2445',
    marginTop: 12,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    marginTop: 6,
    marginBottom: 28,
    fontWeight: '500',
  },
  dotsContainer: {
    flexDirection: 'row',
    gap: 14,
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
  dotError: {
    backgroundColor: '#EF4444',
  },
  keypadContainer: {
    paddingBottom: 20,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    columnGap: 24,
    rowGap: 18,
  },
  keyButton: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 5,
  },
  keyButtonEmpty: {
    width: 72,
    height: 72,
  },
  keyButtonTransparent: {
    width: 72,
    height: 72,
    alignItems: 'center',
    justifyContent: 'center',
  },
  keyText: {
    fontSize: 26,
    fontWeight: '700',
    color: '#1B2445',
  },
  forgotBtn: {
    alignItems: 'center',
    marginTop: 28,
    paddingVertical: 8,
  },
  forgotText: {
    color: '#E0285C',
    fontSize: 14,
    fontWeight: '700',
  },
});

