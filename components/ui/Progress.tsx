import React from 'react';
import { View, Animated } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);

export interface ProgressProps {
  value: number;
  max?: number;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  showValue?: boolean;
  className?: string;
  animated?: boolean;
}

export const Progress: React.FC<ProgressProps> = ({
  value,
  max = 100,
  variant = 'primary',
  size = 'medium',
  showValue = false,
  className = '',
  animated = true,
}) => {
  const { isDark } = useTheme();
  const progressAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.timing(progressAnim, {
        toValue: value / max,
        duration: 500,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(value / max);
    }
  }, [value, max, animated]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500';
      case 'secondary':
        return 'bg-secondary-500';
      case 'success':
        return 'bg-success-500';
      case 'error':
        return 'bg-error-500';
      case 'warning':
        return 'bg-warning-500';
      case 'info':
        return 'bg-info-500';
      default:
        return 'bg-primary-500';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'h-1';
      case 'medium':
        return 'h-2';
      case 'large':
        return 'h-3';
      default:
        return 'h-2';
    }
  };

  const baseClasses = 'rounded-full overflow-hidden';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  const progressClasses = `${baseClasses} ${sizeClasses} ${className}`;

  const percentage = Math.round((value / max) * 100);

  return (
    <StyledView className="w-full">
      <StyledView className={`${progressClasses} bg-gray-200 dark:bg-gray-700`}>
        <Animated.View
          className={`h-full ${variantClasses}`}
          style={{
            width: progressAnim.interpolate({
              inputRange: [0, 1],
              outputRange: ['0%', '100%'],
            }),
          }}
        />
      </StyledView>
      {showValue && (
        <Text className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          {percentage}%
        </Text>
      )}
    </StyledView>
  );
}; 