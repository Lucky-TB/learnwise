import React from 'react';
import { View, TouchableOpacity, Animated } from 'react-native';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledTouchableOpacity = styled(TouchableOpacity);

export interface SwitchProps {
  value: boolean;
  onChange?: (value: boolean) => void;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large';
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({
  value,
  onChange,
  disabled = false,
  size = 'medium',
  variant = 'primary',
  className = '',
}) => {
  const { isDark } = useTheme();
  const translateX = React.useRef(new Animated.Value(value ? 1 : 0)).current;

  React.useEffect(() => {
    Animated.spring(translateX, {
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
        return value ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600';
      case 'secondary':
        return value ? 'bg-secondary-500' : 'bg-gray-300 dark:bg-gray-600';
      case 'success':
        return value ? 'bg-success-500' : 'bg-gray-300 dark:bg-gray-600';
      case 'error':
        return value ? 'bg-error-500' : 'bg-gray-300 dark:bg-gray-600';
      case 'warning':
        return value ? 'bg-warning-500' : 'bg-gray-300 dark:bg-gray-600';
      case 'info':
        return value ? 'bg-info-500' : 'bg-gray-300 dark:bg-gray-600';
      default:
        return value ? 'bg-primary-500' : 'bg-gray-300 dark:bg-gray-600';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'w-8 h-4';
      case 'medium':
        return 'w-11 h-6';
      case 'large':
        return 'w-14 h-7';
      default:
        return 'w-11 h-6';
    }
  };

  const getThumbSize = () => {
    switch (size) {
      case 'small':
        return 12;
      case 'medium':
        return 16;
      case 'large':
        return 20;
      default:
        return 16;
    }
  };

  const baseClasses = 'rounded-full';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  const switchClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  const thumbSize = getThumbSize();
  const thumbOffset = size === 'small' ? 2 : size === 'medium' ? 3 : 4;

  return (
    <StyledTouchableOpacity
      className={switchClasses}
      onPress={handlePress}
      disabled={disabled}
      activeOpacity={0.7}
    >
      <Animated.View
        className="absolute bg-white rounded-full shadow-sm"
        style={{
          width: thumbSize,
          height: thumbSize,
          transform: [
            {
              translateX: translateX.interpolate({
                inputRange: [0, 1],
                outputRange: [thumbOffset, size === 'small' ? 16 : size === 'medium' ? 22 : 28],
              }),
            },
          ],
        }}
      />
    </StyledTouchableOpacity>
  );
}; 