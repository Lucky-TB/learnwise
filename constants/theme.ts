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
  ...MD3LightTheme,
  ...baseTheme,
  fonts: MD3LightTheme.fonts,
};

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