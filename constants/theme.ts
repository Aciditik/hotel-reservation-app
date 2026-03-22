export const Colors = {
  // Primary backgrounds
  background: '#F5F7FA',
  surface: '#FFFFFF',
  surfaceLight: '#FAFBFC',
  card: '#FFFFFF',
  cardLight: '#F9FAFB',

  // Accent - Blue theme from the design
  primary: '#4A9FF5',
  primaryLight: '#6BB3F7',
  primaryDark: '#3A8FE5',
  primaryMuted: 'rgba(74, 159, 245, 0.1)',

  // Text
  textPrimary: '#1A1A1A',
  textSecondary: '#6B7280',
  textMuted: '#9CA3AF',
  textDark: '#000000',

  // Status
  success: '#10B981',
  error: '#EF4444',
  warning: '#F59E0B',
  favorite: '#EF4444',
  discount: '#FF6B6B',

  // Misc
  border: '#E5E7EB',
  overlay: 'rgba(0, 0, 0, 0.5)',
  shadow: '#000000',
  star: '#FBBF24',
  white: '#FFFFFF',
  black: '#000000',
  gray: '#F3F4F6',
  lightGray: '#F9FAFB',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  xxxl: 32,
};

export const BorderRadius = {
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  full: 999,
};

export const FontSize = {
  xs: 11,
  sm: 13,
  md: 15,
  lg: 17,
  xl: 20,
  xxl: 24,
  xxxl: 30,
  hero: 36,
};

export const FontWeight = {
  regular: '400' as const,
  medium: '500' as const,
  semibold: '600' as const,
  bold: '700' as const,
  extrabold: '800' as const,
};
