import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Mic, MicOff, CheckCircle } from 'lucide-react';
import { Mascot } from '../components/Mascot';

export const EnvelopeRecorderScreen = () => {
  const { goBack, addTransaction, showToast, contacts, formatVNDPure } = useApp();
  const [isListening, setIsListening] = useState(false);
  const [recorded, setRecorded] = useState([]);
  const [lastParsed, setLastParsed] = useState(null);

  // Mock voice entry simulation
  const mockEntries = [
    { name: 'Bác Hòa', amount: 2000000, direction: 'received', occasion: 'Tân gia' },
    { name: 'Cô Tươi', amount: 500000, direction: 'received', occasion: 'Cưới hỏi' },
    { name: 'Anh Tuấn', amount: 1000000, direction: 'received', occasion: 'Cưới hỏi' },
  ];

  let mockIndex = 0;

  const simulateVoiceEntry = () => {
    const entry = mockEntries[recorded.length % mockEntries.length];
    if (!entry) return;

    setLastParsed(entry);

    setTimeout(() => {
      const tx = {
        personId: null,
        personName: entry.name,
        type: entry.direction,
        categoryType: 'Hỉ',
        occasion: entry.occasion,
        date: new Date().toISOString().split('T')[0],
        amount: entry.amount
      };
      addTransaction(tx);
      setRecorded(prev => [{ ...tx, id: Date.now() }, ...prev]);
      setLastParsed(null);
      setIsListening(false);
    }, 2000);
  };

  const toggleRecording = () => {
    if (!isListening) {
      setIsListening(true);
      simulateVoiceEntry();
    } else {
      setIsListening(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-[#0D1322] text-white">
      {/* Header */}
      <div className="px-5 pt-12 pb-4 flex items-center gap-3">
        <button onClick={goBack} className="w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-white hover:bg-white/20 transition-all">
          <ArrowLeft size={18} />
        </button>
        <div>
          <h1 className="font-extrabold text-white text-lg">Ghi phong bì</h1>
          <p className="text-white/60 text-xs">Đọc to: "Cô Tươi, 500 nghìn"</p>
        </div>
      </div>

      {/* Mascot area */}
      <div className="flex flex-col items-center py-6 flex-shrink-0">
        <Mascot state={isListening ? 'income' : 'hello'} size={120} />
        {lastParsed ? (
          <div className="mt-3 bg-white/10 backdrop-blur px-6 py-3 rounded-2xl text-center">
            <p className="text-sm text-white/60 font-medium">Đang ghi nhận...</p>
            <p className="font-extrabold text-xl text-[#FFB938]">"{lastParsed.name} — {formatVNDPure(lastParsed.amount)}"</p>
          </div>
        ) : (
          <p className="mt-3 text-white/40 text-sm font-medium text-center">
            {isListening ? 'Đang lắng nghe...' : 'Nhấn mic để bắt đầu'}
          </p>
        )}
      </div>

      {/* Mic Button */}
      <div className="flex justify-center py-4">
        <button
          onClick={toggleRecording}
          className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl ${
            isListening
              ? 'bg-[#E0285C] shadow-rose-500/50 scale-110 animate-pulse'
              : 'bg-gradient-to-br from-rose-400 to-[#E0285C] shadow-rose-500/30 hover:scale-105'
          }`}
        >
          {isListening ? <MicOff size={36} className="text-white" /> : <Mic size={36} className="text-white" />}
        </button>
      </div>

      {/* Recorded List */}
      <div className="flex-1 overflow-y-auto px-4 pb-4 mt-2">
        {recorded.length > 0 && (
          <>
            <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3 px-1">Đã ghi hôm nay — {recorded.length} phong bì</p>
            <div className="space-y-2">
              {recorded.map(tx => (
                <div key={tx.id} className="bg-white/8 backdrop-blur rounded-2xl p-3.5 flex items-center gap-3 border border-white/10">
                  <CheckCircle size={18} className="text-[#0B8A63] shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-white text-sm truncate">{tx.personName}</p>
                    <p className="text-xs text-white/50 mt-0.5">{tx.occasion}</p>
                  </div>
                  <p className="font-extrabold text-[#FFB938] text-sm shrink-0">+{formatVNDPure(tx.amount)}</p>
                </div>
              ))}
            </div>
          </>
        )}

        {recorded.length === 0 && !isListening && (
          <div className="text-center py-8 text-white/30">
            <p className="text-4xl mb-3">🎤</p>
            <p className="font-semibold text-sm">Chưa ghi được phong bì nào</p>
            <p className="text-xs mt-1">Nhấn mic và đọc to: "Tên người, số tiền"</p>
          </div>
        )}
      </div>
    </div>
  );
};
