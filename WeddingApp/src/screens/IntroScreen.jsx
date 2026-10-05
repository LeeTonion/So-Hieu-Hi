import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react-native';
import { Mascot } from '../components/Mascot';

export const IntroScreen = () => {
  const { navigateTo } = useApp();

  return (
    <View style={styles.container}>
      <Mascot state="hello" size={150} />
      <Text style={styles.title}>Chào mừng bạn đến Sổ Hiếu Hỉ</Text>
      <Text style={styles.subtitle}>
        Ứng dụng giúp bạn ghi nhớ mọi tấm lòng, quản lý ngân sách lễ hội và chia sẻ niềm vui cùng gia đình, bạn bè.
      </Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigateTo('auth')}
        activeOpacity={0.85}
      >
        <Text style={styles.buttonText}>Bắt đầu</Text>
        <ArrowRight size={18} color="#FFFFFF" strokeWidth={2.5} />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F6FB',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 28,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: '#1B2445',
    textAlign: 'center',
    marginTop: 24,
  },
  subtitle: {
    fontSize: 14,
    color: '#64748B',
    textAlign: 'center',
    marginTop: 12,
    lineHeight: 22,
  },
  button: {
    marginTop: 36,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#E0285C',
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#E0285C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
});
