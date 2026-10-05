import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight } from 'lucide-react';
import { Mascot } from '../components/Mascot';

export const IntroScreen = () => {
  const { navigateTo } = useApp();

  return (
    <div className="flex-1 flex flex-col bg-[#F8F6FB] dark:bg-[#0D1322] items-center justify-center text-center px-6 py-8">
      <Mascot state="hello" size={140} />
      <h1 className="mt-6 text-2xl font-extrabold text-[#1B2445] dark:text-white">Chào mừng bạn đến Sổ Hiếu Hỉ</h1>
      <p className="mt-3 text-sm text-[#1B2445]/70 dark:text-white/70 max-w-md">
        Ứng dụng giúp bạn ghi nhớ mọi tấm lòng, quản lý ngân sách lễ hội và chia sẻ niềm vui cùng gia đình, bạn bè.
      </p>
      <button
        onClick={() => navigateTo('auth')}
        className="mt-8 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#F0573F] to-[#E0285C] text-white rounded-xl font-bold hover:shadow-lg transition-all"
      >
        Bắt đầu <ArrowRight size={18} />
      </button>
    </div>
  );
};
