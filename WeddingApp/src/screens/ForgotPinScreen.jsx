import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowLeft, KeyRound, Check } from 'lucide-react-native';

export const ForgotPinScreen = () => {
  const { goBack, showToast } = useApp();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');

  const handleSendOtp = () => {
    if (!email) {
      showToast('Vui lòng nhập email hoặc số điện thoại!');
      return;
    }
    setStep(2);
    showToast('Mã xác thực đã được gửi!');
  };

  const handleResetPin = () => {
    if (otp.length < 4) {
      showToast('Vui lòng nhập mã xác thực gồm 4 số!');
      return;
    }
    showToast('Đã đặt lại mã PIN thành công: 123456');
    goBack();
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={goBack}>
          <ArrowLeft size={20} color="#1B2445" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Quên mã PIN</Text>
      </View>

      <View style={styles.content}>
        <View style={styles.iconCircle}>
          <KeyRound size={36} color="#E0285C" />
        </View>

        <Text style={styles.title}>
          {step === 1 ? 'Khôi phục mã PIN' : 'Nhập mã xác thực'}
        </Text>
        <Text style={styles.subtitle}>
          {step === 1
            ? 'Nhập email hoặc số điện thoại đã đăng ký để nhận mã khôi phục.'
            : `Nhập mã 4 chữ số vừa được gửi đến ${email}`}
        </Text>

        {step === 1 ? (
          <View style={styles.form}>
            <TextInput
              style={styles.input}
              placeholder="Email hoặc số điện thoại"
              placeholderTextColor="#94A3B8"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleSendOtp}>
              <Text style={styles.submitBtnText}>Gửi mã xác thực</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.form}>
            <TextInput
              style={[styles.input, { letterSpacing: 8, textAlign: 'center', fontSize: 22 }]}
              placeholder="••••"
              placeholderTextColor="#94A3B8"
              value={otp}
              onChangeText={setOtp}
              keyboardType="number-pad"
              maxLength={4}
            />
            <TouchableOpacity style={styles.submitBtn} onPress={handleResetPin}>
              <Text style={styles.submitBtnText}>Xác nhận & Mở sổ</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FB',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginTop: 10,
    marginBottom: 20,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1B2445',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 22,
    fontWeight: '800',
    color: '#1B2445',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 28,
    lineHeight: 20,
  },
  form: {
    width: '100%',
    gap: 14,
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: '#1B2445',
  },
  submitBtn: {
    backgroundColor: '#E0285C',
    borderRadius: 16,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#E0285C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
  },
  submitBtnText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});
