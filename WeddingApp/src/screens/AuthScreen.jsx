import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { Mascot } from '../components/Mascot';
import { useApp } from '../context/AppContext';
import { Phone, ShieldCheck, ArrowLeft, Lock, User, CheckCircle2 } from 'lucide-react-native';

export const AuthScreen = () => {
  const { navigateTo, setIsPinUnlocked, showToast, user, setUser } = useApp();

  // Screen flow states: 'welcome' | 'phone' | 'otp'
  const [step, setStep] = useState('welcome');
  // Auth mode: 'login' | 'register'
  const [authMode, setAuthMode] = useState('login');

  // Form states
  const [phone, setPhone] = useState('0903456128');
  const [fullName, setFullName] = useState('');
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [countdown, setCountdown] = useState(45);
  const [isCounting, setIsCounting] = useState(false);

  // OTP Countdown timer
  useEffect(() => {
    let timer;
    if (isCounting && countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0) {
      setIsCounting(false);
    }
    return () => clearInterval(timer);
  }, [isCounting, countdown]);

  const handleSendOtp = () => {
    if (!phone || phone.length < 9) {
      showToast('Vui lòng nhập số điện thoại hợp lệ (10 số)');
      return;
    }
    if (authMode === 'register' && !fullName.trim()) {
      showToast('Vui lòng nhập họ và tên của bạn');
      return;
    }

    setStep('otp');
    setCountdown(45);
    setIsCounting(true);
    showToast(`Mã OTP 6 số đã gửi tới ${phone} (Mã mẫu: 123456)`);
  };

  const handleVerifyOtp = (enteredOtp) => {
    const code = enteredOtp || otp.join('');
    if (code.length < 6) {
      showToast('Vui lòng nhập đủ 6 số OTP');
      return;
    }

    // Success
    showToast(authMode === 'login' ? 'Đăng nhập thành công!' : 'Đăng ký tài khoản thành công!');
    if (authMode === 'register' && fullName.trim()) {
      setUser((prev) => ({ ...prev, name: fullName.trim(), phone }));
    }
    setIsPinUnlocked(true);
    navigateTo('home');
  };

  const handleOtpChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto submit when 6 digits are typed
    if (text && index < 5) {
      // Logic for focus can be extended, auto complete:
      if (newOtp.join('').length === 6) {
        handleVerifyOtp(newOtp.join(''));
      }
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
        {/* Top Header / Back button */}
        <View style={styles.topHeader}>
          {step !== 'welcome' ? (
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => setStep(step === 'otp' ? 'phone' : 'welcome')}
            >
              <ArrowLeft size={22} color="#1B2445" />
            </TouchableOpacity>
          ) : <View style={{ width: 40 }} />}
          
          <Text style={styles.headerTitle}>
            {step === 'welcome' && ''}
            {step === 'phone' && (authMode === 'login' ? 'Đăng Nhập' : 'Đăng Ký Tài Khoản')}
            {step === 'otp' && 'Xác Thực OTP'}
          </Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Hero Section with Mascot */}
        <View style={styles.heroSection}>
          <View style={styles.mascotCircle}>
            <Mascot
              state={step === 'otp' ? 'income' : 'hello'}
              size={150}
            />
          </View>

          <Text style={styles.appName}>Sổ Hiếu Hỉ</Text>
          <Text style={styles.tagline}>
            {step === 'welcome' && 'Ghi nhớ từng tấm lòng, để có đi có lại thật trọn vẹn.'}
            {step === 'phone' && (authMode === 'login' ? 'Nhập số điện thoại để tiếp tục vào sổ' : 'Tạo tài khoản mới để lưu trữ sổ hiếu hỉ của bạn')}
            {step === 'otp' && `Nhập mã 6 số vừa được gửi tới ${phone}`}
          </Text>
        </View>

        {/* STEP 1: WELCOME SCREEN */}
        {step === 'welcome' && (
          <View style={styles.actionSection}>
            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => {
                setAuthMode('login');
                setStep('phone');
              }}
              activeOpacity={0.85}
            >
              <Phone size={18} color="#FFFFFF" />
              <Text style={styles.btnPrimaryText}>Tiếp tục bằng Số điện thoại</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnOutline}
              onPress={() => {
                showToast('Đã đăng nhập bằng Google demo!');
                setIsPinUnlocked(true);
                navigateTo('home');
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.btnOutlineText}>Tiếp tục với Google</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.btnDark}
              onPress={() => {
                showToast('Đã đăng nhập bằng Apple demo!');
                setIsPinUnlocked(true);
                navigateTo('home');
              }}
              activeOpacity={0.85}
            >
              <Text style={styles.btnDarkText}>Tiếp tục với Apple</Text>
            </TouchableOpacity>

            <View style={styles.securityNote}>
              <ShieldCheck size={16} color="#0B8A63" />
              <Text style={styles.securityText}>Số tiền được mã hoá, chỉ bạn xem được.</Text>
            </View>
          </View>
        )}

        {/* STEP 2: PHONE & NAME INPUT */}
        {step === 'phone' && (
          <View style={styles.formCard}>
            {/* Mode Switcher Tabs */}
            <View style={styles.tabContainer}>
              <TouchableOpacity
                style={[styles.tab, authMode === 'login' && styles.activeTab]}
                onPress={() => setAuthMode('login')}
              >
                <Text style={[styles.tabText, authMode === 'login' && styles.activeTabText]}>
                  Đăng nhập
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.tab, authMode === 'register' && styles.activeTab]}
                onPress={() => setAuthMode('register')}
              >
                <Text style={[styles.tabText, authMode === 'register' && styles.activeTabText]}>
                  Đăng ký mới
                </Text>
              </TouchableOpacity>
            </View>

            {/* Input Name if Registering */}
            {authMode === 'register' && (
              <View style={styles.inputGroup}>
                <Text style={styles.label}>Họ và tên của bạn</Text>
                <View style={styles.inputWrapper}>
                  <User size={20} color="#94A3B8" style={styles.inputIcon} />
                  <TextInput
                    style={styles.input}
                    placeholder="Ví dụ: Minh Quân, Thu Hà..."
                    placeholderTextColor="#94A3B8"
                    value={fullName}
                    onChangeText={setFullName}
                  />
                </View>
              </View>
            )}

            {/* Input Phone */}
            <View style={styles.inputGroup}>
              <Text style={styles.label}>Số điện thoại</Text>
              <View style={styles.inputWrapper}>
                <Text style={styles.countryCode}>+84</Text>
                <View style={styles.vDivider} />
                <TextInput
                  style={styles.input}
                  placeholder="090 123 4567"
                  placeholderTextColor="#94A3B8"
                  keyboardType="phone-pad"
                  maxLength={11}
                  value={phone}
                  onChangeText={setPhone}
                />
              </View>
            </View>

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={handleSendOtp}
              activeOpacity={0.85}
            >
              <Text style={styles.btnPrimaryText}>
                {authMode === 'login' ? 'Gửi mã OTP xác thực' : 'Tạo tài khoản & Gửi OTP'}
              </Text>
            </TouchableOpacity>

            <Text style={styles.termsText}>
              Bằng việc tiếp tục, bạn đồng ý với Điều khoản sử dụng & Chính sách bảo mật của Sổ Hiếu Hỉ.
            </Text>
          </View>
        )}

        {/* STEP 3: OTP VERIFICATION */}
        {step === 'otp' && (
          <View style={styles.formCard}>
            <Text style={styles.otpNoticeTitle}>Mã xác thực 6 chữ số</Text>
            <Text style={styles.otpNoticeSub}>
              Nhập mã OTP vừa gửi đến <Text style={{ fontWeight: '700', color: '#1B2445' }}>{phone}</Text>
            </Text>

            {/* 6 Digits OTP Box */}
            <View style={styles.otpContainer}>
              {[0, 1, 2, 3, 4, 5].map((idx) => (
                <TextInput
                  key={idx}
                  style={styles.otpBox}
                  keyboardType="number-pad"
                  maxLength={1}
                  value={otp[idx]}
                  onChangeText={(val) => handleOtpChange(val, idx)}
                />
              ))}
            </View>

            <TouchableOpacity
              style={styles.btnPrimary}
              onPress={() => handleVerifyOtp()}
              activeOpacity={0.85}
            >
              <CheckCircle2 size={18} color="#FFFFFF" />
              <Text style={styles.btnPrimaryText}>Xác nhận & Vào sổ</Text>
            </TouchableOpacity>

            {/* Resend Timer */}
            <View style={styles.resendRow}>
              {isCounting ? (
                <Text style={styles.resendText}>Gửi lại mã sau {countdown}s</Text>
              ) : (
                <TouchableOpacity onPress={handleSendOtp}>
                  <Text style={styles.resendBtnText}>Gửi lại mã OTP ngay</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F8F6FB',
    paddingHorizontal: 24,
    paddingBottom: 40,
    justifyContent: 'space-between',
  },
  topHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 45,
    paddingBottom: 10,
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  headerTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#1B2445',
  },
  heroSection: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  mascotCircle: {
    width: 170,
    height: 170,
    borderRadius: 85,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1B2445',
    marginBottom: 6,
  },
  tagline: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 20,
  },
  actionSection: {
    width: '100%',
    gap: 12,
    marginTop: 20,
  },
  formCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 24,
    padding: 20,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    marginTop: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#F1F5F9',
    borderRadius: 14,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  activeTab: {
    backgroundColor: '#FFFFFF',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#64748B',
  },
  activeTabText: {
    color: '#E0285C',
    fontWeight: '700',
  },
  inputGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#1B2445',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    borderRadius: 14,
    paddingHorizontal: 14,
    height: 50,
    backgroundColor: '#FAFAFA',
  },
  countryCode: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1B2445',
    marginRight: 10,
  },
  vDivider: {
    width: 1,
    height: 20,
    backgroundColor: '#CBD5E1',
    marginRight: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: '#1B2445',
    fontWeight: '500',
  },
  btnPrimary: {
    backgroundColor: '#E0285C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 15,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#E0285C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    gap: 8,
    marginTop: 8,
  },
  btnPrimaryText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
  btnOutline: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E2E8F0',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  btnOutlineText: {
    color: '#1B2445',
    fontSize: 15,
    fontWeight: '600',
  },
  btnDark: {
    backgroundColor: '#1B2445',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
  },
  btnDarkText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
    gap: 6,
  },
  securityText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
  termsText: {
    fontSize: 11,
    color: '#94A3B8',
    textAlign: 'center',
    marginTop: 14,
    lineHeight: 16,
  },
  otpNoticeTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#1B2445',
    textAlign: 'center',
    marginBottom: 4,
  },
  otpNoticeSub: {
    fontSize: 13,
    color: '#64748B',
    textAlign: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 44,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: '#E2E8F0',
    backgroundColor: '#FAFAFA',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    color: '#1B2445',
  },
  resendRow: {
    alignItems: 'center',
    marginTop: 16,
  },
  resendText: {
    fontSize: 13,
    color: '#94A3B8',
  },
  resendBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#E0285C',
  },
});

