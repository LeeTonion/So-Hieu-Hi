import React from 'react';
import { Mascot } from '../components/Mascot';
import { useApp } from '../context/AppContext';
import { Phone, ShieldCheck } from 'lucide-react';

export const AuthScreen = () => {
  const { navigateTo, setIsPinUnlocked } = useApp();

  const handleLogin = () => {
    setIsPinUnlocked(true);
    navigateTo('home');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#FFF5F7] via-white to-[#F8F6FB] dark:from-[#0D1322] dark:via-[#161F33] dark:to-[#0D1322] text-[#1B2445] dark:text-white">
      {/* Top Mascot Hero */}
      <div className="flex-1 flex flex-col items-center justify-center pt-8">
        <div className="relative mb-6">
          <div className="w-56 h-56 rounded-full bg-pink-100/60 dark:bg-pink-950/30 flex items-center justify-center shadow-inner">
            <Mascot state="hello" size={190} />
          </div>
        </div>

        <h1 className="text-3xl font-extrabold tracking-tight text-[#1B2445] dark:text-white mb-3 text-center">
          Sổ Hiếu Hỉ
        </h1>
        <p className="text-slate-600 dark:text-slate-300 text-center max-w-xs text-base leading-relaxed px-2 font-medium">
          Ghi nhớ từng tấm lòng, để có đi có lại thật trọn vẹn.
        </p>
      </div>

      {/* Login Action Buttons matching Page 3 screenshot */}
      <div className="space-y-3 mb-6 w-full max-w-xs mx-auto">
        <button
          onClick={handleLogin}
          className="w-full btn-primary-gradient py-3.5 shadow-lg flex items-center justify-center gap-2.5"
        >
          <Phone size={18} fill="currentColor" />
          <span>Tiếp tục bằng số điện thoại</span>
        </button>

        <button
          onClick={handleLogin}
          className="w-full bg-white dark:bg-[#1E2B45] text-[#1B2445] dark:text-white border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-sm"
        >
          {/* Google Icon SVG */}
          <svg width="18" height="18" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
          </svg>
          <span>Tiếp tục với Google</span>
        </button>

        <button
          onClick={handleLogin}
          className="w-full bg-[#1B2445] dark:bg-[#0D1322] text-white hover:bg-slate-800 py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-3 transition-all shadow-md"
        >
          {/* Apple Icon SVG */}
          <svg width="18" height="18" fill="currentColor" viewBox="0 0 170 170">
            <path d="M150.37 130.25c-2.45 5.66-5.35 10.87-8.71 15.66-4.58 6.53-8.33 11.05-11.22 13.56-4.48 4.12-9.28 6.23-14.42 6.35-3.69 0-8.14-1.05-13.32-3.18-5.19-2.12-9.97-3.17-14.34-3.17-4.58 0-9.49 1.05-14.75 3.17-5.26 2.13-9.5 3.24-12.74 3.35-5.02.12-9.87-1.92-14.54-6.1-3.32-2.9-7.25-7.61-11.8-14.13-7.53-10.74-13.34-22.75-17.43-36.03-4.09-13.28-6.14-25.79-6.14-37.53 0-15.63 3.92-28.53 11.75-38.7 7.83-10.17 17.65-15.34 29.47-15.52 4.9.12 10.19 1.25 15.87 3.39 5.68 2.14 9.61 3.21 11.79 3.21 2.07 0 6.09-1.12 12.06-3.37 5.97-2.25 11.02-3.32 15.15-3.21 11.53.64 21.01 4.96 28.44 12.96-10.3 6.23-15.34 14.88-15.13 25.96.22 8.71 3.65 16.03 10.29 21.96 6.64 5.93 14.54 9.27 23.7 10.02-2.61 7.74-6.09 15.34-10.44 22.8zM119.22 31.84c0-7.07 2.57-13.84 7.71-20.31 5.14-6.47 11.72-10.42 19.74-11.85.76 7.4-1.63 14.28-7.17 20.64-5.54 6.36-12.22 10.15-20.28 11.52z"/>
          </svg>
          <span>Tiếp tục với Apple</span>
        </button>

        <div className="pt-2 flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <ShieldCheck size={14} className="text-[#0B8A63]" />
          <span>Số tiền được mã hoá, chỉ bạn xem được.</span>
        </div>
      </div>
    </div>
  );
};
