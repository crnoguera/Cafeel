import { ColorSchemeName } from 'react-native';

export const theme = (scheme: ColorSchemeName) => {
  const isDark = scheme === 'dark';
  return {
    isDark,
    bg: isDark ? '#0B0F14' : '#FFFFFF',
    card: isDark ? '#12161C' : '#F8FAFC',
    text: isDark ? '#E5E7EB' : '#0F172A',
    subtext: isDark ? '#94A3B8' : '#475569',
    primary: '#6C63FF',
    primarySoft: '#E9E8FF',
    success: '#22C55E',
    warn: '#F59E0B',
    danger: '#EF4444',
    border: isDark ? '#1F2937' : '#E5E7EB',
    shadow: 'rgba(0,0,0,0.1)',
    radius: 16,
    spacing: (n: number) => 4 * n,
  };
};
