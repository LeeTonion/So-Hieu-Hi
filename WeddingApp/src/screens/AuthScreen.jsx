import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Mascot } from '../components/Mascot';
import { useApp } from '../context/AppContext';
import { Phone, ShieldCheck } from 'lucide-react-native';

export const AuthScreen = () => {
  const { navigateTo, setIsPinUnlocked } = useApp();

  const handleLogin = () => {
    setIsPinUnlocked(true);
    navigateTo('home');
  };

  return (
    <View style={styles.container}>
      {/* Top Mascot Hero */}
      <View style={styles.heroSection}>
        <View style={styles.mascotCircle}>
          <Mascot state="hello" size={170} />
        </View>

        <Text style={styles.appName}>Sổ Hiếu Hỉ</Text>
        <Text style={styles.tagline}>
          Ghi nhớ từng tấm lòng, để có đi có lại thật trọn vẹn.
        </Text>
      </View>

      {/* Login Action Buttons */}
      <View style={styles.actionSection}>
        <TouchableOpacity style={styles.btnPrimary} onPress={handleLogin} activeOpacity={0.85}>
          <Phone size={18} color="#FFFFFF" />
          <Text style={styles.btnPrimaryText}>Tiếp tục bằng số điện thoại</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnOutline} onPress={handleLogin} activeOpacity={0.85}>
          <Text style={styles.btnOutlineText}>Tiếp tục với Google</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnDark} onPress={handleLogin} activeOpacity={0.85}>
          <Text style={styles.btnDarkText}>Tiếp tục với Apple</Text>
        </TouchableOpacity>

        <View style={styles.securityNote}>
          <ShieldCheck size={16} color="#0B8A63" />
          <Text style={styles.securityText}>Số tiền được mã hoá, chỉ bạn xem được.</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5F7',
    justifyContent: 'space-between',
    padding: 24,
  },
  heroSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  mascotCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#FFE4E6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  appName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#1B2445',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 15,
    color: '#64748B',
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
  actionSection: {
    width: '100%',
    gap: 12,
    marginBottom: 20,
  },
  btnPrimary: {
    backgroundColor: '#E0285C',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 14,
    borderRadius: 16,
    elevation: 4,
    shadowColor: '#E0285C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    gap: 8,
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
    marginTop: 8,
    gap: 6,
  },
  securityText: {
    fontSize: 12,
    color: '#64748B',
    fontWeight: '500',
  },
});
