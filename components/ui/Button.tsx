import React from 'react';
import { TouchableOpacity, ActivityIndicator, View } from 'react-native';
import { Text } from './Text';
import { theme } from '../../constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledTouchableOpacity = styled(TouchableOpacity);
const StyledView = styled(View);

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  icon?: string;
  iconPosition?: 'left' | 'right';
  onPress?: () => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  icon,
  iconPosition = 'left',
  onPress,
  className = '',
}) => {
  const { isDark } = useTheme();

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500 border-primary-500';
      case 'secondary':
        return 'bg-secondary-500 border-secondary-500';
      case 'outline':
        return 'bg-transparent border-primary-500';
      case 'text':
        return 'bg-transparent border-transparent';
      case 'gradient':
        return 'bg-gradient-to-r from-primary-500 to-primary-400 border-transparent';
      default:
        return 'bg-primary-500 border-primary-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-8 px-3';
      case 'medium':
        return 'h-10 px-4';
      case 'large':
        return 'h-12 px-6';
      default:
        return 'h-10 px-4';
    }
  };

  const getTextColor = () => {
    if (disabled) return 'text-gray-400';
    if (variant === 'outline' || variant === 'text') return 'text-primary-500';
    return 'text-white';
  };

  const getIconSize = () => {
    switch (size) {
      case 'small':
        return 16;
      case 'medium':
        return 20;
      case 'large':
        return 24;
      default:
        return 20;
    }
  };

  const baseClasses = 'flex-row items-center justify-center rounded-lg border';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();
  const textColor = getTextColor();
  const iconSize = getIconSize();

  const buttonClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;
  const textClasses = `${textColor} font-medium`;

  const renderIcon = () => {
    if (!icon || loading) return null;

    const iconColor = variant === 'outline' || variant === 'text' 
      ? theme.colors.primary.DEFAULT 
      : '#FFFFFF';

    return (
      <Ionicons
        name={icon as any}
        size={iconSize}
        color={iconColor}
        className={`${iconPosition === 'right' ? 'ml-2' : 'mr-2'}`}
      />
    );
  };

  return (
    <StyledTouchableOpacity
      className={buttonClasses}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.7}
    >
      <StyledView className="flex-row items-center justify-center">
        {iconPosition === 'left' && renderIcon()}
        {loading ? (
          <ActivityIndicator
            size="small"
            color={variant === 'outline' || variant === 'text' 
              ? theme.colors.primary.DEFAULT 
              : '#FFFFFF'}
          />
        ) : (
          <Text className={textClasses}>
            {children}
          </Text>
        )}
        {iconPosition === 'right' && renderIcon()}
      </StyledView>
    </StyledTouchableOpacity>
  );
}; 