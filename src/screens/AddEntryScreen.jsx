import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, X, ChevronDown, User, Calendar, DollarSign, Check } from 'lucide-react';

const occasions = ['Cưới hỏi', 'Đám giỗ', 'Sinh nhật', 'Tân gia', 'Thôi nôi', 'Đầy tháng', 'Mừng thọ', 'Đám tang', 'Khác'];

export const AddEntryScreen = () => {
  const { goBack, contacts, addTransaction, navigateTo, showToast } = useApp();

  const [direction, setDirection] = useState('received'); // received | given
  const [amount, setAmount] = useState('');
  const [occasion, setOccasion] = useState('');
  const [personId, setPersonId] = useState('');
  const [personName, setPersonName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [note, setNote] = useState('');
  const [step, setStep] = useState(1); // 1: who | 2: amount | 3: confirm

  const quickAmounts = [100000, 200000, 300000, 500000, 1000000, 2000000];

  const handleSave = () => {
    if (!amount || !personName) {
      showToast('Vui lòng điền đầy đủ thông tin');
      return;
    }

    addTransaction({
      personId,
      personName,
      type: direction,
      categoryType: ['Cưới hỏi', 'Đám hỏi'].includes(occasion) ? 'Hỉ' : 'Hiếu',
      occasion: occasion || 'Khác',
      date,
      amount: parseInt(amount)
    });

    navigateTo(personId ? 'person-detail' : 'ledger', { personId });
  };

  const selectedContact = contacts.find(c => c.id === personId);

  return (
    <div className="flex-1 flex flex-col bg-white dark:bg-[#0D1322]">
      {/* Header */}
      <div className="bg-white dark:bg-[#161F33] px-5 pt-12 pb-4 flex items-center gap-3 border-b border-slate-100 dark:border-slate-800">
        <button onClick={goBack} className="w-9 h-9 rounded-full bg-slate-100 dark:bg-[#1E2B45] flex items-center justify-center text-[#1B2445] dark:text-white hover:bg-slate-200 dark:hover:bg-slate-700 transition-all">
          <X size={18} />
        </button>
        <h1 className="text-lg font-extrabold text-[#1B2445] dark:text-white flex-1">Ghi sổ mới</h1>
      </div>

      <div className="flex-1 overflow-y-auto px-5 py-5 space-y-5">
        {/* Direction Toggle */}
        <div className="flex rounded-2xl bg-slate-100 dark:bg-[#1E2B45] p-1">
          {[
            { id: 'received', label: '↓ Nhận về', emoji: '🎁' },
            { id: 'given', label: '↑ Đi mừng', emoji: '🤝' }
          ].map(d => (
            <button
              key={d.id}
              onClick={() => setDirection(d.id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold transition-all ${
                direction === d.id
                  ? d.id === 'received'
                    ? 'bg-gradient-to-r from-emerald-400 to-[#0B8A63] text-white shadow-md shadow-emerald-500/30'
                    : 'bg-gradient-to-r from-rose-400 to-[#E0285C] text-white shadow-md shadow-rose-500/30'
                  : 'text-slate-400 dark:text-slate-500'
              }`}
            >
              <span>{d.emoji}</span> {d.label}
            </button>
          ))}
        </div>

        {/* Person Picker */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">
            {direction === 'received' ? 'Từ ai?' : 'Gửi ai?'}
          </label>
          <select
            value={personId}
            onChange={e => {
              const c = contacts.find(c => c.id === e.target.value);
              setPersonId(e.target.value);
              setPersonName(c ? c.name : '');
            }}
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-[#1E2B45] text-[#1B2445] dark:text-white border-0 outline-none text-sm font-semibold focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 transition-all appearance-none"
          >
            <option value="">— Chọn hoặc nhập tên mới —</option>
            {contacts.map(c => (
              <option key={c.id} value={c.id}>{c.name} ({c.relationship})</option>
            ))}
          </select>
          {!personId && (
            <input
              type="text"
              placeholder="Hoặc nhập tên người mới..."
              value={personName}
              onChange={e => setPersonName(e.target.value)}
              className="w-full mt-2 px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-[#1E2B45] text-[#1B2445] dark:text-white border-0 outline-none text-sm font-semibold placeholder-slate-400 focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 transition-all"
            />
          )}
        </div>

        {/* Occasion Picker */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Dịp / sự kiện</label>
          <div className="flex flex-wrap gap-2">
            {occasions.map(o => (
              <button
                key={o}
                onClick={() => setOccasion(o)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold border transition-all ${
                  occasion === o
                    ? 'bg-[#1B2445] dark:bg-white text-white dark:text-[#1B2445] border-[#1B2445] dark:border-white shadow-sm'
                    : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-slate-400'
                }`}
              >
                {o}
              </button>
            ))}
          </div>
        </div>

        {/* Amount Input */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Số tiền (VNĐ)</label>
          <div className="relative">
            <input
              type="number"
              placeholder="0"
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className="w-full px-4 pr-12 py-4 rounded-2xl bg-slate-100 dark:bg-[#1E2B45] text-[#1B2445] dark:text-white border-0 outline-none text-xl font-extrabold placeholder-slate-300 focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 transition-all"
            />
            <span className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-sm">đ</span>
          </div>
          {/* Quick amount chips */}
          <div className="flex flex-wrap gap-2 mt-2">
            {quickAmounts.map(a => (
              <button
                key={a}
                onClick={() => setAmount(a.toString())}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-all ${
                  parseInt(amount) === a
                    ? 'bg-[#E0285C] text-white border-[#E0285C]'
                    : 'bg-transparent text-slate-500 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-rose-300'
                }`}
              >
                {a >= 1000000 ? `${a / 1000000}tr` : `${a / 1000}k`}
              </button>
            ))}
          </div>
        </div>

        {/* Date Picker */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Ngày</label>
          <input
            type="date"
            value={date}
            onChange={e => setDate(e.target.value)}
            className="w-full px-4 py-3.5 rounded-2xl bg-slate-100 dark:bg-[#1E2B45] text-[#1B2445] dark:text-white border-0 outline-none text-sm font-semibold focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 transition-all"
          />
        </div>

        {/* Note */}
        <div>
          <label className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2 block">Ghi chú (tùy chọn)</label>
          <textarea
            placeholder="VD: Kèm quà, lời chúc..."
            value={note}
            onChange={e => setNote(e.target.value)}
            rows={2}
            className="w-full px-4 py-3 rounded-2xl bg-slate-100 dark:bg-[#1E2B45] text-[#1B2445] dark:text-white border-0 outline-none text-sm font-medium placeholder-slate-400 focus:ring-2 focus:ring-rose-300 dark:focus:ring-rose-800 transition-all resize-none"
          />
        </div>

        {/* Preview */}
        {(amount && personName) && (
          <div className={`rounded-2xl p-4 border-2 ${direction === 'received' ? 'bg-green-50 dark:bg-green-900/10 border-green-200 dark:border-green-900/30' : 'bg-rose-50 dark:bg-rose-900/10 border-rose-200 dark:border-rose-900/30'}`}>
            <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">Xem trước</p>
            <p className={`font-extrabold text-xl ${direction === 'received' ? 'text-[#0B8A63]' : 'text-[#E0285C]'}`}>
              {direction === 'received' ? '+' : '-'}{parseInt(amount || 0).toLocaleString('vi-VN')}đ
            </p>
            <p className="text-sm font-semibold text-[#1B2445] dark:text-white mt-1">
              {direction === 'received' ? `Từ ${personName}` : `Gửi ${personName}`} · {occasion || 'Chưa chọn dịp'}
            </p>
          </div>
        )}
      </div>

      {/* Save Button */}
      <div className="p-5 bg-white dark:bg-[#161F33] border-t border-slate-100 dark:border-slate-800">
        <button
          onClick={handleSave}
          disabled={!amount || !personName}
          className={`w-full py-4 rounded-2xl font-extrabold text-base transition-all ${
            amount && personName
              ? 'bg-gradient-to-r from-[#F0573F] to-[#E0285C] text-white shadow-lg shadow-rose-500/30 hover:shadow-xl active:scale-98'
              : 'bg-slate-200 dark:bg-slate-700 text-slate-400 dark:text-slate-500 cursor-not-allowed'
          }`}
        >
          <Check size={18} className="inline mr-2" />
          Lưu vào sổ
        </button>
      </div>
    </div>
  );
};
