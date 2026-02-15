export const Colors = {
  // Primary backgrounds
  background: '#0F1B2D',
  surface: '#1A2A3F',
  surfaceLight: '#243447',
  card: '#1E2D42',
  cardLight: '#253A52',

  // Accent
  primary: '#C8A45C',
  primaryLight: '#D4B76A',
  primaryDark: '#B08D3E',
  primaryMuted: 'rgba(200, 164, 92, 0.15)',

  // Text
  textPrimary: '#FFFFFF',
  textSecondary: '#8A9BB5',
  textMuted: '#5A6E87',
  textDark: '#0F1B2D',

  // Status
  success: '#4CAF50',
  error: '#FF5252',
  warning: '#FFC107',
  favorite: '#FF5252',

  // Misc
  border: '#2A3D55',
  overlay: 'rgba(15, 27, 45, 0.7)',
  shadow: '#000000',
  star: '#FFD700',
  white: '#FFFFFF',
  black: '#000000',
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
