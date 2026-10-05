import React, { useState } from 'react';
import { Mascot } from '../components/Mascot';
import { useApp } from '../context/AppContext';
import { Delete } from 'lucide-react';

export const PinScreen = () => {
  const { navigateTo, setIsPinUnlocked, showToast } = useApp();
  const [pin, setPin] = useState('');
  const [errorShake, setErrorShake] = useState(false);

  const handleKeyPress = (num) => {
    if (pin.length < 6) {
      const nextPin = pin + num;
      setPin(nextPin);

      if (nextPin.length === 6) {
        // Unlock on 6 digits
        setTimeout(() => {
          setIsPinUnlocked(true);
          navigateTo('home');
          showToast('Mở sổ thành công!');
        }, 200);
      }
    }
  };

  const handleDelete = () => {
    setPin((prev) => prev.slice(0, -1));
  };

  const handleForgotPin = () => {
    navigateTo('forgot-pin');
  };

  return (
    <div className="flex-1 flex flex-col justify-between p-6 bg-gradient-to-b from-[#F8F6FB] to-white dark:from-[#0D1322] dark:to-[#161F33] text-[#1B2445] dark:text-white">
      {/* Top Header & Mascot */}
      <div className="flex-1 flex flex-col items-center justify-center pt-6">
        <div className="mb-4">
          <Mascot state="lock" size={140} />
        </div>

        <h2 className="text-2xl font-bold tracking-tight text-[#1B2445] dark:text-white text-center mb-1">
          Nhập mã PIN
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-6 text-center">
          để mở sổ của bạn
        </p>

        {/* 6 Dot Indicators matching Page 4 */}
        <div className={`flex items-center justify-center gap-3 mb-4 ${errorShake ? 'animate-bounce' : ''}`}>
          {[0, 1, 2, 3, 4, 5].map((index) => {
            const isFilled = index < pin.length;
            return (
              <div
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-200 ${
                  isFilled
                    ? 'bg-[#E0285C] scale-110 shadow-md shadow-pink-500/30'
                    : 'bg-slate-200 dark:bg-slate-700'
                }`}
              />
            );
          })}
        </div>
      </div>

      {/* Numeric Keypad matching Page 4 */}
      <div className="w-full max-w-xs mx-auto pb-6">
        <div className="grid grid-cols-3 gap-4 mb-4">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((num) => (
            <button
              key={num}
              onClick={() => handleKeyPress(num.toString())}
              className="w-16 h-16 rounded-full bg-white dark:bg-[#1E2B45] text-[#1B2445] dark:text-white font-bold text-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center mx-auto"
            >
              {num}
            </button>
          ))}
          {/* Row 4: empty cell, 0, delete button */}
          <div />
          <button
            onClick={() => handleKeyPress('0')}
            className="w-16 h-16 rounded-full bg-white dark:bg-[#1E2B45] text-[#1B2445] dark:text-white font-bold text-2xl shadow-sm border border-slate-100 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 active:scale-95 transition-all flex items-center justify-center mx-auto"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-16 rounded-full bg-transparent text-[#1B2445] dark:text-white font-bold text-xl active:scale-95 transition-all flex items-center justify-center mx-auto hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <Delete size={24} />
          </button>
        </div>

        <div className="text-center pt-2">
          <button
            onClick={handleForgotPin}
            className="text-sm font-bold text-[#E0285C] hover:underline"
          >
            Quên mã PIN?
          </button>
        </div>
      </div>
    </div>
  );
};
