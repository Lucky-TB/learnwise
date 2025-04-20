import { MD3LightTheme, MD3DarkTheme } from 'react-native-paper';

const baseTheme = {
  colors: {
    primary: '#3B82F6',
    secondary: '#10B981',
    accent: '#8B5CF6',
    background: '#F9FAFB',
    surface: '#FFFFFF',
    text: '#1F2937',
    error: '#EF4444',
    success: '#10B981',
    disabled: '#9CA3AF',
    placeholder: '#6B7280',
    card: '#FFFFFF',
    border: '#E5E7EB',
    highlight: '#F3F4F6',
    shadow: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  roundness: 12,
  animation: {
    scale: 1.0,
  },
};

export const theme = {
  colors: {
    primary: {
      DEFAULT: '#6366F1',
      light: '#818CF8',
      dark: '#4F46E5',
      contrast: '#FFFFFF',
    },
    secondary: {
      DEFAULT: '#EC4899',
      light: '#F472B6',
      dark: '#DB2777',
      contrast: '#FFFFFF',
    },
    accent: {
      DEFAULT: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrast: '#FFFFFF',
    },
    background: {
      DEFAULT: '#FFFFFF',
      dark: '#111827',
      surface: '#F3F4F6',
      surfaceDark: '#1F2937',
    },
    surface: {
      DEFAULT: '#FFFFFF',
      dark: '#1F2937',
      elevated: '#F9FAFB',
      elevatedDark: '#374151',
    },
    text: {
      DEFAULT: '#111827',
      light: '#F9FAFB',
      muted: '#6B7280',
      mutedDark: '#9CA3AF',
    },
    border: {
      DEFAULT: '#E5E7EB',
      dark: '#374151',
    },
    error: {
      DEFAULT: '#EF4444',
      light: '#F87171',
      dark: '#DC2626',
      contrast: '#FFFFFF',
    },
    success: {
      DEFAULT: '#10B981',
      light: '#34D399',
      dark: '#059669',
      contrast: '#FFFFFF',
    },
    warning: {
      DEFAULT: '#F59E0B',
      light: '#FBBF24',
      dark: '#D97706',
      contrast: '#FFFFFF',
    },
    info: {
      DEFAULT: '#3B82F6',
      light: '#60A5FA',
      dark: '#2563EB',
      contrast: '#FFFFFF',
    },
    gradient: {
      primary: ['#6366F1', '#818CF8'],
      secondary: ['#EC4899', '#F472B6'],
      accent: ['#10B981', '#34D399'],
      dark: ['#111827', '#1F2937'],
    },
  },
  fonts: {
    heading: {
      fontFamily: 'System',
      fontWeight: '700',
    },
    body: {
      fontFamily: 'System',
      fontWeight: '400',
    },
    mono: {
      fontFamily: 'System',
      fontWeight: '400',
    },
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    '2xl': 48,
    '3xl': 64,
  },
  roundness: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
  shadows: {
    sm: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    md: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.15,
      shadowRadius: 4,
      elevation: 4,
    },
    lg: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 8,
      elevation: 8,
    },
  },
  animation: {
    fast: 150,
    normal: 300,
    slow: 500,
  },
  blur: {
    light: 20,
    medium: 40,
    heavy: 60,
  },
} as const;

export const darkTheme = {
  ...MD3DarkTheme,
  ...baseTheme,
  colors: {
    ...baseTheme.colors,
    primary: '#60A5FA',
    secondary: '#34D399',
    accent: '#A78BFA',
    background: '#111827',
    surface: '#1F2937',
    text: '#F9FAFB',
    error: '#F87171',
    success: '#34D399',
    disabled: '#6B7280',
    placeholder: '#9CA3AF',
    card: '#1F2937',
    border: '#374151',
    highlight: '#374151',
  },
  fonts: MD3DarkTheme.fonts,
}; 