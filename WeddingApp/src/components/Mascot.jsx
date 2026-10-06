import React from 'react';
import Svg, { Path, Circle, Ellipse, Line, Rect, Text as SvgText } from 'react-native-svg';

/**
 * Mèo Lộc Mascot - React Native Edition using react-native-svg
 */
export const Mascot = ({ state = 'hello', size = 120, style }) => {
  const width = size;
  const height = size;

  switch (state) {
    case 'income':
    case 'loc-ve':
      return (~~
        <Svg width={width} height={height} viewBox="0 0 200 200" fill="none" style={style}>
          <Path d="M40 70L44 80L54 84L44 88L40 98L36 88L26 84L36 80Z" fill="#FFB938" />
          <Path d="M30 110L32 116L38 118L32 120L30 126L28 120L22 118L28 116Z" fill="#FFB938" />
          <Path d="M165 60L168 67L175 70L168 73L165 80L162 73L155 70L162 67Z" fill="#FFB938" />
          <Circle cx="100" cy="110" r="75" fill="#FFEFEF" />
          <Path d="M148 135 C170 120, 175 160, 150 165 C140 167, 142 145, 148 135 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          <Path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <Path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          <Ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#F0573F" />
          <Path d="M72 82 Q82 92 92 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <Path d="M108 82 Q118 92 128 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <Ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <Path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          <Line x1="38" y1="84" x2="56" y2="87" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Line x1="36" y1="96" x2="56" y2="95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Line x1="162" y1="84" x2="144" y2="87" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Line x1="164" y1="96" x2="144" y2="95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          <Circle cx="100" cy="145" r="22" fill="#FFB938" stroke="#1B2445" strokeWidth="4" />
          <SvgText x="100" y="150" textAnchor="middle" fontSize="13" fontWeight="bold" fill="#1B2445">Lộc</SvgText>
          <Path d="M135 125 C145 105, 155 80, 142 70 C132 62, 122 80, 125 98" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          <Ellipse cx="140" cy="72" rx="7" ry="9" fill="#FF8EA6" />
        </Svg>
      );

    case 'expense':
    case 'di-mung':
      return (
        <Svg width={width} height={height} viewBox="0 0 200 200" fill="none" style={style}>
          <Circle cx="100" cy="110" r="75" fill="#FFF2EE" />
          <Path d="M148 135 C170 120, 175 160, 150 165 C140 167, 142 145, 148 135 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          <Path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <Path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          <Ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#F0573F" />
          <Path d="M72 84 Q82 92 92 84" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <Circle cx="118" cy="84" r="5" fill="#1B2445" />
          <Circle cx="120" cy="82" r="2" fill="#FFFFFF" />
          <Ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <Path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          <Path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          <Rect x="75" y="130" width="50" height="38" rx="6" fill="#E0285C" stroke="#1B2445" strokeWidth="4" />
          <Circle cx="100" cy="152" r="6" fill="#FFB938" />
          <Circle cx="78" cy="150" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <Circle cx="122" cy="146" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
        </Svg>
      );

    case 'lock':
    case 'gui-kin':
      return (
        <Svg width={width} height={height} viewBox="0 0 200 200" fill="none" style={style}>
          <Circle cx="100" cy="110" r="75" fill="#F4F4FF" />
          <Path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <Path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          <Ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#F0573F" />
          <Circle cx="80" cy="84" r="5" fill="#1B2445" />
          <Circle cx="120" cy="84" r="5" fill="#1B2445" />
          <Ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <Path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          <Path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          <Path d="M90 136 V126 C90 120, 110 120, 110 126 V136" stroke="#1B2445" strokeWidth="5" fill="none" />
          <Rect x="82" y="136" width="36" height="30" rx="6" fill="#FFB938" stroke="#1B2445" strokeWidth="4" />
          <Circle cx="100" cy="148" r="4" fill="#1B2445" />
          <Circle cx="78" cy="150" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <Circle cx="122" cy="150" r="10" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
        </Svg>
      );

    case 'hello':
    default:
      return (
        <Svg width={width} height={height} viewBox="0 0 200 200" fill="none" style={style}>
          <Path d="M170 65 Q178 72 172 80" stroke="#1B2445" strokeWidth="3" strokeLinecap="round" fill="none" />
          <Path d="M176 58 Q186 68 178 78" stroke="#1B2445" strokeWidth="3" strokeLinecap="round" fill="none" />
          <Circle cx="100" cy="110" r="75" fill="#FFF5F7" />
          <Path d="M148 135 C170 120, 175 160, 150 165 C140 167, 142 145, 148 135 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          <Path d="M60 70 L42 25 L85 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M52 56 L46 32 L72 48 Z" fill="#FF8EA6" />
          <Path d="M140 70 L158 25 L115 52 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinejoin="round" />
          <Path d="M148 56 L154 32 L128 48 Z" fill="#FF8EA6" />
          <Ellipse cx="100" cy="85" rx="60" ry="48" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M60 48 C75 42, 85 55, 78 68 Z" fill="#FFB938" />
          <Path d="M72 82 Q82 90 92 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <Path d="M108 82 Q118 90 128 82" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" fill="none" />
          <Ellipse cx="68" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Ellipse cx="132" cy="94" rx="9" ry="6" fill="#FFA5B5" />
          <Path d="M96 88 L104 88 L100 93 Z" fill="#1B2445" />
          <Path d="M100 93 Q94 100 88 96 M100 93 Q106 100 112 96" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" fill="none" />
          <Line x1="38" y1="84" x2="56" y2="87" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Line x1="36" y1="96" x2="56" y2="95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Line x1="162" y1="84" x2="144" y2="87" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Line x1="164" y1="96" x2="144" y2="95" stroke="#1B2445" strokeWidth="4" strokeLinecap="round" />
          <Path d="M65 125 C65 105, 135 105, 135 125 L142 168 C142 178, 58 178, 58 168 Z" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" />
          <Path d="M64 122 Q100 138 136 122" stroke="#E0285C" strokeWidth="10" strokeLinecap="round" fill="none" />
          <Circle cx="100" cy="140" r="10" fill="#FFB938" stroke="#1B2445" strokeWidth="3" />
          <Circle cx="100" cy="142" r="2.5" fill="#1B2445" />
          <Ellipse cx="78" cy="154" rx="10" ry="14" fill="#FFFFFF" stroke="#1B2445" strokeWidth="4" />
          <Path d="M135 125 C145 100, 162 72, 148 64 C136 56, 124 76, 126 95" fill="#FFFFFF" stroke="#1B2445" strokeWidth="5" strokeLinecap="round" />
          <Ellipse cx="146" cy="65" rx="7" ry="9" fill="#FF8EA6" />
        </Svg>
      );
  }
};
