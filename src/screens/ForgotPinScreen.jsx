import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Mail } from 'lucide-react';
import { Mascot } from '../components/Mascot';

export const ForgotPinScreen = () => {
  const { goBack, showToast, navigateTo } = useApp();
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    if (!email) {
      showToast('Vui lòng nhập email để nhận mã khôi phục.');
      return;
    }
    // Mock sending OTP – in real app would call API
    setSent(true);
    showToast('Mã khôi phục đã gửi tới email!');
  };

  const handleReset = () => {
    // Mock reset – clear PIN and go back to login flow
    navigateTo('auth');
    showToast('PIN đã được reset, vui lòng đăng nhập lại.');
  };

  return (
    <div className="flex-1 flex flex-col bg-[#F8F6FB] dark:bg-[#0D1322] text-[#1B2445] dark:text-white">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={goBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ArrowLeft size={18} />
        </button>
        <h1 className="font-extrabold text-xl">Quên mã PIN</h1>
      </div>

      {/* Mascot */}
      <div className="flex flex-col items-center py-6">
        <Mascot state="empty" size={120} />
      </div>

      {/* Form */}
      <div className="flex-1 px-6">
        {sent ? (
          <div className="text-center space-y-4">
            <p className="text-lg font-medium">Mã khôi phục đã được gửi tới <span className="font-bold">{email}</span></p>
            <button
              onClick={handleReset}
              className="mt-4 px-5 py-2 bg-gradient-to-r from-[#F0573F] to-[#E0285C] text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              Đặt lại PIN và quay lại đăng nhập
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <label className="block text-sm font-medium mb-1">Email của bạn</label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-xl bg-white dark:bg-[#1E2B45] border border-slate-200 dark:border-slate-700 text-[#1B2445] dark:text-white focus:outline-none focus:ring-2 focus:ring-[#E0285C]"
            />
            <button
              onClick={handleSend}
              className="w-full flex items-center justify-center gap-2 px-5 py-2 bg-gradient-to-r from-[#F0573F] to-[#E0285C] text-white rounded-xl font-bold hover:shadow-lg transition-all"
            >
              <Mail size={18} /> Gửi mã khôi phục
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
