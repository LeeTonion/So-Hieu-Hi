import React from 'react';

/**
 * Mèo Lộc - Lucky Cat Mascot Component
 * Represents the 6 states defined in Page 1 of design PDF:
 * 1. 'hello' - Xin chào (Waving hand)
 * 2. 'income' - Lộc về (Sparkling coin)
 * 3. 'expense' - Đi mừng (Holding red envelope)
 * 4. 'lock' - Giữ kín (Holding lock)
 * 5. 'empty' - Sổ trống (Sleeping Zzz)
 * 6. 'error' - Ối! (Shocked loss of sync)
 */
export const Mascot = ({ state = 'hello', size = 120, className = '' }) => {
  const width = size;
  const height = size;

  switch (state) {
    case 'income':
    case 'loc-ve':
      return (
        <svg width={width} height={height} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Sparkles */}
          <path d="M40 70L44 80L54 84L44 88L40 98L36 88L26 84L36 80Z" fill="#FFB938" />
          <path d="M30 110L32 116L38 118L32 120L30 126L28 120L22 118L28 116Z" fill="#FFB938" />
          <path d="M165 60L168 67L175 70L168 73L165 80L162 73L155 70L162 67Z" fill="#FFB938" />
          {/* Cat Background Glow */}
          <circle cx="100" cy="110" r="75" fill="#FFEFEF" />
          {/* Cat Tail */}
          <path d="M148 135 C170 120, 175 160, 150 165 C140 167, 142 145, 148 135 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          {/* Ears */}
          <path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          {/* Cat Head */}
          <ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          {/* Orange Spot on Ear */}
          <path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#F0573F" />
          {/* Eyes (Happy Closed curve) */}
          <path d="M72 82 Q82 92 92 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M108 82 Q118 92 128 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          {/* Nose & Mouth */}
          <path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Whiskers */}
          <line x1="38" y1="84" x2="56" y2="87" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <line x1="36" y1="96" x2="56" y2="95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <line x1="162" y1="84" x2="144" y2="87" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <line x1="164" y1="96" x2="144" y2="95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          {/* Body */}
          <path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          {/* Red Collar */}
          <path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Raised Right Paw waving & holding Lộc coin */}
          <circle cx="100" cy="145" r="22" fill="#FFB938" stroke="#1B2445" strokeWidth="4" />
          <text x="100" y="150" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1B2445">Lộc</text>
          {/* Raised Paw */}
          <path d="M135 125 C145 105, 155 80, 142 70 C132 62, 122 80, 125 98" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="140" cy="72" rx="7" ry="9" fill="#FF8EA6" />
        </svg>
      );

    case 'expense':
    case 'di-mung':
      return (
        <svg width={width} height={height} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Cat Background */}
          <circle cx="100" cy="110" r="75" fill="#FFF2EE" />
          {/* Cat Tail */}
          <path d="M148 135 C170 120, 175 160, 150 165 C140 167, 142 145, 148 135 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          {/* Ears */}
          <path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          {/* Cat Head */}
          <ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#F0573F" />
          {/* Winking Wink Eye left, open eye right */}
          <path d="M72 84 Q82 92 92 84" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <circle cx="118" cy="84" r="5" fill="#1B2445" />
          <circle cx="120" cy="82" r="2" fill="#FFFFFF" />
          {/* Cheeks */}
          <ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          {/* Nose & Mouth */}
          <path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Body */}
          <path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          {/* Red Collar */}
          <path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Holding Red Envelope (Phong bao) */}
          <rect x="75" y="130" width="50" height="38" rx="6" fill="#E0285C" stroke="#1B2445" strokeWidth="4" transform="rotate(-5 100 150)" />
          <path d="M75 132 L100 150 L125 130" stroke="#FFB938" strokeWidth="3" fill="none" />
          <circle cx="100" cy="152" r="6" fill="#FFB938" />
          {/* Both Paws holding envelope */}
          <circle cx="78" cy="150" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <circle cx="122" cy="146" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
        </svg>
      );

    case 'lock':
    case 'gui-kin':
      return (
        <svg width={width} height={height} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          <circle cx="100" cy="110" r="75" fill="#F4F4FF" />
          {/* Ears */}
          <path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          {/* Cat Head */}
          <ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#F0573F" />
          {/* Eyes looking down cutely */}
          <circle cx="80" cy="84" r="5" fill="#1B2445" />
          <circle cx="120" cy="84" r="5" fill="#1B2445" />
          {/* Cheeks */}
          <ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          {/* Nose & Mouth */}
          <path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Body */}
          <path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          {/* Collar */}
          <path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Golden Padlock in Paws */}
          <path d="M90 136 V126 C90 120, 110 120, 110 126 V136" stroke="#1B2445" strokeWidth="5" fill="none" />
          <rect x="82" y="136" width="36" height="30" rx="6" fill="#FFB938" stroke="#1B2445" strokeWidth="4" />
          <circle cx="100" cy="148" r="4" fill="#1B2445" />
          <path d="M100 152 V157" stroke="#1B2445" strokeWidth="3" strokeLinecap="round" />
          {/* Paws on sides of lock */}
          <circle cx="78" cy="150" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <circle cx="122" cy="150" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
        </svg>
      );

    case 'empty':
    case 'so-trong':
      return (
        <svg width={width} height={height} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Zzz floating */}
          <text x="145" y="60" fontSize="20" fontWeight="bold" fill="#8E9BB0">z</text>
          <text x="160" y="42" fontSize="16" fontWeight="bold" fill="#8E9BB0">z</text>
          {/* Cat Background */}
          <circle cx="100" cy="115" r="70" fill="#F0F3FA" />
          {/* Ears */}
          <path d="M60 75 L42 30 L85 57 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M52 61 L46 37 L72 53 Z" fill="#FF8EA6" />
          <path d="M140 75 L158 30 L115 57 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M148 61 L154 37 L128 53 Z" fill="#FF8EA6" />
          {/* Cat Head Sleeping */}
          <ellipse cx="100" cy="90" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <path d="M60 53 C75 47, 85 60, 78 73 Z" fill="#F0573F" />
          {/* Sleeping Lines Eyes */}
          <path d="M72 90 Q82 96 92 90" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M108 90 Q118 96 128 90" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <ellipse cx="68" cy="98" rx="9" ry="6" fill="#FFA5B5" />
          <ellipse cx="132" cy="98" rx="9" ry="6" fill="#FFA5B5" />
          {/* Cute Sleeping Mouth */}
          <path d="M96 95 Q100 100 104 95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Curled Body */}
          <path d="M65 130 C65 110, 135 110, 135 130 L140 165 C140 175, 60 175, 60 165 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <path d="M64 127 Q100 143 136 127" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          {/* Collar Bell */}
          <circle cx="100" cy="148" r="10" fill="#FFB938" stroke="#1B2445" strokeWidth="3" />
          {/* Paws Tucked in */}
          <circle cx="82" cy="160" r="9" fill="#FFFFFF" stroke="#1B2445" strokeWidth="3" />
          <circle cx="118" cy="160" r="9" fill="#FFFFFF" stroke="#1B2445" strokeWidth="3" />
        </svg>
      );

    case 'error':
    case 'oi':
      return (
        <svg width={width} height={height} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Sweat drop */}
          <path d="M150 70 C155 60, 160 70, 155 80 C150 85, 145 80, 150 70 Z" fill="#3B82F6" stroke="#1B2445" strokeWidth="2" />
          <circle cx="100" cy="110" r="75" fill="#FFF5F5" />
          {/* Ears */}
          <path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          {/* Head */}
          <ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          {/* Wide Open Shocked Eyes */}
          <circle cx="78" cy="82" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <circle cx="78" cy="82" r="4" fill="#1B2445" />
          <circle cx="122" cy="82" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <circle cx="122" cy="82" r="4" fill="#1B2445" />
          {/* O-shaped Mouth */}
          <ellipse cx="100" cy="98" rx="8" ry="12" fill="#1B2445" />
          <ellipse cx="100" cy="102" rx="5" ry="6" fill="#F0573F" />
          {/* Paws on cheeks */}
          <circle cx="56" cy="92" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <circle cx="144" cy="92" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          {/* Body */}
          <path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'hello':
    default:
      return (
        <svg width={width} height={height} viewBox="0 0 200 200" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
          {/* Waving motion lines */}
          <path d="M170 65 Q178 72 172 80" stroke="#1B2445" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M176 58 Q186 68 178 78" stroke="#1B2445" strokeWidth="3" strokeLinecap="round" fill="none" />
          {/* Cat Background */}
          <circle cx="100" cy="110" r="75" fill="#FFF5F7" />
          {/* Tail */}
          <path d="M148 135 C170 120, 175 160, 150 165 C140 167, 142 145, 148 135 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          {/* Ears */}
          <path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          {/* Head */}
          <ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#FFB938" />
          {/* Eyes Happy Curves */}
          <path d="M72 82 Q82 90 92 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M108 82 Q118 90 128 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          {/* Cheeks */}
          <ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          {/* Nose & Mouth */}
          <path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          {/* Whiskers */}
          <line x1="38" y1="84" x2="56" y2="87" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <line x1="36" y1="96" x2="56" y2="95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          {/* Body */}
          <path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          {/* Red Collar & Golden Bell */}
          <path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          <circle cx="100" cy="140" r="10" fill="#FFB938" stroke="#1B2445" strokeWidth="3" />
          <circle cx="100" cy="142" r="2.5" fill="#1B2445" />
          {/* Left Paw Down */}
          <ellipse cx="78" cy="154" rx="10" ry="14" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          {/* Right Paw Raised & Waving */}
          <path d="M135 125 C145 100, 162 72, 148 64 C136 56, 124 76, 126 95" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          <ellipse cx="146" cy="65" rx="7" ry="9" fill="#FF8EA6" />
        </svg>
      );
  }
};
