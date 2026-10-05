import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Bell, Moon, Sun, ShieldCheck, Eye, EyeOff, ChevronRight, LogOut, Palette, HelpCircle, Star } from 'lucide-react';

export const SettingsScreen = () => {
  const { user, setUser, goBack, navigateTo, showToast } = useApp();
  const [theme, setTheme] = useState(user.theme || 'light');

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
    setUser(prev => ({ ...prev, theme: newTheme }));
    showToast(`Đã đổi giao diện sang ${newTheme === 'light' ? 'sáng' : newTheme === 'dark' ? 'tối' : 'tự động'}`);
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-[#F8F6FB] dark:bg-[#0D1322]">
      {/* Header */}
      <div className="bg-white dark:bg-[#161F33] px-5 pt-12 pb-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <button onClick={goBack} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1E2B45] flex items-center justify-center text-[#1B2445] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          <ArrowLeft size={18} />
        </button>
        <h1 className="text-xl font-extrabold text-[#1B2445] dark:text-white flex-1">Cài đặt</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-5 space-y-5">
        {/* Profile Card */}
        <div className="bg-white dark:bg-[#161F33] rounded-3xl p-5 border border-slate-100 dark:border-slate-800 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-gradient-to-br from-rose-400 to-[#E0285C] flex items-center justify-center text-white font-extrabold text-xl shadow-lg shadow-rose-500/30">
              {user.avatar}
            </div>
            <div>
              <p className="font-extrabold text-[#1B2445] dark:text-white text-lg">{user.name}</p>
              <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Theme Picker */}
        <SettingsSection title="Giao diện">
          <div className="px-4 py-3 flex gap-3">
            {[
              { id: 'light', label: 'Sáng', icon: Sun },
              { id: 'dark', label: 'Tối', icon: Moon },
              { id: 'system', label: 'Tự động', icon: Palette }
            ].map(t => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  onClick={() => handleThemeChange(t.id)}
                  className={`flex-1 py-3 rounded-xl flex flex-col items-center gap-1.5 border-2 transition-all ${
                    theme === t.id
                      ? 'border-[#E0285C] bg-rose-50 dark:bg-rose-900/20'
                      : 'border-slate-100 dark:border-slate-700 bg-transparent'
                  }`}
                >
                  <Icon size={18} className={theme === t.id ? 'text-[#E0285C]' : 'text-slate-400 dark:text-slate-500'} />
                  <span className={`text-[11px] font-bold ${theme === t.id ? 'text-[#E0285C]' : 'text-slate-400 dark:text-slate-500'}`}>{t.label}</span>
                </button>
              );
            })}
          </div>
        </SettingsSection>

        {/* Privacy */}
        <SettingsSection title="Riêng tư & Bảo mật">
          <SettingsRow
            icon={<ShieldCheck size={16} className="text-[#0B8A63]" />}
            label="Mã PIN khoá sổ"
            value={user.pinEnabled ? 'Đang bật' : 'Tắt'}
            badge={user.pinEnabled ? 'Bật' : null}
            onClick={() => showToast('Đổi PIN: Tính năng đầy đủ trong app thật')}
          />
          <SettingsRow
            icon={<Eye size={16} className="text-[#1B2445] dark:text-white" />}
            label="Ẩn số tiền trang chủ"
            value={user.hideAmountOnHome ? 'Đang ẩn' : 'Đang hiện'}
            badge={user.hideAmountOnHome ? 'Bật' : null}
            onClick={() => setUser(prev => ({ ...prev, hideAmountOnHome: !prev.hideAmountOnHome }))}
          />
        </SettingsSection>

        {/* Notification */}
        <SettingsSection title="Thông báo">
          <SettingsRow
            icon={<Bell size={16} className="text-amber-500" />}
            label="Nhắc trước sự kiện"
            value={`${user.reminderDaysBefore} ngày trước`}
            onClick={() => showToast('Cài đặt nhắc nhở')}
          />
          <SettingsRow
            icon={<span className="text-sm">🌙</span>}
            label="Nhắc ngày âm lịch"
            value={user.lunarReminder ? 'Bật' : 'Tắt'}
            badge={user.lunarReminder ? 'Bật' : null}
            onClick={() => setUser(prev => ({ ...prev, lunarReminder: !prev.lunarReminder }))}
          />
        </SettingsSection>

        {/* Support */}
        <SettingsSection title="Hỗ trợ">
          <SettingsRow icon={<HelpCircle size={16} className="text-slate-400" />} label="Hướng dẫn sử dụng" onClick={() => showToast('Mở tài liệu hướng dẫn')} />
          <SettingsRow icon={<Star size={16} className="text-amber-400" />} label="Đánh giá ứng dụng" onClick={() => showToast('Mở App Store để đánh giá')} />
        </SettingsSection>

        {/* Logout */}
        <button
          onClick={() => navigateTo('auth')}
          className="w-full py-3.5 rounded-2xl text-[#E0285C] font-bold text-sm flex items-center justify-center gap-2 bg-rose-50 dark:bg-rose-900/10 border border-rose-100 dark:border-rose-900/30 hover:bg-rose-100 dark:hover:bg-rose-900/20 transition-all"
        >
          <LogOut size={16} />
          Đăng xuất
        </button>

        <div className="text-center pb-4">
          <p className="text-[11px] text-slate-300 dark:text-slate-600 font-medium">Sổ Hiếu Hỉ v1.0.0 · Bản thử nghiệm</p>
        </div>
      </div>
    </div>
  );
};

const SettingsSection = ({ title, children }) => (
  <div className="bg-white dark:bg-[#161F33] rounded-3xl border border-slate-100 dark:border-slate-800 shadow-sm overflow-hidden">
    <p className="text-[11px] font-extrabold text-slate-400 dark:text-slate-500 uppercase tracking-wider px-5 pt-4 pb-1">{title}</p>
    {children}
  </div>
);

const SettingsRow = ({ icon, label, value, badge, onClick }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 px-5 py-3.5 border-t border-slate-100 dark:border-slate-800 first:border-t-0 hover:bg-slate-50 dark:hover:bg-[#1E2B45] transition-all text-left"
  >
    <div className="w-7 h-7 rounded-xl bg-slate-100 dark:bg-[#1E2B45] flex items-center justify-center shrink-0">
      {icon}
    </div>
    <span className="flex-1 font-semibold text-sm text-[#1B2445] dark:text-white">{label}</span>
    {badge && (
      <span className="text-[10px] bg-green-100 text-[#0B8A63] dark:bg-green-900/30 dark:text-green-300 font-bold px-2 py-0.5 rounded-full">{badge}</span>
    )}
    {value && <span className="text-xs text-slate-400 dark:text-slate-500 font-medium ml-2">{value}</span>}
    <ChevronRight size={14} className="text-slate-300 dark:text-slate-600 shrink-0" />
  </button>
);
