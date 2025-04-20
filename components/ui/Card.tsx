import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { Text } from './Text';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface CardProps {
  title?: string;
  subtitle?: string;
  icon?: string;
  variant?: 'default' | 'elevated' | 'outlined' | 'glass';
  elevation?: 'none' | 'low' | 'medium' | 'high';
  rounded?: 'none' | 'small' | 'medium' | 'large' | 'full';
  footer?: React.ReactNode;
  gradientColors?: string[];
  className?: string;
  onPress?: () => void;
  children?: React.ReactNode;
}

export const Card: React.FC<CardProps> = ({
  title,
  subtitle,
  icon,
  variant = 'default',
  elevation = 'medium',
  rounded = 'medium',
  footer,
  gradientColors,
  className = '',
  onPress,
  children,
}) => {
  const { isDark } = useTheme();

  const getVariantClasses = () => {
    switch (variant) {
      case 'elevated':
        return isDark ? 'bg-surface-dark-elevated' : 'bg-surface-elevated';
      case 'outlined':
        return 'bg-transparent border border-gray-200 dark:border-gray-700';
      case 'glass':
        return isDark 
          ? 'bg-gray-900/70 backdrop-blur-md' 
          : 'bg-white/70 backdrop-blur-md';
      default:
        return isDark ? 'bg-surface-dark' : 'bg-surface';
    }
  };

  const getElevationClasses = () => {
    switch (elevation) {
      case 'none':
        return '';
      case 'low':
        return 'shadow-sm';
      case 'medium':
        return 'shadow-md';
      case 'high':
        return 'shadow-lg';
      default:
        return 'shadow-md';
    }
  };

  const getRoundedClasses = () => {
    switch (rounded) {
      case 'none':
        return 'rounded-none';
      case 'small':
        return 'rounded-sm';
      case 'medium':
        return 'rounded-md';
      case 'large':
        return 'rounded-lg';
      case 'full':
        return 'rounded-full';
      default:
        return 'rounded-md';
    }
  };

  const baseClasses = 'overflow-hidden';
  const variantClasses = getVariantClasses();
  const elevationClasses = getElevationClasses();
  const roundedClasses = getRoundedClasses();

  const cardClasses = `${baseClasses} ${variantClasses} ${elevationClasses} ${roundedClasses} ${className}`;

  const renderHeader = () => {
    if (!title && !subtitle && !icon) return null;

    return (
      <StyledView className="flex-row items-center p-4 border-b border-gray-200 dark:border-gray-700">
        {icon && (
          <Ionicons
            name={icon as any}
            size={24}
            color={isDark ? theme.colors.text.light : theme.colors.text.DEFAULT}
            className="mr-3"
          />
        )}
        <StyledView className="flex-1">
          {title && (
            <Text className="text-lg font-semibold text-gray-900 dark:text-white">
              {title}
            </Text>
          )}
          {subtitle && (
            <Text className="text-sm text-gray-500 dark:text-gray-400">
              {subtitle}
            </Text>
          )}
        </StyledView>
      </StyledView>
    );
  };

  const renderContent = () => {
    return (
      <StyledView className={cardClasses}>
        {renderHeader()}
        <StyledView className="p-4">{children}</StyledView>
        {footer && (
          <StyledView className="p-4 border-t border-gray-200 dark:border-gray-700">
            {footer}
          </StyledView>
        )}
      </StyledView>
    );
  };

  if (onPress) {
    return (
      <StyledTouchableOpacity onPress={onPress} activeOpacity={0.7}>
        {renderContent()}
      </StyledTouchableOpacity>
    );
  }

  return renderContent();
}; 