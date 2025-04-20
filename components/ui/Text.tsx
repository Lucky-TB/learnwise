import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledText = styled(RNText);

export interface TextProps extends RNTextProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption';
  color?: string | 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning' | 'info' | 'default' | 'muted';
  className?: string;
}

export const Text = React.forwardRef<RNText, TextProps>(
  ({ variant = 'body', color = 'default', className = '', style, ...props }, ref) => {
    const { isDark } = useTheme();

    const getVariantClasses = () => {
      switch (variant) {
        case 'h1':
          return 'text-4xl font-bold';
        case 'h2':
          return 'text-3xl font-semibold';
        case 'h3':
          return 'text-2xl font-medium';
        case 'body':
          return 'text-base';
        case 'caption':
          return 'text-sm';
        default:
          return 'text-base';
      }
    };

    const getColorClasses = () => {
      if (typeof color === 'string' && !['primary', 'secondary', 'accent', 'error', 'success', 'warning', 'info', 'default', 'muted'].includes(color)) {
        return `text-[${color}]`;
      }

      switch (color) {
        case 'primary':
          return 'text-primary-500 dark:text-primary-400';
        case 'secondary':
          return 'text-secondary-500 dark:text-secondary-400';
        case 'accent':
          return 'text-accent-500 dark:text-accent-400';
        case 'error':
          return 'text-error-500 dark:text-error-400';
        case 'success':
          return 'text-success-500 dark:text-success-400';
        case 'warning':
          return 'text-warning-500 dark:text-warning-400';
        case 'info':
          return 'text-info-500 dark:text-info-400';
        case 'muted':
          return 'text-gray-500 dark:text-gray-400';
        case 'default':
        default:
          return 'text-gray-900 dark:text-white';
      }
    };

    const baseClasses = 'font-sans';
    const variantClasses = getVariantClasses();
    const colorClasses = getColorClasses();

    const textClasses = `${baseClasses} ${variantClasses} ${colorClasses} ${className}`;

    return (
      <StyledText
        ref={ref}
        className={textClasses}
        style={style}
        {...props}
      />
    );
  }
); 