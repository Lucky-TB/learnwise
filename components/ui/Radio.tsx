import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface RadioProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  label?: string;
  className?: string;
}

export const Radio: React.FC<RadioProps> = ({
  value,
  onChange,
  disabled = false,
  size = 'medium',
  variant = 'primary',
  label,
  className = '',
}) => {
  const { isDark } = useTheme();
  const scale = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(scale, {
      toValue: value ? 1 : 0,
      useNativeDriver: true,
    }).start();
  }, [value]);

  const handlePress = () => {
    if (disabled) return;
    onChange?.(!value);
  };

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return value ? 'bg-primary-500 border-primary-500' : 'border-gray-300 dark:border-gray-600';
      case 'secondary':
        return value ? 'bg-secondary-500 border-secondary-500' : 'border-gray-300 dark:border-gray-600';
      case 'success':
        return value ? 'bg-success-500 border-success-500' : 'border-gray-300 dark:border-gray-600';
      case 'error':
        return value ? 'bg-error-500 border-error-500' : 'border-gray-300 dark:border-gray-600';
      case 'warning':
        return value ? 'bg-warning-500 border-warning-500' : 'border-gray-300 dark:border-gray-600';
      case 'info':
        return value ? 'bg-info-500 border-info-500' : 'border-gray-300 dark:border-gray-600';
      default:
        return value ? 'bg-primary-500 border-primary-500' : 'border-gray-300 dark:border-gray-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-4 h-4';
      case 'medium':
        return 'w-5 h-5';
      case 'large':
        return 'w-6 h-6';
      default:
        return 'w-5 h-5';
    }
  };

  const baseClasses = 'rounded-full border-2 items-center justify-center';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  const radioClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <StyledTouchableOpacity
      className="flex-row items-center"
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <StyledView className={radioClasses}>
        <Animated.View
          className="w-1/2 h-1/2 rounded-full bg-white"
          style={{
            transform: [{ scale }],
          }}
        />
      </StyledView>
      {label && (
        <StyledView className="ml-2">
          <Text
            variant="body"
            color={disabled ? 'gray' : 'text'}
            className={disabled ? 'opacity-50' : ''}
          >
            {label}
          </Text>
        </StyledView>
      )}
    </StyledTouchableOpacity>
  );
}; 