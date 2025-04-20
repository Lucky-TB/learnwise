import React from 'react';
import { View, Animated } from 'react-native';
import { Text } from './Text';
import { useTheme } from '../../context/ThemeContext';
import { styled } from 'nativewind';

const StyledView = styled(View);

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'error' | 'warning' | 'info';
  size?: 'small' | 'medium' | 'large';
  className?: string;
  animated?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'primary',
  size = 'medium',
  className = '',
  animated = false,
}) => {
  const { isDark } = useTheme();
  const scaleAnim = React.useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    if (animated) {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 1.2,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [animated]);

  const getVariantClasses = () => {
    switch (variant) {
      case 'primary':
        return 'bg-primary-500 text-white';
      case 'secondary':
        return 'bg-secondary-500 text-white';
      case 'success':
        return 'bg-success-500 text-white';
      case 'error':
        return 'bg-error-500 text-white';
      case 'warning':
        return 'bg-warning-500 text-white';
      case 'info':
        return 'bg-info-500 text-white';
      default:
        return 'bg-primary-500 text-white';
    }
  };

  const getSizeClasses = () => {
    switch (size) {
      case 'small':
        return 'px-2 py-0.5 text-xs';
      case 'medium':
        return 'px-3 py-1 text-sm';
      case 'large':
        return 'px-4 py-1.5 text-base';
      default:
        return 'px-3 py-1 text-sm';
    }
  };

  const baseClasses = 'rounded-full font-medium';
  const variantClasses = getVariantClasses();
  const sizeClasses = getSizeClasses();

  const badgeClasses = `${baseClasses} ${variantClasses} ${sizeClasses} ${className}`;

  return (
    <Animated.View
      style={{
        transform: [{ scale: scaleAnim }],
      }}
    >
      <StyledView className={badgeClasses}>
        <Text className="text-center font-medium">{children}</Text>
      </StyledView>
    </Animated.View>
  );
}; 